/**
 * Lokalisierung: EN, DE, FR, ES
 */
const I18N = {
  en: {
    langName: 'English',
    navAppTitle: 'OpenShift Install-Config Generator',
    langLabel: 'Language',
    docTitle: 'OpenShift Install-Config Generator',
    pageTitle: 'OpenShift Install-Config Generator',
    pageSubtitleHtml:
      'Generate <code>install-config.yaml</code> for your OpenShift installation',
    ariaTablist: 'Sections',
    tabInfrastructure: 'Infrastructure',
    tabGeneral: 'General',
    tabPlatform: 'Platform',
    tabNetwork: 'Network',
    tabCompute: 'Compute',
    tabExport: 'Export',
    panelLeadInfrastructure: 'Choose where your OpenShift cluster will run.',
    panelLeadGeneral: 'Cluster name, base domain, and pull secret.',
    panelLeadPlatform: 'Region, credentials, and default hardware for your provider.',
    panelLeadNetwork: 'Optional cluster network, host prefix, and service network.',
    panelLeadExport:
      'Generate install-config.yaml, copy it to the clipboard, or save it as a file.',
    step1: '1. Choose infrastructure',
    btnSelectInfra: 'Choose infrastructure…',
    btnChange: 'change',
    step2: '2. General settings',
    labelClusterName: 'Cluster name',
    phClusterName: 'e.g. dev, prod',
    labelBaseDomain: 'Base domain',
    phBaseDomain: 'e.g. example.com',
    labelPullSecret: 'Pull secret (JSON)',
    phPullSecret: '{"auths":{"cloud.openshift.com":{...}}}',
    pullSecretHelp: 'From',
    pullSecretLink: 'Red Hat OpenShift Cluster Manager',
    step3: '3. Platform-specific settings',
    platformPrefix: 'Platform:',
    btnEditPlatform: 'Edit platform settings',
    step4: '4. Networking (optional)',
    networkCustomize: 'Customize networking',
    labelClusterCidr: 'Cluster network CIDR',
    labelHostPrefix: 'Host prefix',
    labelServiceNetwork: 'Service network',
    step5: '5. Compute pools',
    computeCustomize: 'Customize compute nodes',
    computePoolsHint:
      'Add machine pools (name, replicas, infra type). On AWS/Azure/IBM you can pick regular VMs or provider bare metal SKUs in the compute dropdown; on-premises servers use infrastructure “Bare Metal” in step 1. The monthly estimate includes three control-plane nodes plus all pools.',
    addComputePool: 'Add compute pool',
    poolName: 'Pool name',
    poolReplicas: 'Replicas',
    poolInfraType: 'Infra type (per pool)',
    poolAwsBmOptgroup: 'AWS — EC2 bare metal (provider)',
    poolAzureBmOptgroup: 'Azure — large / bare-metal class SKUs (provider)',
    poolIbmBmOptgroup: 'IBM Cloud — bare metal / dedicated profiles (provider)',
    poolBmOptgroupLabel: 'On-premises bare metal (your datacenter)',
    poolBmOptgroupHint:
      'For servers you own or colocate, choose “Bare Metal” in step 1 — then pick a server class per pool.',
    removePool: 'Remove',
    poolSelectInfraFirst: 'Select infrastructure first…',
    totalMonthlyEstimate: 'Total estimated compute (monthly)',
    totalPriceDisclaimer:
      'Indicative USD/month: 3× control plane at the default platform type plus all pools. Not a quote.',
    labelComputeReplicas: 'Number of workers (replicas)',
    btnGenerate: 'Generate install-config.yaml',
    dialogInfraTitle: 'Choose infrastructure',
    dialogInfraDesc: 'Select the platform for your OpenShift installation:',
    infraBaremetalDesc: 'Your own physical servers',
    infraAwsDesc: 'Amazon Web Services',
    infraAzureDesc: 'Azure cloud',
    infraIbmDesc: 'IBM Cloud VPC',
    infraGcpDesc: 'Google Cloud Platform',
    infraPowervsDesc: 'IBM Power Virtual Server',
    dialogAwsTitle: 'AWS configuration',
    dialogAzureTitle: 'Azure configuration',
    dialogIbmTitle: 'IBM Cloud configuration',
    dialogBaremetalTitle: 'Bare metal configuration',
    dialogGcpTitle: 'Google Cloud configuration',
    dialogPowervsTitle: 'IBM Power (Power VS) configuration',
    labelRegion: 'Region',
    labelAwsInstance: 'Default instance type (control plane)',
    labelAzureRg: 'Base domain resource group',
    phAzureRg: 'resource-group-name',
    labelProvNet: 'Provisioning network',
    labelApiVip: 'API VIP',
    labelIngressVip: 'Ingress VIP',
    btnApply: 'Apply',
    dialogOutputTitle: 'install-config.yaml',
    btnCopy: 'Copy',
    btnSaveAs: 'Save to file…',
    btnTestConnection: 'Test connection',
    testConnRunning: 'Checking…',
    testConnSuccessAws: 'Connection OK. Identity: {arn}',
    testConnSuccessAzure: 'Connection OK. Azure AD token received.',
    testConnSuccessIbm: 'Connection OK. IBM Cloud IAM token received.',
    testConnSuccessGcp:
      'Connection OK. Project ID and service account JSON are present and the JSON is valid.',
    testConnSuccessPowervs:
      'Connection OK. IBM Cloud IAM token received; Power VS service instance ID is set.',
    testConnSuccessBm:
      'Inputs look valid (BMC credentials and VIP formats). No live BMC check from the browser.',
    testConnSuccessGeneric: 'OK.',
    testErrMissingAws: 'Enter access key ID and secret access key.',
    testErrMissingAzure: 'Enter subscription ID, tenant ID, client ID, and client secret.',
    testErrMissingIbm: 'Enter the IBM Cloud API key.',
    testErrMissingBm: 'Enter BMC username and password.',
    testErrInvalidApiVip: 'API VIP must be a valid IPv4 address if set.',
    testErrInvalidIngressVip: 'Ingress VIP must be a valid IPv4 address if set.',
    testErrAwsCli:
      'Live AWS check from PHP needs the AWS CLI on PATH. Or use the standalone Go binary (built-in test).',
    testErrAwsCliFailed: 'AWS CLI did not return a valid identity. Check keys and region.',
    testErrAzureToken: 'Could not parse the Azure token response.',
    testErrIbmToken: 'Could not parse the IBM token response.',
    testErrAzureDetail: 'Azure: ',
    testErrIbmDetail: 'IBM: ',
    testErrAwsDetail: 'AWS: ',
    testConnNetworkError:
      'Test API not reachable. For php -S, use api/test-connection.php; the Go binary includes /api/test-connection.',
    testConnUnknown: 'Unexpected response.',
    testErrUnknownPlatform: 'Unknown platform.',
    testErrMissingGcpProject: 'Enter the GCP project ID.',
    testErrMissingGcpSa: 'Paste the service account JSON key.',
    testErrInvalidGcpJson: 'Service account JSON is not valid JSON.',
    testErrMissingPowervsInstance: 'Enter the Power VS service instance ID.',
    ariaSaveYaml: 'Save install-config.yaml to disk',
    saveFileHint:
      'In Chrome, Edge, or other Chromium-based browsers you can choose the folder and file name. Safari and Firefox save to your default downloads folder.',
    btnPanelBack: 'Back',
    btnPanelNext: 'Next',
    ariaHelpToggle: 'Help for this section',
    helpInfra:
      'Choose where the cluster runs: a public cloud (AWS, Azure, IBM Cloud, Google Cloud, IBM Power VS) or bare metal in your datacenter. This choice drives platform-specific settings and pricing hints.',
    helpGeneral:
      'Use a DNS-safe cluster name (lowercase letters, numbers, dots, hyphens). The base domain is used for API and app DNS. The pull secret authorizes image pulls from Red Hat—get it from the OpenShift Cluster Manager.',
    helpPlatform:
      'Use “Edit platform settings” to set region, credentials, and default instance types. Those defaults mainly affect the control plane; compute pools can use different sizes. Protect secrets and remove credential blocks from YAML if your installer rejects them.',
    helpNetwork:
      'Change these values only if they overlap with networks you already use. Incorrect cluster or service CIDRs are a common cause of failed installs. The defaults match typical OpenShift networking.',
    helpCompute:
      'Add machine pools (for example workers). Replicas set how many nodes run in each pool. Pick an instance or bare metal profile per pool; the banner shows an indicative monthly total including three control-plane nodes.',
    helpExport:
      'When the form is complete, generate the YAML. Copy it or save it to a file. Treat the file as sensitive—especially if it still contains provider or BMC credentials.',
    ariaClose: 'Close',
    copied: 'Copied!',
    platformBaremetal: 'Bare metal',
    platformAws: 'AWS',
    platformAzure: 'Microsoft Azure',
    platformIbm: 'IBM Cloud',
    platformGcp: 'Google Cloud',
    platformPowervs: 'IBM Power (Power VS)',
    credsNotInYaml:
      'When you generate install-config.yaml, provider credentials are included in a root-level "credentials" block if you filled them in (see YAML comments). Prefer IAM roles, env vars, or a secrets manager in production; remove that block if openshift-install rejects unknown fields.',
    credsNotInYamlBm:
      'When you generate install-config.yaml, BMC credentials are included under credentials.baremetal if provided. Protect the file and remove the block if your installer rejects it.',
    credsNotInYamlGcp:
      'When you generate install-config.yaml, GCP credentials may appear in a root-level "credentials" block if you filled them in. Prefer Workload Identity or a secrets manager in production; remove that block if openshift-install rejects unknown fields.',
    credsNotInYamlPowervs:
      'When you generate install-config.yaml, IBM Cloud API material may appear in a root-level "credentials" block if provided. Protect the file and remove the block if your installer rejects it.',
    secCredentials: 'Access credentials',
    secLocation: 'Location',
    secPowervsService: 'Power VS service',
    secHardware: 'Hardware profile',
    secNetworkInstall: 'Network & install',
    labelLocation: 'Location',
    labelHardwareProfile: 'Default instance type',
    labelAzureVmSize: 'Default VM size',
    labelIbmProfile: 'Default instance profile',
    labelAwsAccessKey: 'Access key ID',
    labelAwsSecretKey: 'Secret access key',
    labelAwsSessionToken: 'Session token (optional)',
    labelAzureSubscriptionId: 'Subscription ID',
    labelAzureTenantId: 'Tenant ID',
    labelAzureClientId: 'Client ID (app registration)',
    labelAzureClientSecret: 'Client secret',
    labelIbmApiKey: 'IBM Cloud API key',
    labelGcpProjectId: 'GCP project ID',
    labelGcpServiceAccountJson: 'Service account key (JSON)',
    labelGcpMachineType: 'Default machine type (control plane)',
    labelPowervsServiceInstanceId: 'Power VS service instance ID',
    labelPowervsVpcName: 'VPC name (optional)',
    phPowervsVpcName: 'e.g. my-vpc',
    labelPowervsRegion: 'Region',
    labelPowervsZone: 'Zone',
    labelPowervsProfile: 'Default processor profile',
    labelBmBmcUser: 'BMC / IPMI username',
    labelBmBmcPassword: 'BMC / IPMI password',
    labelBmLocation: 'Datacenter / site',
    labelBmHardware: 'Server hardware profile',
    priceEstimateTitle: 'Estimated compute (indicative)',
    priceEstimateTitleBm: 'Estimated colocated hardware (indicative)',
    pricePerMonth: '/ month',
    priceDisclaimer:
      'Rough on-demand style estimate for control-plane + worker nodes (see step 5). Taxes, storage, networking, and discounts are not included. Not a quote.',
    priceDisclaimerBm:
      'Illustrative monthly lease-style cost per node for similar capacity. Actual quotes depend on your provider and contract.'
  },
  de: {
    langName: 'Deutsch',
    navAppTitle: 'OpenShift Install-Config Generator',
    langLabel: 'Sprache',
    docTitle: 'OpenShift Install-Config Generator',
    pageTitle: 'OpenShift Install-Config Generator',
    pageSubtitleHtml:
      'Generiere <code>install-config.yaml</code> für deine OpenShift-Installation',
    ariaTablist: 'Bereiche',
    tabInfrastructure: 'Infrastruktur',
    tabGeneral: 'Allgemein',
    tabPlatform: 'Plattform',
    tabNetwork: 'Netzwerk',
    tabCompute: 'Compute',
    tabExport: 'Export',
    panelLeadInfrastructure: 'Wählen Sie, wo Ihr OpenShift-Cluster laufen soll.',
    panelLeadGeneral: 'Cluster-Name, Base Domain und Pull Secret.',
    panelLeadPlatform: 'Region, Zugangsdaten und Standard-Hardware für Ihren Anbieter.',
    panelLeadNetwork: 'Optionales Cluster-Netzwerk, Host-Präfix und Service-Netzwerk.',
    panelLeadExport:
      'install-config.yaml erzeugen, in die Zwischenablage kopieren oder als Datei speichern.',
    step1: '1. Infrastruktur auswählen',
    btnSelectInfra: 'Infrastruktur wählen…',
    btnChange: 'ändern',
    step2: '2. Allgemeine Einstellungen',
    labelClusterName: 'Cluster-Name',
    phClusterName: 'z. B. dev, prod',
    labelBaseDomain: 'Base Domain',
    phBaseDomain: 'z. B. example.com',
    labelPullSecret: 'Pull Secret (JSON)',
    phPullSecret: '{"auths":{"cloud.openshift.com":{...}}}',
    pullSecretHelp: 'Von',
    pullSecretLink: 'Red Hat OpenShift Cluster Manager',
    step3: '3. Plattform-spezifische Einstellungen',
    platformPrefix: 'Plattform:',
    btnEditPlatform: 'Plattform-Einstellungen bearbeiten',
    step4: '4. Netzwerk (optional)',
    networkCustomize: 'Netzwerk anpassen',
    labelClusterCidr: 'Cluster Network CIDR',
    labelHostPrefix: 'Host Prefix',
    labelServiceNetwork: 'Service Network',
    step5: '5. Compute-Pools',
    computeCustomize: 'Compute-Knoten anpassen',
    computePoolsHint:
      'Machine-Pools (Name, Replikas, Infra-Typ). Bei AWS/Azure/IBM stehen VMs und Anbieter-Bare-Metal-SKUs im Dropdown; eigene Server über „Bare Metal“ in Schritt 1. Die Schätzung: 3× Control Plane plus alle Pools.',
    addComputePool: 'Compute-Pool hinzufügen',
    poolName: 'Pool-Name',
    poolReplicas: 'Replikas',
    poolInfraType: 'Infra-Typ (pro Pool)',
    poolAwsBmOptgroup: 'AWS — EC2 Bare Metal (Anbieter)',
    poolAzureBmOptgroup: 'Azure — große / Bare-Metal-ähnliche SKUs (Anbieter)',
    poolIbmBmOptgroup: 'IBM Cloud — Bare Metal / Dedicated (Anbieter)',
    poolBmOptgroupLabel: 'On-Premises Bare Metal (eigenes RZ)',
    poolBmOptgroupHint:
      'Für eigene oder colocate Server in Schritt 1 „Bare Metal“ wählen — dann pro Pool eine Serverklasse.',
    removePool: 'Entfernen',
    poolSelectInfraFirst: 'Zuerst Infrastruktur wählen…',
    totalMonthlyEstimate: 'Geschätzte Compute-Gesamtkosten (monatlich)',
    totalPriceDisclaimer:
      'Indikative USD/Monat: 3× Control Plane mit Standard-Plattformtyp plus alle Pools. Kein Angebot.',
    labelComputeReplicas: 'Anzahl Worker (Replicas)',
    btnGenerate: 'install-config.yaml generieren',
    dialogInfraTitle: 'Infrastruktur auswählen',
    dialogInfraDesc: 'Wähle die Plattform für deine OpenShift-Installation:',
    infraBaremetalDesc: 'Eigene physische Server',
    infraAwsDesc: 'Amazon Web Services',
    infraAzureDesc: 'Azure Cloud',
    infraIbmDesc: 'IBM Cloud VPC',
    infraGcpDesc: 'Google Cloud Platform',
    infraPowervsDesc: 'IBM Power Virtual Server',
    dialogAwsTitle: 'AWS-Konfiguration',
    dialogAzureTitle: 'Azure-Konfiguration',
    dialogIbmTitle: 'IBM Cloud-Konfiguration',
    dialogBaremetalTitle: 'Bare-Metal-Konfiguration',
    dialogGcpTitle: 'Google-Cloud-Konfiguration',
    dialogPowervsTitle: 'IBM Power (Power VS) Konfiguration',
    labelRegion: 'Region',
    labelAwsInstance: 'Standard-Instanztyp (Control Plane)',
    labelAzureRg: 'Base Domain Resource Group',
    phAzureRg: 'resource-group-name',
    labelProvNet: 'Provisioning-Netzwerk',
    labelApiVip: 'API VIP',
    labelIngressVip: 'Ingress VIP',
    btnApply: 'Übernehmen',
    dialogOutputTitle: 'install-config.yaml',
    btnCopy: 'Kopieren',
    btnSaveAs: 'Als Datei speichern…',
    btnTestConnection: 'Verbindung testen',
    testConnRunning: 'Prüfe…',
    testConnSuccessAws: 'Verbindung OK. Identität: {arn}',
    testConnSuccessAzure: 'Verbindung OK. Azure-AD-Token erhalten.',
    testConnSuccessIbm: 'Verbindung OK. IBM-Cloud-IAM-Token erhalten.',
    testConnSuccessGcp:
      'Verbindung OK. Projekt-ID und Service-Account-JSON sind vorhanden und das JSON ist gültig.',
    testConnSuccessPowervs:
      'Verbindung OK. IBM-Cloud-IAM-Token erhalten; Power-VS-Service-Instanz-ID ist gesetzt.',
    testConnSuccessBm:
      'Eingaben wirken plausibel (BMC und VIP-Formate). Kein Live-BMC-Check im Browser.',
    testConnSuccessGeneric: 'OK.',
    testErrMissingAws: 'Access-Key-ID und geheimer Zugriffsschlüssel ausfüllen.',
    testErrMissingAzure: 'Abonnement-, Mandanten-, Client-ID und Client-Geheimnis ausfüllen.',
    testErrMissingIbm: 'IBM-Cloud-API-Key eintragen.',
    testErrMissingBm: 'BMC-Benutzername und -Passwort eintragen.',
    testErrInvalidApiVip: 'API-VIP muss bei Angabe eine gültige IPv4-Adresse sein.',
    testErrInvalidIngressVip: 'Ingress-VIP muss bei Angabe eine gültige IPv4-Adresse sein.',
    testErrAwsCli:
      'Live-AWS-Test unter PHP benötigt die AWS-CLI im PATH. Oder das Go-Standalone-Binary (integrierter Test).',
    testErrAwsCliFailed: 'AWS-CLI lieferte keine gültige Identität. Keys und Region prüfen.',
    testErrAzureToken: 'Azure-Token-Antwort konnte nicht gelesen werden.',
    testErrIbmToken: 'IBM-Token-Antwort konnte nicht gelesen werden.',
    testErrAzureDetail: 'Azure: ',
    testErrIbmDetail: 'IBM: ',
    testErrAwsDetail: 'AWS: ',
    testConnNetworkError:
      'Test-API nicht erreichbar. Unter php -S: api/test-connection.php; das Go-Binary bietet /api/test-connection.',
    testConnUnknown: 'Unerwartete Antwort.',
    testErrUnknownPlatform: 'Unbekannte Plattform.',
    testErrMissingGcpProject: 'GCP-Projekt-ID eingeben.',
    testErrMissingGcpSa: 'Service-Account-JSON einfügen.',
    testErrInvalidGcpJson: 'Service-Account-JSON ist kein gültiges JSON.',
    testErrMissingPowervsInstance: 'Power-VS-Service-Instanz-ID eingeben.',
    ariaSaveYaml: 'install-config.yaml auf dem Datenträger speichern',
    saveFileHint:
      'In Chrome, Edge und anderen Chromium-Browsern können Sie Ordner und Dateiname wählen. Safari und Firefox speichern im Standard-Download-Ordner.',
    btnPanelBack: 'Zurück',
    btnPanelNext: 'Weiter',
    ariaHelpToggle: 'Hilfe zu diesem Abschnitt',
    helpInfra:
      'Wählen Sie, wo der Cluster läuft: Public Cloud (AWS, Azure, IBM Cloud, Google Cloud, IBM Power VS) oder Bare Metal im eigenen Rechenzentrum. Davon hängen Plattform-Einstellungen und Kostenhinweise ab.',
    helpGeneral:
      'Der Cluster-Name sollte DNS-tauglich sein (Kleinbuchstaben, Zahlen, Punkte, Bindestriche). Die Base Domain wird für API- und App-DNS genutzt. Das Pull Secret berechtigt zu Red-Hat-Images—beziehen Sie es vom OpenShift Cluster Manager.',
    helpPlatform:
      'Über „Plattform-Einstellungen bearbeiten“ setzen Sie Region, Zugangsdaten und Standard-Instanztypen. Das betrifft vor allem die Control Plane; Compute-Pools können abweichen. Geheimnisse schützen und credential-Blöcke entfernen, falls der Installer sie ablehnt.',
    helpNetwork:
      'Nur ändern, wenn sich Überschneidungen mit bestehenden Netzen ergeben. Falsche Cluster- oder Service-CIDRs führen oft zu fehlgeschlagenen Installationen. Die Vorgaben entsprechen üblichen OpenShift-Netzen.',
    helpCompute:
      'Legen Sie Machine-Pools an (z. B. Worker). Replikas bestimmen die Knotenzahl pro Pool. Pro Pool einen Instanz- oder Bare-Metal-Typ wählen; die Schätzung enthält drei Control-Plane-Knoten.',
    helpExport:
      'Wenn alles ausgefüllt ist, YAML generieren. In die Zwischenablage kopieren oder als Datei speichern. Datei vertraulich behandeln—besonders mit Anbieter- oder BMC-Zugangsdaten.',
    ariaClose: 'Schließen',
    copied: 'Kopiert!',
    platformBaremetal: 'Bare Metal',
    platformAws: 'AWS',
    platformAzure: 'Microsoft Azure',
    platformIbm: 'IBM Cloud',
    platformGcp: 'Google Cloud',
    platformPowervs: 'IBM Power (Power VS)',
    credsNotInYaml:
      'Beim Generieren von install-config.yaml werden Anbieter-Zugangsdaten bei Bedarf im Wurzel-Block "credentials" mit ausgegeben (siehe YAML-Kommentare). In Produktion IAM, Umgebungsvariablen oder Secrets-Manager bevorzugen; Block entfernen, falls der Installer nicht validiert.',
    credsNotInYamlBm:
      'BMC-Zugangsdaten werden bei Generierung unter credentials.baremetal eingetragen, wenn ausgefüllt. Datei schützen und Block ggf. entfernen.',
    credsNotInYamlGcp:
      'Bei Generierung können GCP-Zugangsdaten im Wurzel-Block "credentials" erscheinen. In Produktion Workload Identity oder Secrets-Manager bevorzugen; Block entfernen, falls der Installer unbekannte Felder ablehnt.',
    credsNotInYamlPowervs:
      'IBM-Cloud-API-Material kann bei Generierung im Wurzel-Block "credentials" stehen, wenn ausgefüllt. Datei schützen und Block ggf. entfernen.',
    secCredentials: 'Zugangsdaten',
    secLocation: 'Standort',
    secPowervsService: 'Power-VS-Service',
    secHardware: 'Hardware-Profil',
    secNetworkInstall: 'Netzwerk & Installation',
    labelLocation: 'Standort',
    labelHardwareProfile: 'Standard-Instanztyp',
    labelAzureVmSize: 'Standard-VM-Größe',
    labelIbmProfile: 'Standard-Instanzprofil',
    labelAwsAccessKey: 'Access-Key-ID',
    labelAwsSecretKey: 'Geheimer Zugriffsschlüssel',
    labelAwsSessionToken: 'Session-Token (optional)',
    labelAzureSubscriptionId: 'Abonnement-ID (Subscription)',
    labelAzureTenantId: 'Mandanten-ID (Tenant)',
    labelAzureClientId: 'Client-ID (App-Registrierung)',
    labelAzureClientSecret: 'Client-Geheimnis',
    labelIbmApiKey: 'IBM-Cloud-API-Key',
    labelGcpProjectId: 'GCP-Projekt-ID',
    labelGcpServiceAccountJson: 'Service-Account-Schlüssel (JSON)',
    labelGcpMachineType: 'Standard-Maschinentyp (Control Plane)',
    labelPowervsServiceInstanceId: 'Power-VS-Service-Instanz-ID',
    labelPowervsVpcName: 'VPC-Name (optional)',
    phPowervsVpcName: 'z. B. my-vpc',
    labelPowervsRegion: 'Region',
    labelPowervsZone: 'Zone',
    labelPowervsProfile: 'Standard-Prozessorprofil',
    labelBmBmcUser: 'BMC-/IPMI-Benutzername',
    labelBmBmcPassword: 'BMC-/IPMI-Passwort',
    labelBmLocation: 'Rechenzentrum / Standort',
    labelBmHardware: 'Server-Hardwareprofil',
    priceEstimateTitle: 'Geschätzte Compute-Kosten (indikativ)',
    priceEstimateTitleBm: 'Geschätzte Hardware (indikativ)',
    pricePerMonth: '/ Monat',
    priceDisclaimer:
      'Grobe Schätzung im On-Demand-Stil für Control-Plane- und Worker-Knoten (siehe Schritt 5). Steuern, Storage, Netz und Rabatte fehlen. Kein Angebot.',
    priceDisclaimerBm:
      'Illustrative monatliche Kosten pro Knoten ähnlicher Auslastung. Tatsächliche Angebote hängen vom Anbieter ab.'
  },
  fr: {
    langName: 'Français',
    navAppTitle: 'Générateur install-config OpenShift',
    langLabel: 'Langue',
    docTitle: 'Générateur install-config OpenShift',
    pageTitle: 'Générateur install-config OpenShift',
    pageSubtitleHtml:
      'Générez <code>install-config.yaml</code> pour votre installation OpenShift',
    ariaTablist: 'Sections',
    tabInfrastructure: 'Infrastructure',
    tabGeneral: 'Général',
    tabPlatform: 'Plateforme',
    tabNetwork: 'Réseau',
    tabCompute: 'Calcul',
    tabExport: 'Export',
    panelLeadInfrastructure: 'Choisissez où s’exécutera votre cluster OpenShift.',
    panelLeadGeneral: 'Nom du cluster, domaine de base et pull secret.',
    panelLeadPlatform: 'Région, identifiants et matériel par défaut pour votre fournisseur.',
    panelLeadNetwork: 'Réseau cluster, préfixe d’hôte et réseau de services (facultatif).',
    panelLeadExport:
      'Générez install-config.yaml, copiez-le ou enregistrez-le dans un fichier.',
    step1: '1. Choisir l’infrastructure',
    btnSelectInfra: 'Choisir l’infrastructure…',
    btnChange: 'modifier',
    step2: '2. Paramètres généraux',
    labelClusterName: 'Nom du cluster',
    phClusterName: 'ex. dev, prod',
    labelBaseDomain: 'Domaine de base',
    phBaseDomain: 'ex. example.com',
    labelPullSecret: 'Pull secret (JSON)',
    phPullSecret: '{"auths":{"cloud.openshift.com":{...}}}',
    pullSecretHelp: 'Depuis',
    pullSecretLink: 'Red Hat OpenShift Cluster Manager',
    step3: '3. Paramètres spécifiques à la plateforme',
    platformPrefix: 'Plateforme :',
    btnEditPlatform: 'Modifier les paramètres de la plateforme',
    step4: '4. Réseau (facultatif)',
    networkCustomize: 'Personnaliser le réseau',
    labelClusterCidr: 'CIDR du réseau cluster',
    labelHostPrefix: 'Préfixe d’hôte',
    labelServiceNetwork: 'Réseau de services',
    step5: '5. Pools de calcul',
    computeCustomize: 'Personnaliser les nœuds de calcul',
    computePoolsHint:
      'Pools (nom, réplicas, type d’infra). Sur AWS/Azure/IBM : VM ou bare metal fournisseur dans la liste ; serveurs on-prem : « Bare metal » à l’étape 1. Estimation : 3× plan de contrôle plus tous les pools.',
    addComputePool: 'Ajouter un pool',
    poolName: 'Nom du pool',
    poolReplicas: 'Réplicas',
    poolInfraType: 'Type d’infra (par pool)',
    poolAwsBmOptgroup: 'AWS — EC2 bare metal (fournisseur)',
    poolAzureBmOptgroup: 'Azure — SKU très grandes / type bare metal (fournisseur)',
    poolIbmBmOptgroup: 'IBM Cloud — bare metal / dédié (fournisseur)',
    poolBmOptgroupLabel: 'Bare metal on-premises (votre datacenter)',
    poolBmOptgroupHint:
      'Pour des serveurs que vous possédez ou colocalisez, choisissez « Bare metal » à l’étape 1, puis une classe par pool.',
    removePool: 'Supprimer',
    poolSelectInfraFirst: 'Choisissez d’abord l’infrastructure…',
    totalMonthlyEstimate: 'Estimation mensuelle totale (calcul)',
    totalPriceDisclaimer:
      'USD/mois indicatifs : 3× plan de contrôle au type par défaut plus tous les pools. Pas un devis.',
    labelComputeReplicas: 'Nombre de workers (réplicas)',
    btnGenerate: 'Générer install-config.yaml',
    dialogInfraTitle: 'Choisir l’infrastructure',
    dialogInfraDesc: 'Sélectionnez la plateforme pour votre installation OpenShift :',
    infraBaremetalDesc: 'Serveurs physiques dédiés',
    infraAwsDesc: 'Amazon Web Services',
    infraAzureDesc: 'Cloud Azure',
    infraIbmDesc: 'IBM Cloud VPC',
    infraGcpDesc: 'Google Cloud Platform',
    infraPowervsDesc: 'IBM Power Virtual Server',
    dialogAwsTitle: 'Configuration AWS',
    dialogAzureTitle: 'Configuration Azure',
    dialogIbmTitle: 'Configuration IBM Cloud',
    dialogBaremetalTitle: 'Configuration bare metal',
    dialogGcpTitle: 'Configuration Google Cloud',
    dialogPowervsTitle: 'Configuration IBM Power (Power VS)',
    labelRegion: 'Région',
    labelAwsInstance: 'Type d’instance par défaut (plan de contrôle)',
    labelAzureRg: 'Groupe de ressources du domaine de base',
    phAzureRg: 'nom-du-groupe-de-ressources',
    labelProvNet: 'Réseau de provisioning',
    labelApiVip: 'VIP API',
    labelIngressVip: 'VIP Ingress',
    btnApply: 'Appliquer',
    dialogOutputTitle: 'install-config.yaml',
    btnCopy: 'Copier',
    btnSaveAs: 'Enregistrer sous…',
    btnTestConnection: 'Tester la connexion',
    testConnRunning: 'Vérification…',
    testConnSuccessAws: 'Connexion OK. Identité : {arn}',
    testConnSuccessAzure: 'Connexion OK. Jeton Azure AD reçu.',
    testConnSuccessIbm: 'Connexion OK. Jeton IAM IBM Cloud reçu.',
    testConnSuccessGcp:
      'Connexion OK. ID de projet et JSON du compte de service présents ; le JSON est valide.',
    testConnSuccessPowervs:
      'Connexion OK. Jeton IAM IBM Cloud reçu ; ID d’instance de service Power VS renseigné.',
    testConnSuccessBm:
      'Saisie plausible (identifiants BMC et formats VIP). Pas de test BMC réel depuis le navigateur.',
    testConnSuccessGeneric: 'OK.',
    testErrMissingAws: 'Renseignez la clé d’accès et la clé secrète.',
    testErrMissingAzure: 'Renseignez l’abonnement, le locataire, l’ID client et le secret.',
    testErrMissingIbm: 'Renseignez la clé API IBM Cloud.',
    testErrMissingBm: 'Renseignez l’utilisateur et le mot de passe BMC.',
    testErrInvalidApiVip: 'Le VIP API doit être une IPv4 valide si renseigné.',
    testErrInvalidIngressVip: 'Le VIP Ingress doit être une IPv4 valide si renseigné.',
    testErrAwsCli:
      'Test AWS depuis PHP : nécessite la CLI AWS dans le PATH. Sinon utilisez l’exécutable Go (test intégré).',
    testErrAwsCliFailed: 'La CLI AWS n’a pas renvoyé d’identité valide. Vérifiez les clés et la région.',
    testErrAzureToken: 'Impossible d’analyser la réponse jeton Azure.',
    testErrIbmToken: 'Impossible d’analyser la réponse jeton IBM.',
    testErrAzureDetail: 'Azure : ',
    testErrIbmDetail: 'IBM : ',
    testErrAwsDetail: 'AWS : ',
    testConnNetworkError:
      'API de test injoignable. Avec php -S : api/test-connection.php ; l’exécutable Go expose /api/test-connection.',
    testConnUnknown: 'Réponse inattendue.',
    testErrUnknownPlatform: 'Plateforme inconnue.',
    testErrMissingGcpProject: 'Indiquez l’ID du projet GCP.',
    testErrMissingGcpSa: 'Collez la clé JSON du compte de service.',
    testErrInvalidGcpJson: 'Le JSON du compte de service n’est pas valide.',
    testErrMissingPowervsInstance: 'Indiquez l’ID d’instance de service Power VS.',
    ariaSaveYaml: 'Enregistrer install-config.yaml sur le disque',
    saveFileHint:
      'Avec Chrome, Edge ou un autre navigateur Chromium, vous pouvez choisir le dossier et le nom. Safari et Firefox utilisent le dossier de téléchargements par défaut.',
    btnPanelBack: 'Retour',
    btnPanelNext: 'Suivant',
    ariaHelpToggle: 'Aide pour cette section',
    helpInfra:
      'Choisissez l’environnement d’exécution : cloud public (AWS, Azure, IBM Cloud, Google Cloud, IBM Power VS) ou bare metal dans votre datacenter. Ce choix détermine les réglages plateforme et les estimations.',
    helpGeneral:
      'Le nom du cluster doit être compatible DNS (minuscules, chiffres, points, tirets). Le domaine de base sert aux enregistrements DNS API et applications. Le pull secret autorise les pulls d’images Red Hat (OpenShift Cluster Manager).',
    helpPlatform:
      'Utilisez « Modifier les paramètres de la plateforme » pour la région, les identifiants et les types d’instance par défaut (surtout le plan de contrôle). Les pools de calcul peuvent différer. Protégez les secrets et retirez le bloc credentials si l’installateur le refuse.',
    helpNetwork:
      'Modifiez ces CIDR uniquement en cas de chevauchement avec votre réseau existant. Des valeurs incorrectes bloquent souvent l’installation. Les défauts suivent les conventions OpenShift courantes.',
    helpCompute:
      'Ajoutez des pools de machines (ex. workers). Les réplicas fixent le nombre de nœuds. Choisissez un profil VM ou bare metal par pool ; le bandeau indique un coût mensuel indicatif avec 3 nœuds de plan de contrôle.',
    helpExport:
      'Générez le YAML lorsque le formulaire est prêt. Copiez-le ou enregistrez-le. Traitez le fichier comme sensible, surtout s’il contient encore des identifiants.',
    ariaClose: 'Fermer',
    copied: 'Copié !',
    platformBaremetal: 'Bare metal',
    platformAws: 'AWS',
    platformAzure: 'Microsoft Azure',
    platformIbm: 'IBM Cloud',
    platformGcp: 'Google Cloud',
    platformPowervs: 'IBM Power (Power VS)',
    credsNotInYaml:
      'Lors de la génération, les identifiants sont ajoutés dans un bloc racine "credentials" si renseignés (voir commentaires YAML). En production, privilégier IAM, variables d’environnement ou coffre-fort ; supprimer le bloc si le programme d’installation refuse le fichier.',
    credsNotInYamlBm:
      'Les identifiants BMC sont inclus sous credentials.baremetal si fournis. Protéger le fichier et retirer le bloc si nécessaire.',
    credsNotInYamlGcp:
      'Lors de la génération, des identifiants GCP peuvent apparaître dans un bloc racine "credentials". En production, privilégier Workload Identity ou un coffre-fort ; supprimer le bloc si nécessaire.',
    credsNotInYamlPowervs:
      'Des éléments liés à l’API IBM Cloud peuvent apparaître dans un bloc racine "credentials" si renseignés. Protéger le fichier et retirer le bloc si nécessaire.',
    secCredentials: 'Identifiants d’accès',
    secLocation: 'Emplacement',
    secPowervsService: 'Service Power VS',
    secHardware: 'Profil matériel',
    secNetworkInstall: 'Réseau et installation',
    labelLocation: 'Emplacement',
    labelHardwareProfile: 'Type d’instance par défaut',
    labelAzureVmSize: 'Taille de VM par défaut',
    labelIbmProfile: 'Profil d’instance par défaut',
    labelAwsAccessKey: 'ID de clé d’accès',
    labelAwsSecretKey: 'Clé d’accès secrète',
    labelAwsSessionToken: 'Jeton de session (facultatif)',
    labelAzureSubscriptionId: 'ID d’abonnement',
    labelAzureTenantId: 'ID de locataire (tenant)',
    labelAzureClientId: 'ID client (inscription d’application)',
    labelAzureClientSecret: 'Secret client',
    labelIbmApiKey: 'Clé API IBM Cloud',
    labelGcpProjectId: 'ID de projet GCP',
    labelGcpServiceAccountJson: 'Clé du compte de service (JSON)',
    labelGcpMachineType: 'Type de machine par défaut (plan de contrôle)',
    labelPowervsServiceInstanceId: 'ID d’instance de service Power VS',
    labelPowervsVpcName: 'Nom du VPC (facultatif)',
    phPowervsVpcName: 'ex. my-vpc',
    labelPowervsRegion: 'Région',
    labelPowervsZone: 'Zone',
    labelPowervsProfile: 'Profil processeur par défaut',
    labelBmBmcUser: 'Utilisateur BMC / IPMI',
    labelBmBmcPassword: 'Mot de passe BMC / IPMI',
    labelBmLocation: 'Datacenter / site',
    labelBmHardware: 'Profil matériel serveur',
    priceEstimateTitle: 'Estimation calcul (indicative)',
    priceEstimateTitleBm: 'Estimation matériel hébergé (indicative)',
    pricePerMonth: '/ mois',
    priceDisclaimer:
      'Estimation approximative type à la demande pour nœuds control plane et workers (étape 5). Taxes, stockage, réseau et remises non incluses. Pas un devis.',
    priceDisclaimerBm:
      'Coût mensuel illustratif par nœud pour une capacité comparable. Les devis réels dépendent du fournisseur.'
  },
  es: {
    langName: 'Español',
    navAppTitle: 'Generador install-config OpenShift',
    langLabel: 'Idioma',
    docTitle: 'Generador install-config OpenShift',
    pageTitle: 'Generador install-config OpenShift',
    pageSubtitleHtml:
      'Genera <code>install-config.yaml</code> para tu instalación de OpenShift',
    ariaTablist: 'Secciones',
    tabInfrastructure: 'Infraestructura',
    tabGeneral: 'General',
    tabPlatform: 'Plataforma',
    tabNetwork: 'Red',
    tabCompute: 'Cómputo',
    tabExport: 'Exportar',
    panelLeadInfrastructure: 'Elija dónde se ejecutará su clúster de OpenShift.',
    panelLeadGeneral: 'Nombre del clúster, dominio base y pull secret.',
    panelLeadPlatform: 'Región, credenciales y hardware predeterminado del proveedor.',
    panelLeadNetwork: 'Red del clúster, prefijo de host y red de servicios (opcional).',
    panelLeadExport:
      'Genere install-config.yaml, cópielo o guárdelo como archivo.',
    step1: '1. Elegir infraestructura',
    btnSelectInfra: 'Elegir infraestructura…',
    btnChange: 'cambiar',
    step2: '2. Ajustes generales',
    labelClusterName: 'Nombre del clúster',
    phClusterName: 'p. ej. dev, prod',
    labelBaseDomain: 'Dominio base',
    phBaseDomain: 'p. ej. example.com',
    labelPullSecret: 'Pull secret (JSON)',
    phPullSecret: '{"auths":{"cloud.openshift.com":{...}}}',
    pullSecretHelp: 'Desde',
    pullSecretLink: 'Red Hat OpenShift Cluster Manager',
    step3: '3. Ajustes específicos de la plataforma',
    platformPrefix: 'Plataforma:',
    btnEditPlatform: 'Editar ajustes de la plataforma',
    step4: '4. Red (opcional)',
    networkCustomize: 'Personalizar red',
    labelClusterCidr: 'CIDR de red del clúster',
    labelHostPrefix: 'Prefijo de host',
    labelServiceNetwork: 'Red de servicios',
    step5: '5. Pools de cómputo',
    computeCustomize: 'Personalizar nodos de cómputo',
    computePoolsHint:
      'Pools (nombre, réplicas, tipo de infra). En AWS/Azure/IBM: VM o bare metal del proveedor en el menú; servidores propios: «Bare metal» en el paso 1. Estimación: 3× plan de control más todos los pools.',
    addComputePool: 'Añadir pool de cómputo',
    poolName: 'Nombre del pool',
    poolReplicas: 'Réplicas',
    poolInfraType: 'Tipo de infra (por pool)',
    poolAwsBmOptgroup: 'AWS — EC2 bare metal (proveedor)',
    poolAzureBmOptgroup: 'Azure — SKUs grandes / tipo bare metal (proveedor)',
    poolIbmBmOptgroup: 'IBM Cloud — bare metal / dedicado (proveedor)',
    poolBmOptgroupLabel: 'Bare metal on-premises (su centro de datos)',
    poolBmOptgroupHint:
      'Para servidores propios o en colocación, elija «Bare metal» en el paso 1 y luego una clase por pool.',
    removePool: 'Quitar',
    poolSelectInfraFirst: 'Elija primero la infraestructura…',
    totalMonthlyEstimate: 'Estimación mensual total de cómputo',
    totalPriceDisclaimer:
      'USD/mes orientativos: 3× plan de control al tipo por defecto más todos los pools. No es una cotización.',
    labelComputeReplicas: 'Número de workers (réplicas)',
    btnGenerate: 'Generar install-config.yaml',
    dialogInfraTitle: 'Elegir infraestructura',
    dialogInfraDesc: 'Selecciona la plataforma para tu instalación de OpenShift:',
    infraBaremetalDesc: 'Servidores físicos propios',
    infraAwsDesc: 'Amazon Web Services',
    infraAzureDesc: 'Nube de Azure',
    infraIbmDesc: 'IBM Cloud VPC',
    infraGcpDesc: 'Google Cloud Platform',
    infraPowervsDesc: 'IBM Power Virtual Server',
    dialogAwsTitle: 'Configuración de AWS',
    dialogAzureTitle: 'Configuración de Azure',
    dialogIbmTitle: 'Configuración de IBM Cloud',
    dialogBaremetalTitle: 'Configuración bare metal',
    dialogGcpTitle: 'Configuración de Google Cloud',
    dialogPowervsTitle: 'Configuración de IBM Power (Power VS)',
    labelRegion: 'Región',
    labelAwsInstance: 'Tipo de instancia predeterminado (plan de control)',
    labelAzureRg: 'Grupo de recursos del dominio base',
    phAzureRg: 'nombre-del-grupo-de-recursos',
    labelProvNet: 'Red de aprovisionamiento',
    labelApiVip: 'VIP de API',
    labelIngressVip: 'VIP de Ingress',
    btnApply: 'Aplicar',
    dialogOutputTitle: 'install-config.yaml',
    btnCopy: 'Copiar',
    btnSaveAs: 'Guardar como archivo…',
    btnTestConnection: 'Probar conexión',
    testConnRunning: 'Comprobando…',
    testConnSuccessAws: 'Conexión correcta. Identidad: {arn}',
    testConnSuccessAzure: 'Conexión correcta. Token de Azure AD recibido.',
    testConnSuccessIbm: 'Conexión correcta. Token IAM de IBM Cloud recibido.',
    testConnSuccessGcp:
      'Conexión correcta. ID de proyecto y JSON de cuenta de servicio presentes; el JSON es válido.',
    testConnSuccessPowervs:
      'Conexión correcta. Token IAM de IBM Cloud recibido; ID de instancia de servicio Power VS indicado.',
    testConnSuccessBm:
      'Los datos parecen válidos (BMC y formatos VIP). Sin comprobación BMC en vivo desde el navegador.',
    testConnSuccessGeneric: 'OK.',
    testErrMissingAws: 'Indique la clave de acceso y la clave secreta.',
    testErrMissingAzure: 'Indique suscripción, inquilino, ID de cliente y secreto.',
    testErrMissingIbm: 'Indique la clave API de IBM Cloud.',
    testErrMissingBm: 'Indique usuario y contraseña BMC.',
    testErrInvalidApiVip: 'El VIP de API debe ser una IPv4 válida si se indica.',
    testErrInvalidIngressVip: 'El VIP de Ingress debe ser una IPv4 válida si se indica.',
    testErrAwsCli:
      'La prueba AWS en PHP requiere la CLI de AWS en el PATH. O use el binario Go (prueba integrada).',
    testErrAwsCliFailed: 'La CLI de AWS no devolvió una identidad válida. Revise claves y región.',
    testErrAzureToken: 'No se pudo analizar la respuesta de token de Azure.',
    testErrIbmToken: 'No se pudo analizar la respuesta de token de IBM.',
    testErrAzureDetail: 'Azure: ',
    testErrIbmDetail: 'IBM: ',
    testErrAwsDetail: 'AWS: ',
    testConnNetworkError:
      'No se alcanza la API de prueba. Con php -S use api/test-connection.php; el binario Go incluye /api/test-connection.',
    testConnUnknown: 'Respuesta inesperada.',
    testErrUnknownPlatform: 'Plataforma desconocida.',
    testErrMissingGcpProject: 'Indique el ID del proyecto de GCP.',
    testErrMissingGcpSa: 'Pegue la clave JSON de la cuenta de servicio.',
    testErrInvalidGcpJson: 'El JSON de la cuenta de servicio no es válido.',
    testErrMissingPowervsInstance: 'Indique el ID de instancia de servicio de Power VS.',
    ariaSaveYaml: 'Guardar install-config.yaml en el disco',
    saveFileHint:
      'En Chrome, Edge u otros navegadores Chromium puede elegir la carpeta y el nombre. Safari y Firefox guardan en la carpeta de descargas predeterminada.',
    btnPanelBack: 'Atrás',
    btnPanelNext: 'Siguiente',
    ariaHelpToggle: 'Ayuda de esta sección',
    helpInfra:
      'Elija dónde se ejecutará el clúster: nube pública (AWS, Azure, IBM Cloud, Google Cloud, IBM Power VS) o bare metal en su centro de datos. Eso determina la configuración de plataforma y las estimaciones.',
    helpGeneral:
      'El nombre del clúster debe ser válido para DNS (minúsculas, números, puntos, guiones). El dominio base se usa para DNS de API y aplicaciones. El pull secret autoriza imágenes de Red Hat (OpenShift Cluster Manager).',
    helpPlatform:
      'Use «Editar ajustes de la plataforma» para región, credenciales y tipos de instancia por defecto (sobre todo el plano de control). Los pools de cómputo pueden diferir. Proteja los secretos y elimine el bloque credentials si el instalador lo rechaza.',
    helpNetwork:
      'Cambie estos CIDR solo si chocan con redes existentes. Valores incorrectos suelen impedir la instalación. Los valores por defecto siguen las convenciones habituales de OpenShift.',
    helpCompute:
      'Añada pools de máquinas (p. ej. workers). Las réplicas fijan cuántos nodos hay por pool. Elija un perfil de VM o bare metal por pool; el banner muestra un coste mensual orientativo con 3 nodos de plano de control.',
    helpExport:
      'Genere el YAML cuando el formulario esté listo. Cópielo o guárdelo como archivo. Trate el archivo como confidencial, especialmente si aún contiene credenciales.',
    ariaClose: 'Cerrar',
    copied: '¡Copiado!',
    platformBaremetal: 'Bare metal',
    platformAws: 'AWS',
    platformAzure: 'Microsoft Azure',
    platformIbm: 'IBM Cloud',
    platformGcp: 'Google Cloud',
    platformPowervs: 'IBM Power (Power VS)',
    credsNotInYaml:
      'Al generar install-config.yaml, las credenciales del proveedor se incluyen en un bloque raíz "credentials" si las rellenó (véase los comentarios YAML). En producción prefiera IAM, variables de entorno o un gestor de secretos; elimine el bloque si el instalador rechaza el archivo.',
    credsNotInYamlBm:
      'Las credenciales BMC se incluyen en credentials.baremetal si las indicó. Proteja el archivo y elimine el bloque si hace falta.',
    credsNotInYamlGcp:
      'Al generar install-config.yaml, las credenciales de GCP pueden aparecer en un bloque raíz "credentials". En producción prefiera Workload Identity o un gestor de secretos; elimine el bloque si hace falta.',
    credsNotInYamlPowervs:
      'Material de API de IBM Cloud puede aparecer en un bloque raíz "credentials" si lo rellenó. Proteja el archivo y elimine el bloque si hace falta.',
    secCredentials: 'Credenciales de acceso',
    secLocation: 'Ubicación',
    secPowervsService: 'Servicio Power VS',
    secHardware: 'Perfil de hardware',
    secNetworkInstall: 'Red e instalación',
    labelLocation: 'Ubicación',
    labelHardwareProfile: 'Tipo de instancia predeterminado',
    labelAzureVmSize: 'Tamaño de VM predeterminado',
    labelIbmProfile: 'Perfil de instancia predeterminado',
    labelAwsAccessKey: 'ID de clave de acceso',
    labelAwsSecretKey: 'Clave de acceso secreta',
    labelAwsSessionToken: 'Token de sesión (opcional)',
    labelAzureSubscriptionId: 'ID de suscripción',
    labelAzureTenantId: 'ID de inquilino (tenant)',
    labelAzureClientId: 'ID de cliente (registro de aplicación)',
    labelAzureClientSecret: 'Secreto de cliente',
    labelIbmApiKey: 'Clave API de IBM Cloud',
    labelGcpProjectId: 'ID del proyecto de GCP',
    labelGcpServiceAccountJson: 'Clave de cuenta de servicio (JSON)',
    labelGcpMachineType: 'Tipo de máquina predeterminado (plano de control)',
    labelPowervsServiceInstanceId: 'ID de instancia de servicio Power VS',
    labelPowervsVpcName: 'Nombre de VPC (opcional)',
    phPowervsVpcName: 'p. ej. my-vpc',
    labelPowervsRegion: 'Región',
    labelPowervsZone: 'Zona',
    labelPowervsProfile: 'Perfil de procesador predeterminado',
    labelBmBmcUser: 'Usuario BMC / IPMI',
    labelBmBmcPassword: 'Contraseña BMC / IPMI',
    labelBmLocation: 'Centro de datos / sitio',
    labelBmHardware: 'Perfil de hardware del servidor',
    priceEstimateTitle: 'Estimación de cómputo (indicativa)',
    priceEstimateTitleBm: 'Estimación de hardware alojado (indicativa)',
    pricePerMonth: '/ mes',
    priceDisclaimer:
      'Estimación aproximada estilo bajo demanda para nodos de control y workers (paso 5). No incluye impuestos, almacenamiento, red ni descuentos. No es una cotización.',
    priceDisclaimerBm:
      'Coste mensual ilustrativo por nodo para capacidad similar. Las cotizaciones reales dependen del proveedor.'
  }
};

