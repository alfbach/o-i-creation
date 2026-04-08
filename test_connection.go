package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/sts"
)

type testConnRequest struct {
	Platform string `json:"platform"`

	AccessKeyID     string `json:"accessKeyId"`
	SecretAccessKey string `json:"secretAccessKey"`
	SessionToken    string `json:"sessionToken"`
	Region          string `json:"region"`

	SubscriptionID string `json:"subscriptionId"`
	TenantID       string `json:"tenantId"`
	ClientID       string `json:"clientId"`
	ClientSecret   string `json:"clientSecret"`

	APIKey string `json:"apiKey"`

	GcpProjectID          string `json:"gcpProjectId"`
	GcpServiceAccountJSON string `json:"gcpServiceAccountJson"`
	ServiceInstanceID     string `json:"serviceInstanceID"`

	BmcUser     string `json:"bmcUser"`
	BmcPassword string `json:"bmcPassword"`
	APIVIP      string `json:"apiVIP"`
	IngressVIP  string `json:"ingressVIP"`
}

type testConnResponse struct {
	OK      bool   `json:"ok"`
	Message string `json:"message"`
}

func handleTestConnection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		_ = json.NewEncoder(w).Encode(testConnResponse{OK: false, Message: "method not allowed"})
		return
	}
	body, err := io.ReadAll(io.LimitReader(r.Body, 512*1024))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(testConnResponse{OK: false, Message: "invalid body"})
		return
	}
	var req testConnRequest
	if err := json.Unmarshal(body, &req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(testConnResponse{OK: false, Message: "invalid json"})
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
	defer cancel()

	var res testConnResponse
	switch strings.TrimSpace(req.Platform) {
	case "aws":
		res = testAWS(ctx, req)
	case "azure":
		res = testAzure(ctx, req)
	case "ibmcloud":
		res = testIBM(ctx, req)
	case "gcp":
		res = testGCP(req)
	case "powervs":
		res = testPowervs(ctx, req)
	case "baremetal":
		res = testBareMetal(req)
	default:
		res = testConnResponse{OK: false, Message: "unknown platform"}
	}
	if !res.OK {
		w.WriteHeader(http.StatusUnprocessableEntity)
	}
	_ = json.NewEncoder(w).Encode(res)
}

func testAWS(ctx context.Context, req testConnRequest) testConnResponse {
	if strings.TrimSpace(req.AccessKeyID) == "" || req.SecretAccessKey == "" {
		return testConnResponse{OK: false, Message: "missing_access_key_or_secret"}
	}
	region := strings.TrimSpace(req.Region)
	if region == "" {
		region = "eu-central-1"
	}
	cfg, err := config.LoadDefaultConfig(ctx,
		config.WithRegion(region),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(
			strings.TrimSpace(req.AccessKeyID),
			req.SecretAccessKey,
			strings.TrimSpace(req.SessionToken),
		)),
	)
	if err != nil {
		return testConnResponse{OK: false, Message: "aws_config: " + err.Error()}
	}
	client := sts.NewFromConfig(cfg)
	out, err := client.GetCallerIdentity(ctx, &sts.GetCallerIdentityInput{})
	if err != nil {
		return testConnResponse{OK: false, Message: "aws_sts: " + err.Error()}
	}
	arn := aws.ToString(out.Arn)
	if arn == "" {
		arn = aws.ToString(out.UserId)
	}
	return testConnResponse{OK: true, Message: arn}
}

func testAzure(ctx context.Context, req testConnRequest) testConnResponse {
	tid := strings.TrimSpace(req.TenantID)
	cid := strings.TrimSpace(req.ClientID)
	sec := req.ClientSecret
	if tid == "" || cid == "" || sec == "" {
		return testConnResponse{OK: false, Message: "missing_azure_credentials"}
	}
	tokenURL := fmt.Sprintf("https://login.microsoftonline.com/%s/oauth2/v2.0/token", url.PathEscape(tid))
	form := url.Values{}
	form.Set("client_id", cid)
	form.Set("client_secret", sec)
	form.Set("scope", "https://management.azure.com/.default")
	form.Set("grant_type", "client_credentials")

	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, tokenURL, strings.NewReader(form.Encode()))
	if err != nil {
		return testConnResponse{OK: false, Message: err.Error()}
	}
	httpReq.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return testConnResponse{OK: false, Message: "azure_http: " + err.Error()}
	}
	defer resp.Body.Close()
	b, _ := io.ReadAll(io.LimitReader(resp.Body, 64*1024))
	if resp.StatusCode != http.StatusOK {
		return testConnResponse{OK: false, Message: fmt.Sprintf("azure_token_%d: %s", resp.StatusCode, truncateMsg(string(b)))}
	}
	var tok struct {
		TokenType string `json:"token_type"`
		ExpiresIn int    `json:"expires_in"`
	}
	if err := json.Unmarshal(b, &tok); err != nil || tok.TokenType == "" {
		return testConnResponse{OK: false, Message: "azure_token_parse"}
	}
	return testConnResponse{OK: true, Message: "azure_ok"}
}

