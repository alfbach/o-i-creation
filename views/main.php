<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenShift Install-Config Generator</title>
  <link rel="stylesheet" href="<?= oic_url('assets/css/styles.css') ?>">
</head>
<body>
  <header class="app-bar" role="banner">
    <div class="app-bar-inner">
      <span class="app-bar-title" data-i18n="navAppTitle">OpenShift Install-Config Generator</span>
      <div class="app-bar-menu">
        <label class="app-bar-lang-label" for="lang-select" data-i18n="langLabel">Language</label>
        <select id="lang-select" class="lang-select">
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
        </select>
      </div>
    </div>
  </header>

  <div class="app">
    <header class="header">
      <h1 data-i18n="pageTitle">OpenShift Install-Config Generator</h1>
      <p class="subtitle" data-i18n="pageSubtitle"></p>
    </header>

    <main class="main">
      <div class="content-shell">
        <nav class="tab-bar" role="tablist" id="main-tablist" aria-orientation="horizontal" data-i18n-aria="ariaTablist">
          <button type="button" class="tab-button tab-button--active" role="tab" id="tab-btn-infrastructure" aria-selected="true" aria-controls="tab-panel-infrastructure" data-tab="infrastructure" data-i18n="tabInfrastructure">Infrastructure</button>
          <button type="button" class="tab-button" role="tab" id="tab-btn-general" aria-selected="false" aria-controls="tab-panel-general" data-tab="general" data-i18n="tabGeneral">General</button>
          <button type="button" class="tab-button" role="tab" id="tab-btn-platform" aria-selected="false" aria-controls="section-platform" data-tab="platform" data-tab-requires-infra="true" disabled data-i18n="tabPlatform">Platform</button>
          <button type="button" class="tab-button" role="tab" id="tab-btn-network" aria-selected="false" aria-controls="tab-panel-network" data-tab="network" data-i18n="tabNetwork">Network</button>
          <button type="button" class="tab-button" role="tab" id="tab-btn-compute" aria-selected="false" aria-controls="tab-panel-compute" data-tab="compute" data-i18n="tabCompute">Compute</button>
          <button type="button" class="tab-button" role="tab" id="tab-btn-export" aria-selected="false" aria-controls="tab-panel-export" data-tab="export" data-i18n="tabExport">Export</button>
        </nav>

        <div class="tab-panels">
          <section class="tab-panel tab-panel--active" role="tabpanel" id="tab-panel-infrastructure" aria-labelledby="tab-btn-infrastructure">
            <div class="panel-inner">
              <div class="panel-hero panel-hero--infra" aria-hidden="true">
                <svg class="panel-hero__svg" viewBox="0 0 128 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="44" width="112" height="24" rx="4" stroke="currentColor" stroke-width="1.5" opacity="0.35"/>
                  <rect x="16" y="50" width="24" height="6" rx="1" fill="currentColor" opacity="0.2"/>
                  <rect x="44" y="50" width="24" height="6" rx="1" fill="currentColor" opacity="0.2"/>
                  <rect x="72" y="50" width="24" height="6" rx="1" fill="currentColor" opacity="0.2"/>
                  <path d="M32 44V28a8 8 0 0116 0v16M80 44V24a8 8 0 0116 0v20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
                  <ellipse cx="40" cy="18" rx="14" ry="8" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>
                  <ellipse cx="88" cy="14" rx="16" ry="9" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>
                </svg>
              </div>
              <p class="panel-lead" data-i18n="panelLeadInfrastructure"></p>
              <button type="button" class="btn btn-primary btn-large" id="btn-select-infra" aria-haspopup="dialog" data-i18n="btnSelectInfra">
                Choose infrastructure…
              </button>
              <div class="selected-infra" id="selected-infra" hidden>
                <span class="badge" id="infra-badge"></span>
                <button type="button" class="btn btn-link" id="btn-change-infra" data-i18n="btnChange">change</button>
              </div>
              <div class="panel-footer">
                <button type="button" class="btn btn-secondary panel-nav-back" disabled data-i18n="btnPanelBack">Back</button>
                <div class="panel-footer__help">
                  <button type="button" class="help-bubble-trigger" aria-expanded="false" aria-controls="help-bubble-infrastructure" data-help-bubble="help-bubble-infrastructure" data-i18n-aria="ariaHelpToggle">
                    <span class="help-bubble-trigger__glyph" aria-hidden="true">?</span>
                  </button>
                  <div class="help-bubble" id="help-bubble-infrastructure" role="region" hidden>
                    <p data-i18n="helpInfra"></p>
                  </div>
                </div>
                <button type="button" class="btn btn-primary panel-nav-next" data-i18n="btnPanelNext">Next</button>
              </div>
            </div>
          </section>

          <section class="tab-panel" role="tabpanel" id="tab-panel-general" aria-labelledby="tab-btn-general" hidden>
            <div class="panel-inner">
              <div class="panel-hero panel-hero--general" aria-hidden="true">
                <svg class="panel-hero__svg" viewBox="0 0 128 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="52" y="12" width="56" height="56" rx="6" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
                  <path d="M60 24h40M60 34h28M60 44h36" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" opacity="0.35"/>
                  <circle cx="36" cy="40" r="18" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>
                  <circle cx="36" cy="36" r="4" fill="currentColor" opacity="0.35"/>
                  <path d="M36 44v8M33 49h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.45"/>
                </svg>
              </div>
              <p class="panel-lead" data-i18n="panelLeadGeneral"></p>
              <form id="form-basic" class="form">
                <div class="form-group">
                  <label for="clusterName" data-i18n="labelClusterName">Cluster name</label>
                  <input type="text" id="clusterName" name="clusterName" data-i18n-placeholder="phClusterName" pattern="[a-z0-9.-]+" required>
                </div>
                <div class="form-group">
                  <label for="baseDomain" data-i18n="labelBaseDomain">Base domain</label>
                  <input type="text" id="baseDomain" name="baseDomain" data-i18n-placeholder="phBaseDomain" required>
                </div>
                <div class="form-group">
                  <label for="pullSecret" data-i18n="labelPullSecret">Pull secret (JSON)</label>
                  <textarea id="pullSecret" name="pullSecret" rows="4" data-i18n-placeholder="phPullSecret"></textarea>
                  <small><span data-i18n="pullSecretHelp">From</span> <a href="https://console.redhat.com/openshift/install/pull-secret" target="_blank" rel="noopener noreferrer" data-i18n="pullSecretLink">Red Hat OpenShift Cluster Manager</a></small>
                </div>
              </form>
              <div class="panel-footer">
                <button type="button" class="btn btn-secondary panel-nav-back" data-i18n="btnPanelBack">Back</button>
                <div class="panel-footer__help">
                  <button type="button" class="help-bubble-trigger" aria-expanded="false" aria-controls="help-bubble-general" data-help-bubble="help-bubble-general" data-i18n-aria="ariaHelpToggle">
                    <span class="help-bubble-trigger__glyph" aria-hidden="true">?</span>
                  </button>
                  <div class="help-bubble" id="help-bubble-general" role="region" hidden>
                    <p data-i18n="helpGeneral"></p>
                  </div>
                </div>
                <button type="button" class="btn btn-primary panel-nav-next" data-i18n="btnPanelNext">Next</button>
              </div>
            </div>
          </section>

          <section class="tab-panel" role="tabpanel" id="section-platform" aria-labelledby="tab-btn-platform" hidden>
            <div class="panel-inner">
              <div class="panel-hero panel-hero--platform" aria-hidden="true">
                <svg class="panel-hero__svg" viewBox="0 0 128 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 52c0-16 12-28 40-28s40 12 40 28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
                  <ellipse cx="64" cy="48" rx="44" ry="14" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
                  <circle cx="64" cy="32" r="14" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
                  <path d="M64 26v12M58 32h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.45"/>
                  <rect x="88" y="18" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.25" opacity="0.35"/>
                </svg>
              </div>
              <p class="panel-lead" data-i18n="panelLeadPlatform"></p>
              <div id="platform-form"></div>
              <div class="panel-footer">
                <button type="button" class="btn btn-secondary panel-nav-back" data-i18n="btnPanelBack">Back</button>
                <div class="panel-footer__help">
                  <button type="button" class="help-bubble-trigger" aria-expanded="false" aria-controls="help-bubble-platform" data-help-bubble="help-bubble-platform" data-i18n-aria="ariaHelpToggle">
                    <span class="help-bubble-trigger__glyph" aria-hidden="true">?</span>
                  </button>
                  <div class="help-bubble" id="help-bubble-platform" role="region" hidden>
                    <p data-i18n="helpPlatform"></p>
                  </div>
                </div>
                <button type="button" class="btn btn-primary panel-nav-next" data-i18n="btnPanelNext">Next</button>
              </div>
            </div>
          </section>

          <section class="tab-panel" role="tabpanel" id="tab-panel-network" aria-labelledby="tab-btn-network" hidden>
            <div class="panel-inner">
              <div class="panel-hero panel-hero--network" aria-hidden="true">
                <svg class="panel-hero__svg" viewBox="0 0 128 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="64" cy="40" r="6" fill="currentColor" opacity="0.35"/>
                  <circle cx="32" cy="22" r="5" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>
                  <circle cx="96" cy="22" r="5" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>
                  <circle cx="24" cy="58" r="5" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>
                  <circle cx="104" cy="58" r="5" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>
                  <path d="M37 25l21 12M91 25L70 37M32 46l27-4M96 46l-27-4M40 56l19-10M88 56l-19-10" stroke="currentColor" stroke-width="1.25" opacity="0.4"/>
                </svg>
              </div>
              <p class="panel-lead" data-i18n="panelLeadNetwork"></p>
              <div class="form">
                <div class="form-group">
                  <label for="clusterNetworkCidr" data-i18n="labelClusterCidr">Cluster network CIDR</label>
                  <input type="text" id="clusterNetworkCidr" value="10.128.0.0/14" placeholder="10.128.0.0/14">
                </div>
                <div class="form-group">
                  <label for="hostPrefix" data-i18n="labelHostPrefix">Host prefix</label>
                  <input type="number" id="hostPrefix" value="23" min="0" max="32">
                </div>
                <div class="form-group">
                  <label for="serviceNetwork" data-i18n="labelServiceNetwork">Service network</label>
                  <input type="text" id="serviceNetwork" value="172.30.0.0/16" placeholder="172.30.0.0/16">
                </div>
              </div>
              <div class="panel-footer">
                <button type="button" class="btn btn-secondary panel-nav-back" data-i18n="btnPanelBack">Back</button>
                <div class="panel-footer__help">
                  <button type="button" class="help-bubble-trigger" aria-expanded="false" aria-controls="help-bubble-network" data-help-bubble="help-bubble-network" data-i18n-aria="ariaHelpToggle">
                    <span class="help-bubble-trigger__glyph" aria-hidden="true">?</span>
                  </button>
                  <div class="help-bubble" id="help-bubble-network" role="region" hidden>
                    <p data-i18n="helpNetwork"></p>
                  </div>
                </div>
                <button type="button" class="btn btn-primary panel-nav-next" data-i18n="btnPanelNext">Next</button>
              </div>
            </div>
          </section>

          <section class="tab-panel" role="tabpanel" id="tab-panel-compute" aria-labelledby="tab-btn-compute" hidden>
            <div class="panel-inner" id="section-compute">
              <div class="panel-hero panel-hero--compute" aria-hidden="true">
                <svg class="panel-hero__svg" viewBox="0 0 128 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="28" y="14" width="72" height="14" rx="3" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
                  <rect x="32" y="18" width="10" height="6" rx="1" fill="currentColor" opacity="0.2"/>
                  <rect x="28" y="33" width="72" height="14" rx="3" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
                  <rect x="32" y="37" width="10" height="6" rx="1" fill="currentColor" opacity="0.2"/>
                  <rect x="28" y="52" width="72" height="14" rx="3" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
                  <rect x="32" y="56" width="10" height="6" rx="1" fill="currentColor" opacity="0.2"/>
                  <circle cx="98" cy="21" r="3" fill="currentColor" opacity="0.35"/>
                  <circle cx="98" cy="40" r="3" fill="currentColor" opacity="0.35"/>
                  <circle cx="98" cy="59" r="3" fill="currentColor" opacity="0.35"/>
                </svg>
              </div>
              <p class="form-hint section-hint" data-i18n="computePoolsHint"></p>
              <div id="compute-pools" class="compute-pools"></div>
              <button type="button" class="btn btn-secondary" id="btn-add-compute-pool" data-i18n="addComputePool">Add compute pool</button>
              <div class="total-price-banner" id="total-cluster-price" aria-live="polite">
                <div class="total-price-inner">
                  <span data-i18n="totalMonthlyEstimate"></span>
                  <strong class="total-price-value" id="total-price-value">—</strong>
                  <span class="price-period" data-i18n="pricePerMonth"></span>
                </div>
                <p class="total-price-disclaimer" data-i18n="totalPriceDisclaimer"></p>
              </div>
              <div class="panel-footer">
                <button type="button" class="btn btn-secondary panel-nav-back" data-i18n="btnPanelBack">Back</button>
                <div class="panel-footer__help">
                  <button type="button" class="help-bubble-trigger" aria-expanded="false" aria-controls="help-bubble-compute" data-help-bubble="help-bubble-compute" data-i18n-aria="ariaHelpToggle">
                    <span class="help-bubble-trigger__glyph" aria-hidden="true">?</span>
                  </button>
                  <div class="help-bubble" id="help-bubble-compute" role="region" hidden>
                    <p data-i18n="helpCompute"></p>
                  </div>
                </div>
                <button type="button" class="btn btn-primary panel-nav-next" data-i18n="btnPanelNext">Next</button>
              </div>
            </div>
          </section>

          <section class="tab-panel" role="tabpanel" id="tab-panel-export" aria-labelledby="tab-btn-export" hidden>
            <div class="panel-inner panel-inner--export">
              <div class="panel-hero panel-hero--export" aria-hidden="true">
                <svg class="panel-hero__svg" viewBox="0 0 128 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="36" y="12" width="56" height="48" rx="5" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
                  <path d="M44 26h40M44 36h32M44 46h28" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" opacity="0.35"/>
                  <path d="M64 60v14M56 68h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
                  <path d="M58 74l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
                </svg>
              </div>
              <p class="panel-lead" data-i18n="panelLeadExport"></p>
              <div class="export-actions">
                <button type="button" class="btn btn-primary btn-large" id="btn-generate" disabled data-i18n="btnGenerate">
                  Generate install-config.yaml
                </button>
                <button type="button" class="btn btn-secondary btn-large" id="btn-save-yaml-file" disabled data-i18n="btnSaveAs" data-i18n-aria="ariaSaveYaml">
                  Save to file…
                </button>
              </div>
              <p class="export-save-hint" data-i18n="saveFileHint"></p>
              <div class="panel-footer">
                <button type="button" class="btn btn-secondary panel-nav-back" data-i18n="btnPanelBack">Back</button>
                <div class="panel-footer__help">
                  <button type="button" class="help-bubble-trigger" aria-expanded="false" aria-controls="help-bubble-export" data-help-bubble="help-bubble-export" data-i18n-aria="ariaHelpToggle">
                    <span class="help-bubble-trigger__glyph" aria-hidden="true">?</span>
                  </button>
                  <div class="help-bubble" id="help-bubble-export" role="region" hidden>
                    <p data-i18n="helpExport"></p>
                  </div>
                </div>
                <button type="button" class="btn btn-primary panel-nav-next" disabled data-i18n="btnPanelNext">Next</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>

  <dialog id="dialog-infra" class="dialog" aria-labelledby="dialog-infra-title">
    <div class="dialog-header">
      <h2 id="dialog-infra-title" data-i18n="dialogInfraTitle">Choose infrastructure</h2>
      <button type="button" class="btn btn-icon" id="btn-close-infra" data-i18n-aria="ariaClose">&times;</button>
    </div>
    <div class="dialog-body">
      <p class="dialog-desc" data-i18n="dialogInfraDesc">Select the platform for your OpenShift installation:</p>
      <div class="infra-grid">
        <button type="button" class="infra-card" data-platform="baremetal">
          <span class="infra-icon">🖥️</span>
          <span class="infra-name" data-i18n="platformBaremetal">Bare metal</span>
          <span class="infra-desc" data-infra-desc="baremetal"></span>
        </button>
        <button type="button" class="infra-card" data-platform="aws">
          <span class="infra-icon">☁️</span>
          <span class="infra-name" data-i18n="platformAws">AWS</span>
          <span class="infra-desc" data-infra-desc="aws"></span>
        </button>
        <button type="button" class="infra-card" data-platform="azure">
          <span class="infra-icon">🔷</span>
          <span class="infra-name" data-i18n="platformAzure">Microsoft Azure</span>
          <span class="infra-desc" data-infra-desc="azure"></span>
        </button>
        <button type="button" class="infra-card" data-platform="ibmcloud">
          <span class="infra-icon">💼</span>
          <span class="infra-name" data-i18n="platformIbm">IBM Cloud</span>
          <span class="infra-desc" data-infra-desc="ibmcloud"></span>
        </button>
        <button type="button" class="infra-card" data-platform="gcp">
          <span class="infra-icon">🌐</span>
          <span class="infra-name" data-i18n="platformGcp">Google Cloud</span>
          <span class="infra-desc" data-infra-desc="gcp"></span>
        </button>
        <button type="button" class="infra-card" data-platform="powervs">
          <span class="infra-icon">⚡</span>
          <span class="infra-name" data-i18n="platformPowervs">IBM Power</span>
          <span class="infra-desc" data-infra-desc="powervs"></span>
        </button>
      </div>
    </div>
  </dialog>

  <dialog id="dialog-platform-aws" class="dialog dialog-wide" aria-labelledby="dialog-aws-title">
    <div class="dialog-header">
      <h2 id="dialog-aws-title" data-i18n="dialogAwsTitle">AWS configuration</h2>
      <button type="button" class="btn btn-icon btn-close-platform" data-i18n-aria="ariaClose">&times;</button>
    </div>
    <div class="dialog-body dialog-body-scroll">
      <p class="form-hint" data-i18n="credsNotInYaml"></p>
      <form id="form-aws" class="form">
        <h3 class="platform-section-title" data-i18n="secCredentials"></h3>
        <div class="form-group">
          <label for="aws-access-key-id" data-i18n="labelAwsAccessKey"></label>
          <input type="text" id="aws-access-key-id" name="awsAccessKeyId" autocomplete="off" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="aws-secret-access-key" data-i18n="labelAwsSecretKey"></label>
          <input type="password" id="aws-secret-access-key" name="awsSecretAccessKey" autocomplete="new-password">
        </div>
        <div class="form-group">
          <label for="aws-session-token" data-i18n="labelAwsSessionToken"></label>
          <input type="password" id="aws-session-token" name="awsSessionToken" autocomplete="off" placeholder="">
        </div>
        <h3 class="platform-section-title" data-i18n="secLocation"></h3>
        <div class="form-group">
          <label for="aws-region-select" data-i18n="labelLocation"></label>
          <select id="aws-region-select"></select>
        </div>
        <h3 class="platform-section-title" data-i18n="secHardware"></h3>
        <div class="form-group">
          <label for="aws-instance-select" data-i18n="labelHardwareProfile"></label>
          <select id="aws-instance-select"></select>
        </div>
        <div class="price-estimate" id="aws-price-box" aria-live="polite">
          <div class="price-estimate-row">
            <span data-i18n="priceEstimateTitle"></span>
            <strong class="price-value" id="aws-price-value">$0.00</strong>
            <span class="price-period" data-i18n="pricePerMonth"></span>
          </div>
          <p class="price-disclaimer" data-i18n="priceDisclaimer"></p>
        </div>
      </form>
      <div class="platform-test-result" id="platform-test-result-aws" role="status" aria-live="polite" hidden></div>
      <div class="dialog-footer dialog-footer--split">
        <button type="button" class="btn btn-secondary btn-test-platform" data-platform="aws" data-i18n="btnTestConnection">Test connection</button>
        <button type="button" class="btn btn-primary btn-save-platform" data-i18n="btnApply">Apply</button>
      </div>
    </div>
  </dialog>

  <dialog id="dialog-platform-azure" class="dialog dialog-wide" aria-labelledby="dialog-azure-title">
    <div class="dialog-header">
      <h2 id="dialog-azure-title" data-i18n="dialogAzureTitle">Azure configuration</h2>
      <button type="button" class="btn btn-icon btn-close-platform" data-i18n-aria="ariaClose">&times;</button>
    </div>
    <div class="dialog-body dialog-body-scroll">
      <p class="form-hint" data-i18n="credsNotInYaml"></p>
      <form id="form-azure" class="form">
        <h3 class="platform-section-title" data-i18n="secCredentials"></h3>
        <div class="form-group">
          <label for="azure-subscription-id" data-i18n="labelAzureSubscriptionId"></label>
          <input type="text" id="azure-subscription-id" autocomplete="off" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="azure-tenant-id" data-i18n="labelAzureTenantId"></label>
          <input type="text" id="azure-tenant-id" autocomplete="off" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="azure-client-id" data-i18n="labelAzureClientId"></label>
          <input type="text" id="azure-client-id" autocomplete="off" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="azure-client-secret" data-i18n="labelAzureClientSecret"></label>
          <input type="password" id="azure-client-secret" autocomplete="new-password">
        </div>
        <div class="form-group">
          <label for="azure-baseDomainResourceGroupName" data-i18n="labelAzureRg">Base domain resource group</label>
          <input type="text" id="azure-baseDomainResourceGroupName" data-i18n-placeholder="phAzureRg">
        </div>
        <h3 class="platform-section-title" data-i18n="secLocation"></h3>
        <div class="form-group">
          <label for="azure-region-select" data-i18n="labelLocation"></label>
          <select id="azure-region-select"></select>
        </div>
        <h3 class="platform-section-title" data-i18n="secHardware"></h3>
        <div class="form-group">
          <label for="azure-vm-size-select" data-i18n="labelAzureVmSize"></label>
          <select id="azure-vm-size-select"></select>
        </div>
        <div class="price-estimate" id="azure-price-box" aria-live="polite">
          <div class="price-estimate-row">
            <span data-i18n="priceEstimateTitle"></span>
            <strong class="price-value" id="azure-price-value">$0.00</strong>
            <span class="price-period" data-i18n="pricePerMonth"></span>
          </div>
          <p class="price-disclaimer" data-i18n="priceDisclaimer"></p>
        </div>
      </form>
      <div class="platform-test-result" id="platform-test-result-azure" role="status" aria-live="polite" hidden></div>
      <div class="dialog-footer dialog-footer--split">
        <button type="button" class="btn btn-secondary btn-test-platform" data-platform="azure" data-i18n="btnTestConnection">Test connection</button>
        <button type="button" class="btn btn-primary btn-save-platform" data-i18n="btnApply">Apply</button>
      </div>
    </div>
  </dialog>

  <dialog id="dialog-platform-ibmcloud" class="dialog dialog-wide" aria-labelledby="dialog-ibm-title">
    <div class="dialog-header">
      <h2 id="dialog-ibm-title" data-i18n="dialogIbmTitle">IBM Cloud configuration</h2>
      <button type="button" class="btn btn-icon btn-close-platform" data-i18n-aria="ariaClose">&times;</button>
    </div>
    <div class="dialog-body dialog-body-scroll">
      <p class="form-hint" data-i18n="credsNotInYaml"></p>
      <form id="form-ibmcloud" class="form">
        <h3 class="platform-section-title" data-i18n="secCredentials"></h3>
        <div class="form-group">
          <label for="ibm-api-key" data-i18n="labelIbmApiKey"></label>
          <input type="password" id="ibm-api-key" autocomplete="new-password" spellcheck="false">
        </div>
        <h3 class="platform-section-title" data-i18n="secLocation"></h3>
        <div class="form-group">
          <label for="ibmcloud-region-select" data-i18n="labelLocation"></label>
          <select id="ibmcloud-region-select"></select>
        </div>
        <h3 class="platform-section-title" data-i18n="secHardware"></h3>
        <div class="form-group">
          <label for="ibm-profile-select" data-i18n="labelIbmProfile"></label>
          <select id="ibm-profile-select"></select>
        </div>
        <div class="price-estimate" id="ibm-price-box" aria-live="polite">
          <div class="price-estimate-row">
            <span data-i18n="priceEstimateTitle"></span>
            <strong class="price-value" id="ibm-price-value">$0.00</strong>
            <span class="price-period" data-i18n="pricePerMonth"></span>
          </div>
          <p class="price-disclaimer" data-i18n="priceDisclaimer"></p>
        </div>
      </form>
      <div class="platform-test-result" id="platform-test-result-ibmcloud" role="status" aria-live="polite" hidden></div>
      <div class="dialog-footer dialog-footer--split">
        <button type="button" class="btn btn-secondary btn-test-platform" data-platform="ibmcloud" data-i18n="btnTestConnection">Test connection</button>
        <button type="button" class="btn btn-primary btn-save-platform" data-i18n="btnApply">Apply</button>
      </div>
    </div>
  </dialog>

  <dialog id="dialog-platform-gcp" class="dialog dialog-wide" aria-labelledby="dialog-gcp-title">
    <div class="dialog-header">
      <h2 id="dialog-gcp-title" data-i18n="dialogGcpTitle">Google Cloud configuration</h2>
      <button type="button" class="btn btn-icon btn-close-platform" data-i18n-aria="ariaClose">&times;</button>
    </div>
    <div class="dialog-body dialog-body-scroll">
      <p class="form-hint" data-i18n="credsNotInYamlGcp"></p>
      <form id="form-gcp" class="form">
        <h3 class="platform-section-title" data-i18n="secCredentials"></h3>
        <div class="form-group">
          <label for="gcp-project-id" data-i18n="labelGcpProjectId"></label>
          <input type="text" id="gcp-project-id" autocomplete="off" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="gcp-service-account-json" data-i18n="labelGcpServiceAccountJson"></label>
          <textarea id="gcp-service-account-json" rows="5" spellcheck="false"></textarea>
        </div>
        <h3 class="platform-section-title" data-i18n="secLocation"></h3>
        <div class="form-group">
          <label for="gcp-region-select" data-i18n="labelLocation"></label>
          <select id="gcp-region-select"></select>
        </div>
        <h3 class="platform-section-title" data-i18n="secHardware"></h3>
        <div class="form-group">
          <label for="gcp-machine-select" data-i18n="labelGcpMachineType"></label>
          <select id="gcp-machine-select"></select>
        </div>
        <div class="price-estimate" id="gcp-price-box" aria-live="polite">
          <div class="price-estimate-row">
            <span data-i18n="priceEstimateTitle"></span>
            <strong class="price-value" id="gcp-price-value">$0.00</strong>
            <span class="price-period" data-i18n="pricePerMonth"></span>
          </div>
          <p class="price-disclaimer" data-i18n="priceDisclaimer"></p>
        </div>
      </form>
      <div class="platform-test-result" id="platform-test-result-gcp" role="status" aria-live="polite" hidden></div>
      <div class="dialog-footer dialog-footer--split">
        <button type="button" class="btn btn-secondary btn-test-platform" data-platform="gcp" data-i18n="btnTestConnection">Test connection</button>
        <button type="button" class="btn btn-primary btn-save-platform" data-i18n="btnApply">Apply</button>
      </div>
    </div>
  </dialog>

  <dialog id="dialog-platform-powervs" class="dialog dialog-wide" aria-labelledby="dialog-powervs-title">
    <div class="dialog-header">
      <h2 id="dialog-powervs-title" data-i18n="dialogPowervsTitle">IBM Power (Power VS) configuration</h2>
      <button type="button" class="btn btn-icon btn-close-platform" data-i18n-aria="ariaClose">&times;</button>
    </div>
    <div class="dialog-body dialog-body-scroll">
      <p class="form-hint" data-i18n="credsNotInYamlPowervs"></p>
      <form id="form-powervs" class="form">
        <h3 class="platform-section-title" data-i18n="secCredentials"></h3>
        <div class="form-group">
          <label for="powervs-api-key" data-i18n="labelIbmApiKey"></label>
          <input type="password" id="powervs-api-key" autocomplete="new-password" spellcheck="false">
        </div>
        <h3 class="platform-section-title" data-i18n="secPowervsService"></h3>
        <div class="form-group">
          <label for="powervs-service-instance-id" data-i18n="labelPowervsServiceInstanceId"></label>
          <input type="text" id="powervs-service-instance-id" autocomplete="off" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="powervs-vpc-name" data-i18n="labelPowervsVpcName"></label>
          <input type="text" id="powervs-vpc-name" data-i18n-placeholder="phPowervsVpcName" autocomplete="off">
        </div>
        <h3 class="platform-section-title" data-i18n="secLocation"></h3>
        <div class="form-group">
          <label for="powervs-region-select" data-i18n="labelPowervsRegion"></label>
          <select id="powervs-region-select"></select>
        </div>
        <div class="form-group">
          <label for="powervs-zone" data-i18n="labelPowervsZone"></label>
          <input type="text" id="powervs-zone" placeholder="tor-1">
        </div>
        <h3 class="platform-section-title" data-i18n="secHardware"></h3>
        <div class="form-group">
          <label for="powervs-profile-select" data-i18n="labelPowervsProfile"></label>
          <select id="powervs-profile-select"></select>
        </div>
        <div class="price-estimate" id="powervs-price-box" aria-live="polite">
          <div class="price-estimate-row">
            <span data-i18n="priceEstimateTitle"></span>
            <strong class="price-value" id="powervs-price-value">$0.00</strong>
            <span class="price-period" data-i18n="pricePerMonth"></span>
          </div>
          <p class="price-disclaimer" data-i18n="priceDisclaimer"></p>
        </div>
      </form>
      <div class="platform-test-result" id="platform-test-result-powervs" role="status" aria-live="polite" hidden></div>
      <div class="dialog-footer dialog-footer--split">
        <button type="button" class="btn btn-secondary btn-test-platform" data-platform="powervs" data-i18n="btnTestConnection">Test connection</button>
        <button type="button" class="btn btn-primary btn-save-platform" data-i18n="btnApply">Apply</button>
      </div>
    </div>
  </dialog>

  <dialog id="dialog-platform-baremetal" class="dialog dialog-wide" aria-labelledby="dialog-baremetal-title">
    <div class="dialog-header">
      <h2 id="dialog-baremetal-title" data-i18n="dialogBaremetalTitle">Bare metal configuration</h2>
      <button type="button" class="btn btn-icon btn-close-platform" data-i18n-aria="ariaClose">&times;</button>
    </div>
    <div class="dialog-body dialog-body-scroll">
      <p class="form-hint" data-i18n="credsNotInYamlBm"></p>
      <form id="form-baremetal" class="form">
        <h3 class="platform-section-title" data-i18n="secCredentials"></h3>
        <div class="form-group">
          <label for="bm-bmc-user" data-i18n="labelBmBmcUser"></label>
          <input type="text" id="bm-bmc-user" autocomplete="off">
        </div>
        <div class="form-group">
          <label for="bm-bmc-password" data-i18n="labelBmBmcPassword"></label>
          <input type="password" id="bm-bmc-password" autocomplete="new-password">
        </div>
        <h3 class="platform-section-title" data-i18n="secLocation"></h3>
        <div class="form-group">
          <label for="bm-location-select" data-i18n="labelBmLocation"></label>
          <select id="bm-location-select"></select>
        </div>
        <h3 class="platform-section-title" data-i18n="secNetworkInstall"></h3>
        <div class="form-group">
          <label for="baremetal-provisioningNetwork" data-i18n="labelProvNet">Provisioning network</label>
          <select id="baremetal-provisioningNetwork">
            <option value="Managed">Managed</option>
            <option value="Unmanaged">Unmanaged</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
        <div class="form-group">
          <label for="baremetal-apiVIP" data-i18n="labelApiVip">API VIP</label>
          <input type="text" id="baremetal-apiVIP" placeholder="192.168.1.5">
        </div>
        <div class="form-group">
          <label for="baremetal-ingressVIP" data-i18n="labelIngressVip">Ingress VIP</label>
          <input type="text" id="baremetal-ingressVIP" placeholder="192.168.1.6">
        </div>
        <h3 class="platform-section-title" data-i18n="secHardware"></h3>
        <div class="form-group">
          <label for="bm-hardware-select" data-i18n="labelBmHardware"></label>
          <select id="bm-hardware-select"></select>
        </div>
        <div class="price-estimate" id="bm-price-box" aria-live="polite">
          <div class="price-estimate-row">
            <span data-i18n="priceEstimateTitleBm"></span>
            <strong class="price-value" id="bm-price-value">$0.00</strong>
            <span class="price-period" data-i18n="pricePerMonth"></span>
          </div>
          <p class="price-disclaimer" data-i18n="priceDisclaimerBm"></p>
        </div>
      </form>
      <div class="platform-test-result" id="platform-test-result-baremetal" role="status" aria-live="polite" hidden></div>
      <div class="dialog-footer dialog-footer--split">
        <button type="button" class="btn btn-secondary btn-test-platform" data-platform="baremetal" data-i18n="btnTestConnection">Test connection</button>
        <button type="button" class="btn btn-primary btn-save-platform" data-i18n="btnApply">Apply</button>
      </div>
    </div>
  </dialog>

  <dialog id="dialog-output" class="dialog dialog-output" aria-labelledby="dialog-output-title">
    <div class="dialog-header">
      <h2 id="dialog-output-title" data-i18n="dialogOutputTitle">install-config.yaml</h2>
      <div class="dialog-actions">
        <button type="button" class="btn btn-secondary" id="btn-copy-yaml" data-i18n="btnCopy">Copy</button>
        <button type="button" class="btn btn-secondary" id="btn-download-yaml" disabled data-i18n="btnSaveAs" data-i18n-aria="ariaSaveYaml">Save to file…</button>
        <button type="button" class="btn btn-icon" id="btn-close-output" data-i18n-aria="ariaClose">&times;</button>
      </div>
    </div>
    <div class="dialog-body">
      <pre id="yaml-output"><code></code></pre>
    </div>
  </dialog>

  <script src="<?= oic_url('assets/js/i18n.js') ?>"></script>
  <script src="<?= oic_url('assets/js/pricing.js') ?>"></script>
  <script src="<?= oic_url('assets/js/app.js') ?>"></script>
</body>
</html>