const I18N_STORAGE_KEY = 'oic-lang';

function getLocale() {
  const stored = localStorage.getItem(I18N_STORAGE_KEY);
  if (stored && I18N[stored]) return stored;
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  if (I18N[nav]) return nav;
  return 'en';
}

let currentLocale = getLocale();

function t(key) {
  const pack = I18N[currentLocale] || I18N.en;
  return pack[key] !== undefined ? pack[key] : (I18N.en[key] ?? key);
}

function setLocale(lang) {
  if (!I18N[lang]) return;
  currentLocale = lang;
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  document.documentElement.lang = lang === 'en' ? 'en' : lang;
  applyI18n();
}

function applyI18n() {
  document.title = t('docTitle');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    if (key === 'pageSubtitle') {
      el.innerHTML = t('pageSubtitleHtml');
      return;
    }
    el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.placeholder = t(key);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) el.setAttribute('aria-label', t(key));
  });

  document.querySelectorAll('[data-infra-desc]').forEach(el => {
    const p = el.getAttribute('data-infra-desc');
    if (p) el.textContent = infraCardDesc(p);
  });

  const langSelect = document.getElementById('lang-select');
  if (langSelect) langSelect.value = currentLocale;

  if (typeof window.refreshPlatformUi === 'function') {
    window.refreshPlatformUi();
  }
  if (typeof window.refreshPriceEstimates === 'function') {
    window.refreshPriceEstimates();
  }
  if (typeof window.refreshAllPoolInfraSelects === 'function') {
    window.refreshAllPoolInfraSelects();
  }
}

function platformLabel(platform) {
  const map = {
    baremetal: 'platformBaremetal',
    aws: 'platformAws',
    azure: 'platformAzure',
    ibmcloud: 'platformIbm',
    gcp: 'platformGcp',
    powervs: 'platformPowervs'
  };
  return t(map[platform] || 'platformAws');
}

function infraCardDesc(platform) {
  const map = {
    baremetal: 'infraBaremetalDesc',
    aws: 'infraAwsDesc',
    azure: 'infraAzureDesc',
    ibmcloud: 'infraIbmDesc',
    gcp: 'infraGcpDesc',
    powervs: 'infraPowervsDesc'
  };
  return t(map[platform] || '');
}