func testIBM(ctx context.Context, req testConnRequest) testConnResponse {
	key := strings.TrimSpace(req.APIKey)
	if key == "" {
		return testConnResponse{OK: false, Message: "missing_ibm_api_key"}
	}
	form := url.Values{}
	form.Set("grant_type", "urn:ibm:params:oauth:grant-type:apikey")
	form.Set("apikey", key)

	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, "https://iam.cloud.ibm.com/identity/token", strings.NewReader(form.Encode()))
	if err != nil {
		return testConnResponse{OK: false, Message: err.Error()}
	}
	httpReq.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	httpReq.Header.Set("Accept", "application/json")

	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return testConnResponse{OK: false, Message: "ibm_http: " + err.Error()}
	}
	defer resp.Body.Close()
	b, _ := io.ReadAll(io.LimitReader(resp.Body, 64*1024))
	if resp.StatusCode != http.StatusOK {
		return testConnResponse{OK: false, Message: fmt.Sprintf("ibm_token_%d: %s", resp.StatusCode, truncateMsg(string(b)))}
	}
	var tok struct {
		TokenType string `json:"token_type"`
	}
	if err := json.Unmarshal(b, &tok); err != nil || tok.TokenType == "" {
		return testConnResponse{OK: false, Message: "ibm_token_parse"}
	}
	return testConnResponse{OK: true, Message: "ibm_ok"}
}

func testGCP(req testConnRequest) testConnResponse {
	if strings.TrimSpace(req.GcpProjectID) == "" {
		return testConnResponse{OK: false, Message: "missing_gcp_project"}
	}
	raw := strings.TrimSpace(req.GcpServiceAccountJSON)
	if raw == "" {
		return testConnResponse{OK: false, Message: "missing_gcp_sa"}
	}
	var js json.RawMessage
	if err := json.Unmarshal([]byte(raw), &js); err != nil {
		return testConnResponse{OK: false, Message: "invalid_gcp_json"}
	}
	return testConnResponse{OK: true, Message: "gcp_ok"}
}

func testPowervs(ctx context.Context, req testConnRequest) testConnResponse {
	if strings.TrimSpace(req.ServiceInstanceID) == "" {
		return testConnResponse{OK: false, Message: "missing_powervs_instance"}
	}
	r := testIBM(ctx, req)
	if !r.OK {
		return r
	}
	return testConnResponse{OK: true, Message: "powervs_ok"}
}

func testBareMetal(req testConnRequest) testConnResponse {
	if strings.TrimSpace(req.BmcUser) == "" || req.BmcPassword == "" {
		return testConnResponse{OK: false, Message: "missing_bmc_credentials"}
	}
	if v := strings.TrimSpace(req.APIVIP); v != "" && !isLikelyIPv4(v) {
		return testConnResponse{OK: false, Message: "invalid_api_vip"}
	}
	if v := strings.TrimSpace(req.IngressVIP); v != "" && !isLikelyIPv4(v) {
		return testConnResponse{OK: false, Message: "invalid_ingress_vip"}
	}
	return testConnResponse{OK: true, Message: "baremetal_ok"}
}

func isLikelyIPv4(s string) bool {
	parts := strings.Split(s, ".")
	if len(parts) != 4 {
		return false
	}
	for _, p := range parts {
		if len(p) == 0 || len(p) > 3 {
			return false
		}
		var n int
		for _, c := range p {
			if c < '0' || c > '9' {
				return false
			}
			n = n*10 + int(c-'0')
		}
		if n > 255 {
			return false
		}
	}
	return true
}

func truncateMsg(s string, max ...int) string {
	m := 200
	if len(max) > 0 {
		m = max[0]
	}
	s = strings.TrimSpace(s)
	if len(s) <= m {
		return s
	}
	return s[:m] + "…"
}
