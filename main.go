// Standalone HTTP server: embedded static UI (no PHP at runtime).
package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"
)

//go:embed static
var staticRoot embed.FS

func main() {
	addr := os.Getenv("PORT")
	if addr == "" {
		addr = "8080"
	}
	if !strings.HasPrefix(addr, ":") {
		addr = ":" + addr
	}

	root, err := fs.Sub(staticRoot, "static")
	if err != nil {
		log.Fatal(err)
	}

	fileServer := http.FileServer(http.FS(root))
	mux := http.NewServeMux()
	mux.HandleFunc("/api/test-connection", handleTestConnection)
	mux.Handle("/", securityHeaders(fileServer))

	log.Printf("OpenShift Install-Config Generator — http://127.0.0.1%s (Ctrl+C to stop)", addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}

func securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Frame-Options", "SAMEORIGIN")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		next.ServeHTTP(w, r)
	})
}
