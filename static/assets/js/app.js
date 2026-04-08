/**
 * OpenShift Install-Config Generator
 */

const PLATFORM_DIALOGS = {
  baremetal: 'dialog-platform-baremetal',
  aws: 'dialog-platform-aws',
  azure: 'dialog-platform-azure',
  ibmcloud: 'dialog-platform-ibmcloud',
  gcp: 'dialog-platform-gcp',
  powervs: 'dialog-platform-powervs'
};

let selectedPlatform = null;
let platformConfig = {};
let computePoolSeq = 0;
/** Last generated YAML; cleared when infrastructure changes */
let lastGeneratedYaml = '';

function $(sel, root = document) {
  return root.querySelector(sel);
}

function $$(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function P() {
  return window.Pricing;
}

function formatUsd(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// ——— Compute pools ———

function getComputePools() {
  return $$('#compute-pools .compute-pool-row').map((row) => ({
    name: row.querySelector('.pool-name')?.value?.trim() || 'worker',
    replicas: parseInt(row.querySelector('.pool-replicas')?.value, 10) || 0,
    typeId: row.querySelector('.pool-infra-type')?.value || ''
  }));
}

function sanitizePoolName(name) {
  const raw = (name || 'worker').toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '');
  const s = raw || 'worker';
  return s.slice(0, 63);
}

function uniquifyPoolNames(pools) {
  const seen = new Set();
  return pools.map((p) => {
    const base = sanitizePoolName(p.name);
    let n = base;
    let i = 2;
    while (seen.has(n)) {
      n = `${base}-${i}`;
      i += 1;
    }
    seen.add(n);
    return { ...p, name: n };
  });
}

function getDefaultTypeIdForPlatform() {
  const cfg = platformConfig[selectedPlatform] || {};
  switch (selectedPlatform) {
    case 'aws':
      return cfg.instanceType || 'm5.xlarge';
    case 'azure':
      return cfg.vmSize || 'Standard_D8s_v5';
    case 'ibmcloud':
      return cfg.profile || 'bx2-16x64';
    case 'gcp':
      return cfg.machineType || 'n1-standard-8';
    case 'powervs':
      return cfg.powervsProfile || 'powervs-1x64';
    case 'baremetal':
      return cfg.bmHardware || 'r640-16x128';
    default:
      return '';
  }
}

function appendComputePoolBareMetalHint(selectEl) {
  if (!selectEl) return;
  const og = document.createElement('optgroup');
  og.label = typeof t === 'function' ? t('poolBmOptgroupLabel') : 'Bare metal';
  const opt = document.createElement('option');
  opt.disabled = true;
  opt.value = '';
  opt.textContent = typeof t === 'function' ? t('poolBmOptgroupHint') : '';
  og.appendChild(opt);
  selectEl.appendChild(og);
}

function fillPoolInfraSelect(selectEl, platform, selectedId) {
  const pr = P();
  if (!selectEl || !pr) return;
  const fallback = selectedId || getDefaultTypeIdForPlatform();
  switch (platform) {
    case 'aws':
      pr.fillAwsInstanceSelect(selectEl, fallback || 'm5.xlarge');
      pr.appendAwsProviderBareMetalOptgroup(
        selectEl,
        fallback,
        typeof t === 'function' ? t('poolAwsBmOptgroup') : undefined
      );
      appendComputePoolBareMetalHint(selectEl);
      break;
    case 'azure':
      pr.fillAzureSizeSelect(selectEl, fallback || 'Standard_D8s_v5');
      pr.appendAzureProviderBareMetalOptgroup(
        selectEl,
        fallback,
        typeof t === 'function' ? t('poolAzureBmOptgroup') : undefined
      );
      appendComputePoolBareMetalHint(selectEl);
      break;
    case 'ibmcloud':
      pr.fillIbmProfileSelect(selectEl, fallback || 'bx2-16x64');
      pr.appendIbmProviderBareMetalOptgroup(
        selectEl,
        fallback,
        typeof t === 'function' ? t('poolIbmBmOptgroup') : undefined
      );
      appendComputePoolBareMetalHint(selectEl);
      break;
    case 'gcp':
      pr.fillGcpMachineSelect(selectEl, fallback || 'n1-standard-8');
      appendComputePoolBareMetalHint(selectEl);
      break;
    case 'powervs':
      pr.fillPowervsProfileSelect(selectEl, fallback || 'powervs-1x64');
      break;
    case 'baremetal':
      pr.fillBareMetalComputePoolSelect(selectEl, fallback || 'r640-16x128');
      break;
    default:
      selectEl.innerHTML = `<option value="">${typeof t === 'function' ? t('poolSelectInfraFirst') : 'Select infrastructure first'}</option>`;
  }
}

function refreshAllPoolInfraSelects() {
  $$('#compute-pools .compute-pool-row').forEach((row) => {
    const sel = row.querySelector('.pool-infra-type');
    const current = sel.value;
    fillPoolInfraSelect(sel, selectedPlatform, current || undefined);
  });
}

window.refreshAllPoolInfraSelects = refreshAllPoolInfraSelects;

function addComputePoolRow(preset = {}) {
  const wrap = $('#compute-pools');
  if (!wrap) return;
  computePoolSeq += 1;
  const id = computePoolSeq;
  const row = document.createElement('div');
  row.className = 'compute-pool-row';
  row.dataset.poolId = String(id);

  const defaultName = preset.name ?? (id === 1 ? 'worker' : `worker${id}`);
  const defaultReplicas = preset.replicas ?? 3;

  row.innerHTML = `
    <div class="compute-pool-grid">
      <div class="form-group">
        <label class="pool-label-name" data-i18n="poolName">Pool name</label>
        <input type="text" class="pool-name" pattern="[a-z0-9]([a-z0-9-]*[a-z0-9])?" maxlength="63">
      </div>
      <div class="form-group">
        <label class="pool-label-replicas" data-i18n="poolReplicas">Replicas</label>
        <input type="number" class="pool-replicas" min="0">
      </div>
      <div class="form-group">
        <label class="pool-label-infra" data-i18n="poolInfraType">Infra type</label>
        <select class="pool-infra-type"></select>
      </div>
      <div class="form-group form-group-actions">
        <button type="button" class="btn btn-link pool-remove" data-i18n="removePool">Remove</button>
      </div>
    </div>
  `;
  row.querySelector('.pool-name').value = defaultName;
  row.querySelector('.pool-replicas').value = String(defaultReplicas);

  wrap.appendChild(row);

  const sel = row.querySelector('.pool-infra-type');
  fillPoolInfraSelect(sel, selectedPlatform, preset.typeId);

  row.querySelector('.pool-remove').onclick = () => removePoolRow(row);

  row.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('change', onComputePoolFieldChange);
    el.addEventListener('input', onComputePoolFieldChange);
  });

  if (typeof applyI18n === 'function') {
    row.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });
  }

  onComputePoolFieldChange();
}

function removePoolRow(row) {
  const wrap = $('#compute-pools');
  if (!wrap || $$('#compute-pools .compute-pool-row').length <= 1) return;
  row.remove();
  onComputePoolFieldChange();
}

function onComputePoolFieldChange() {
  updateTotalClusterPrice();
  if (selectedPlatform) {
    const dlg = $(`#${PLATFORM_DIALOGS[selectedPlatform]}`);
    if (dlg && dlg.open) refreshPriceForPlatform(selectedPlatform);
  }
}

function initComputePools() {
  const wrap = $('#compute-pools');
  if (!wrap || wrap.querySelector('.compute-pool-row')) return;
  addComputePoolRow({ name: 'worker', replicas: 3 });
}

function estimateTotalMonthlyUsd() {
  const pr = P();
  if (!pr || !selectedPlatform) return null;
  const cfg = platformConfig[selectedPlatform] || {};
  const rawPools = getComputePools().map((p) => ({
    replicas: Math.max(0, p.replicas),
    typeId: p.typeId || getDefaultTypeIdForPlatform()
  }));

  switch (selectedPlatform) {
    case 'aws':
      return pr.estimateAwsFull(
        cfg.region || 'eu-central-1',
        cfg.instanceType || 'm5.xlarge',
        rawPools
      );
    case 'azure':
      return pr.estimateAzureFull(
        cfg.region || 'westeurope',
        cfg.vmSize || 'Standard_D8s_v5',
        rawPools
      );
    case 'ibmcloud':
      return pr.estimateIbmFull(
        cfg.region || 'eu-de',
        cfg.profile || 'bx2-16x64',
        rawPools
      );
    case 'gcp':
      return pr.estimateGcpFull(
        cfg.region || 'europe-west1',
        cfg.machineType || 'n1-standard-8',
        rawPools
      );
    case 'powervs':
      return pr.estimatePowervsFull(
        cfg.powervsRegion || 'tor',
        cfg.powervsProfile || 'powervs-1x64',
        rawPools
      );
    case 'baremetal':
      return pr.estimateBareMetalFull(
        cfg.bmLocation || 'eu-fra',
        cfg.bmHardware || 'r640-16x128',
        rawPools
      );
    default:
      return null;
  }
}

function updateTotalClusterPrice() {
  const el = $('#total-price-value');
  if (!el) return;
  if (!selectedPlatform) {
    el.textContent = '—';
    return;
  }
  const usd = estimateTotalMonthlyUsd();
  if (usd === null || Number.isNaN(usd)) {
    el.textContent = '—';
    return;
  }
  el.textContent = formatUsd(usd);
}

function buildComputePlatformBlock(typeId) {
  const cfg = platformConfig[selectedPlatform] || {};
  const t = typeId || getDefaultTypeIdForPlatform();
  switch (selectedPlatform) {
    case 'aws':
      return { aws: { type: t || cfg.instanceType || 'm5.xlarge' } };
    case 'azure':
      return { azure: { type: t || cfg.vmSize || 'Standard_D8s_v5' } };
    case 'ibmcloud':
      return { ibmcloud: { type: t || cfg.profile || 'bx2-16x64' } };
    case 'gcp':
      return { gcp: { type: t || cfg.machineType || 'n1-standard-8' } };
    case 'powervs': {
      const pr = P();
      const tid = t || cfg.powervsProfile || 'powervs-1x64';
      const prof = pr?.POWER_PROFILES?.find((p) => p.id === tid) || pr?.POWER_PROFILES?.[1];
      if (!prof) return { powervs: { processors: 1, memoryGiB: 64 } };
      return { powervs: { processors: prof.processors, memoryGiB: prof.memoryGiB } };
    }
    case 'baremetal':
      return {};
    default:
      return {};
  }
}

function buildComputeForYaml() {
  let pools = getComputePools().map((p) => ({
    name: sanitizePoolName(p.name),
    replicas: Math.max(0, p.replicas),
    typeId: p.typeId || getDefaultTypeIdForPlatform()
  }));
  pools = uniquifyPoolNames(pools);
  return pools
    .filter((p) => p.replicas > 0 && p.name)
    .map((p) => {
      const entry = { name: p.name, replicas: p.replicas };
      const plat = buildComputePlatformBlock(p.typeId);
      if (plat && Object.keys(plat).length) entry.platform = plat;
      return entry;
    });
}

// Dialog: Infrastructure Selection
function openInfraDialog() {
  $('#dialog-infra').showModal();
}

function closeInfraDialog() {
  $('#dialog-infra').close();
}

function selectInfrastructure(platform) {
  selectedPlatform = platform;
  closeInfraDialog();

  $('#btn-select-infra').hidden = true;
  $('#selected-infra').hidden = false;
  $('#infra-badge').textContent = platformLabel(platform);

  const tabPlatform = $('#tab-btn-platform');
  if (tabPlatform) tabPlatform.disabled = false;

  lastGeneratedYaml = '';
  const yCode = $('#yaml-output code');
  if (yCode) yCode.textContent = '';
  const outDlg = $('#dialog-output');
  if (outDlg && outDlg.open) outDlg.close();
  updateYamlSaveControls();

  renderPlatformSection(platform);

  $('#btn-generate').disabled = false;

  platformConfig[platform] = platformConfig[platform] || getDefaultPlatformConfig(platform);
  refreshAllPoolInfraSelects();
  updateTotalClusterPrice();
}

function renderPlatformSection(platform) {
  const name = platformLabel(platform);
  const prefix = typeof t === 'function' ? t('platformPrefix') : 'Platform:';
  const btnLabel = typeof t === 'function' ? t('btnEditPlatform') : 'Edit platform settings';
  $('#platform-form').innerHTML = `
    <p>${prefix} <strong>${name}</strong></p>
    <button type="button" class="btn btn-secondary" id="btn-edit-platform">${btnLabel}</button>
  `;
  $('#btn-edit-platform').onclick = () => openPlatformDialog(platform);
}

window.refreshPlatformUi = function refreshPlatformUi() {
  if (selectedPlatform) {
    $('#infra-badge').textContent = platformLabel(selectedPlatform);
    renderPlatformSection(selectedPlatform);
  }
};

function openPlatformDialog(platform) {
  const dialogId = PLATFORM_DIALOGS[platform];
  if (dialogId) {
    const dialog = $(`#${dialogId}`);
    clearPlatformTestResult(platform);
    populatePlatformForm(platform);
    dialog.showModal();
    refreshPriceForPlatform(platform);
  }
}

function clearPlatformTestResult(platform) {
  const el = document.getElementById(`platform-test-result-${platform}`);
  if (!el) return;
  el.hidden = true;
  el.textContent = '';
  el.className = 'platform-test-result';
}

function buildTestConnectionPayload(platform) {
  switch (platform) {
    case 'aws':
      return {
        platform: 'aws',
        accessKeyId: $('#aws-access-key-id')?.value?.trim() ?? '',
        secretAccessKey: $('#aws-secret-access-key')?.value ?? '',
        sessionToken: $('#aws-session-token')?.value?.trim() ?? '',
        region: $('#aws-region-select')?.value || 'eu-central-1'
      };
    case 'azure':
      return {
        platform: 'azure',
        subscriptionId: $('#azure-subscription-id')?.value?.trim() ?? '',
        tenantId: $('#azure-tenant-id')?.value?.trim() ?? '',
        clientId: $('#azure-client-id')?.value?.trim() ?? '',
        clientSecret: $('#azure-client-secret')?.value ?? ''
      };
    case 'ibmcloud':
      return {
        platform: 'ibmcloud',
        apiKey: $('#ibm-api-key')?.value ?? ''
      };
    case 'gcp':
      return {
        platform: 'gcp',
        gcpProjectId: $('#gcp-project-id')?.value?.trim() ?? '',
        gcpServiceAccountJson: $('#gcp-service-account-json')?.value ?? ''
      };
    case 'powervs':
      return {
        platform: 'powervs',
        apiKey: $('#powervs-api-key')?.value ?? '',
        serviceInstanceID: $('#powervs-service-instance-id')?.value?.trim() ?? ''
      };
    case 'baremetal':
      return {
        platform: 'baremetal',
        bmcUser: $('#bm-bmc-user')?.value?.trim() ?? '',
        bmcPassword: $('#bm-bmc-password')?.value ?? '',
        apiVIP: $('#baremetal-apiVIP')?.value?.trim() ?? '',
        ingressVIP: $('#baremetal-ingressVIP')?.value?.trim() ?? ''
      };
    default:
      return { platform };
  }
}

function formatTestConnectionMessage(data) {
  if (!data || typeof data.message !== 'string') {
    return typeof t === 'function' ? t('testConnUnknown') : 'Unknown response';
  }
  const msg = data.message;
  const tr = (k) => (typeof t === 'function' ? t(k) : k);
  if (data.ok) {
    if (msg.startsWith('arn:aws')) {
      return tr('testConnSuccessAws').replace('{arn}', msg);
    }
    if (msg === 'azure_ok') return tr('testConnSuccessAzure');
    if (msg === 'ibm_ok') return tr('testConnSuccessIbm');
    if (msg === 'gcp_ok') return tr('testConnSuccessGcp');
    if (msg === 'powervs_ok') return tr('testConnSuccessPowervs');
    if (msg === 'baremetal_ok') return tr('testConnSuccessBm');
    return tr('testConnSuccessGeneric');
  }
  const keyMap = {
    missing_access_key_or_secret: 'testErrMissingAws',
    missing_azure_credentials: 'testErrMissingAzure',
    missing_ibm_api_key: 'testErrMissingIbm',
    missing_bmc_credentials: 'testErrMissingBm',
    invalid_api_vip: 'testErrInvalidApiVip',
    invalid_ingress_vip: 'testErrInvalidIngressVip',
    aws_cli_missing: 'testErrAwsCli',
    aws_cli_failed: 'testErrAwsCliFailed',
    azure_token_parse: 'testErrAzureToken',
    ibm_token_parse: 'testErrIbmToken',
    missing_gcp_project: 'testErrMissingGcpProject',
    missing_gcp_sa: 'testErrMissingGcpSa',
    invalid_gcp_json: 'testErrInvalidGcpJson',
    missing_powervs_instance: 'testErrMissingPowervsInstance',
    'unknown platform': 'testErrUnknownPlatform'
  };
  for (const [prefix, i18nKey] of Object.entries(keyMap)) {
    if (msg === prefix) return tr(i18nKey);
  }
  if (msg.startsWith('aws_sts:')) return tr('testErrAwsDetail') + msg.slice('aws_sts:'.length).trim();
  if (msg.startsWith('azure_token_')) return tr('testErrAzureDetail') + msg;
  if (msg.startsWith('ibm_token_')) return tr('testErrIbmDetail') + msg;
  if (msg.startsWith('aws_config:')) return msg;
  return msg;
}

async function postTestConnection(body) {
  const urls = ['/api/test-connection', '/api/test-connection.php'];
  let lastErr = null;
  for (const u of urls) {
    try {
      const res = await fetch(u, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        if (res.status === 404) continue;
        lastErr = new Error('invalid_json');
        continue;
      }
      return { res, data };
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('fetch_failed');
}

async function runPlatformTest(platform) {
  const box = document.getElementById(`platform-test-result-${platform}`);
  if (!box) return;
  box.hidden = false;
  box.className = 'platform-test-result platform-test-result--pending';
  box.textContent = typeof t === 'function' ? t('testConnRunning') : '…';

  const payload = buildTestConnectionPayload(platform);
  try {
    const { data } = await postTestConnection(payload);
    const ok = data && data.ok === true;
    box.className = ok
      ? 'platform-test-result platform-test-result--ok'
      : 'platform-test-result platform-test-result--err';
    box.textContent = formatTestConnectionMessage(data);
  } catch {
    box.className = 'platform-test-result platform-test-result--err';
    box.textContent = typeof t === 'function' ? t('testConnNetworkError') : 'Network error';
  }
}

function closePlatformDialog(platform) {
  const dialogId = PLATFORM_DIALOGS[platform];
  if (dialogId) $(`#${dialogId}`).close();
}

function populatePlatformForm(platform) {
  const cfg = platformConfig[platform] || {};
  const pr = P();
  if (!pr) return;

  switch (platform) {
    case 'aws':
      pr.fillRegionSelect($('#aws-region-select'), pr.AWS_REGIONS, cfg.region ?? 'eu-central-1');
      pr.fillAwsInstanceSelect($('#aws-instance-select'), cfg.instanceType ?? 'm5.xlarge');
      $('#aws-access-key-id').value = cfg.accessKeyId ?? '';
      $('#aws-secret-access-key').value = cfg.secretAccessKey ?? '';
      $('#aws-session-token').value = cfg.sessionToken ?? '';
      break;
    case 'azure':
      pr.fillRegionSelect($('#azure-region-select'), pr.AZURE_REGIONS, cfg.region ?? 'westeurope');
      pr.fillAzureSizeSelect($('#azure-vm-size-select'), cfg.vmSize ?? 'Standard_D8s_v5');
      $('#azure-subscription-id').value = cfg.subscriptionId ?? '';
      $('#azure-tenant-id').value = cfg.tenantId ?? '';
      $('#azure-client-id').value = cfg.clientId ?? '';
      $('#azure-client-secret').value = cfg.clientSecret ?? '';
      $('#azure-baseDomainResourceGroupName').value = cfg.baseDomainResourceGroupName ?? '';
      break;
    case 'ibmcloud':
      pr.fillRegionSelect($('#ibmcloud-region-select'), pr.IBM_REGIONS, cfg.region ?? 'eu-de');
      pr.fillIbmProfileSelect($('#ibm-profile-select'), cfg.profile ?? 'bx2-16x64');
      $('#ibm-api-key').value = cfg.apiKey ?? '';
      break;
    case 'gcp':
      $('#gcp-project-id').value = cfg.projectId ?? '';
      $('#gcp-service-account-json').value = cfg.serviceAccountJson ?? '';
      pr.fillRegionSelect($('#gcp-region-select'), pr.GCP_REGIONS, cfg.region ?? 'europe-west1');
      pr.fillGcpMachineSelect($('#gcp-machine-select'), cfg.machineType ?? 'n1-standard-8');
      break;
    case 'powervs':
      $('#powervs-api-key').value = cfg.apiKey ?? '';
      $('#powervs-service-instance-id').value = cfg.serviceInstanceID ?? '';
      pr.fillRegionSelect($('#powervs-region-select'), pr.POWERVS_REGIONS, cfg.powervsRegion ?? 'tor');
      $('#powervs-zone').value = cfg.zone ?? 'tor-1';
      $('#powervs-vpc-name').value = cfg.vpcName ?? '';
      pr.fillPowervsProfileSelect($('#powervs-profile-select'), cfg.powervsProfile ?? 'powervs-1x64');
      break;
    case 'baremetal':
      pr.fillRegionSelect($('#bm-location-select'), pr.BM_LOCATIONS, cfg.bmLocation ?? 'eu-fra');
      pr.fillBareMetalHardwareSelect($('#bm-hardware-select'), cfg.bmHardware ?? 'r640-16x128');
      $('#bm-bmc-user').value = cfg.bmcUser ?? '';
      $('#bm-bmc-password').value = cfg.bmcPassword ?? '';
      $('#baremetal-provisioningNetwork').value = cfg.provisioningNetwork ?? 'Managed';
      $('#baremetal-apiVIP').value = cfg.apiVIP ?? '';
      $('#baremetal-ingressVIP').value = cfg.ingressVIP ?? '';
      break;
  }
}

function savePlatformConfig(platform) {
  switch (platform) {
    case 'aws':
      platformConfig.aws = {
        accessKeyId: $('#aws-access-key-id').value.trim(),
        secretAccessKey: $('#aws-secret-access-key').value,
        sessionToken: $('#aws-session-token').value.trim(),
        region: $('#aws-region-select').value || 'eu-central-1',
        instanceType: $('#aws-instance-select').value || 'm5.xlarge'
      };
      break;
    case 'azure':
      platformConfig.azure = {
        subscriptionId: $('#azure-subscription-id').value.trim(),
        tenantId: $('#azure-tenant-id').value.trim(),
        clientId: $('#azure-client-id').value.trim(),
        clientSecret: $('#azure-client-secret').value,
        baseDomainResourceGroupName: $('#azure-baseDomainResourceGroupName').value.trim() || undefined,
        region: $('#azure-region-select').value || 'westeurope',
        vmSize: $('#azure-vm-size-select').value || 'Standard_D8s_v5'
      };
      break;
    case 'ibmcloud':
      platformConfig.ibmcloud = {
        apiKey: $('#ibm-api-key').value,
        region: $('#ibmcloud-region-select').value || 'eu-de',
        profile: $('#ibm-profile-select').value || 'bx2-16x64'
      };
      break;
    case 'gcp':
      platformConfig.gcp = {
        projectId: $('#gcp-project-id').value.trim(),
        serviceAccountJson: $('#gcp-service-account-json').value,
        region: $('#gcp-region-select').value || 'europe-west1',
        machineType: $('#gcp-machine-select').value || 'n1-standard-8'
      };
      break;
    case 'powervs':
      platformConfig.powervs = {
        apiKey: $('#powervs-api-key').value,
        serviceInstanceID: $('#powervs-service-instance-id').value.trim(),
        powervsRegion: $('#powervs-region-select').value || 'tor',
        zone: $('#powervs-zone').value.trim() || 'tor-1',
        vpcName: $('#powervs-vpc-name').value.trim() || undefined,
        powervsProfile: $('#powervs-profile-select').value || 'powervs-1x64'
      };
      break;
    case 'baremetal':
      platformConfig.baremetal = {
        bmcUser: $('#bm-bmc-user').value.trim(),
        bmcPassword: $('#bm-bmc-password').value,
        bmLocation: $('#bm-location-select').value || 'eu-fra',
        bmHardware: $('#bm-hardware-select').value || 'r640-16x128',
        provisioningNetwork: $('#baremetal-provisioningNetwork').value,
        apiVIP: $('#baremetal-apiVIP').value.trim() || undefined,
        ingressVIP: $('#baremetal-ingressVIP').value.trim() || undefined
      };
      break;
  }
  refreshAllPoolInfraSelects();
  updateTotalClusterPrice();
  closePlatformDialog(platform);
}

function getDefaultPlatformConfig(platform) {
  const defaults = {
    aws: {
      accessKeyId: '',
      secretAccessKey: '',
      sessionToken: '',
      region: 'eu-central-1',
      instanceType: 'm5.xlarge'
    },
    azure: {
      subscriptionId: '',
      tenantId: '',
      clientId: '',
      clientSecret: '',
      baseDomainResourceGroupName: '',
      region: 'westeurope',
      vmSize: 'Standard_D8s_v5'
    },
    ibmcloud: {
      apiKey: '',
      region: 'eu-de',
      profile: 'bx2-16x64'
    },
    gcp: {
      projectId: '',
      serviceAccountJson: '',
      region: 'europe-west1',
      machineType: 'n1-standard-8'
    },
    powervs: {
      apiKey: '',
      serviceInstanceID: '',
      powervsRegion: 'tor',
      zone: 'tor-1',
      vpcName: '',
      powervsProfile: 'powervs-1x64'
    },
    baremetal: {
      bmcUser: '',
      bmcPassword: '',
      bmLocation: 'eu-fra',
      bmHardware: 'r640-16x128',
      provisioningNetwork: 'Managed',
      apiVIP: '',
      ingressVIP: ''
    }
  };
  return { ...defaults[platform] };
}

function refreshPriceForPlatform(platform) {
  const usd = estimateTotalMonthlyUsd();
  const text = usd === null || Number.isNaN(usd) ? '—' : formatUsd(usd);
  switch (platform) {
    case 'aws':
      $('#aws-price-value').textContent = text;
      break;
    case 'azure':
      $('#azure-price-value').textContent = text;
      break;
    case 'ibmcloud':
      $('#ibm-price-value').textContent = text;
      break;
    case 'gcp':
      $('#gcp-price-value').textContent = text;
      break;
    case 'powervs':
      $('#powervs-price-value').textContent = text;
      break;
    case 'baremetal':
      $('#bm-price-value').textContent = text;
      break;
  }
}

window.refreshPriceEstimates = function refreshPriceEstimates() {
  updateTotalClusterPrice();
  if (!selectedPlatform) return;
  const dlg = $(`#${PLATFORM_DIALOGS[selectedPlatform]}`);
  if (dlg && dlg.open) refreshPriceForPlatform(selectedPlatform);
};

function wirePricingListeners() {
  const onChange = () => {
    updateTotalClusterPrice();
    if (!selectedPlatform) return;
    const dlg = document.querySelector('dialog[open]');
    if (!dlg || !dlg.id.startsWith('dialog-platform-')) return;
    const platform = Object.entries(PLATFORM_DIALOGS).find(([, id]) => id === dlg.id)?.[0];
    if (platform) refreshPriceForPlatform(platform);
  };

  [
    'aws-region-select',
    'aws-instance-select',
    'azure-region-select',
    'azure-vm-size-select',
    'ibmcloud-region-select',
    'ibm-profile-select',
    'gcp-region-select',
    'gcp-machine-select',
    'powervs-region-select',
    'powervs-profile-select',
    'bm-location-select',
    'bm-hardware-select'
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', onChange);
      el.addEventListener('change', () => {
        if (
          id === 'aws-instance-select' ||
          id === 'azure-vm-size-select' ||
          id === 'ibm-profile-select' ||
          id === 'gcp-machine-select' ||
          id === 'powervs-profile-select' ||
          id === 'bm-hardware-select'
        ) {
          refreshAllPoolInfraSelects();
        }
      });
    }
  });

  const poolsRoot = $('#compute-pools');
  if (poolsRoot) {
    poolsRoot.addEventListener('change', onChange);
    poolsRoot.addEventListener('input', onChange);
  }
}

const YAML_CREDENTIALS_HEADER = `# SECURITY: This file may contain secrets. chmod 600. Never commit to version control.
# The "credentials" block is not part of the official OpenShift InstallConfig API; openshift-install
# may reject unknown root keys — remove "credentials" before "openshift-install create ..." if validation fails,
# or prefer IAM roles, ~/.aws/credentials, and environment variables in production.

`;

/**
 * Reads provider credentials from platformConfig and live DOM (so unsaved dialog values are included).
 */
function buildCredentialsObject() {
  if (!selectedPlatform) return null;
  const cfg = { ...(platformConfig[selectedPlatform] || {}) };

  switch (selectedPlatform) {
    case 'aws': {
      const accessKeyId = ($('#aws-access-key-id')?.value ?? cfg.accessKeyId ?? '').trim();
      const secretAccessKey = $('#aws-secret-access-key')?.value ?? cfg.secretAccessKey ?? '';
      const sessionToken = ($('#aws-session-token')?.value ?? cfg.sessionToken ?? '').trim();
      if (!accessKeyId && !secretAccessKey && !sessionToken) return null;
      const out = {
        provider: 'aws',
        aws: {
          accessKeyId,
          secretAccessKey
        }
      };
      if (sessionToken) out.aws.sessionToken = sessionToken;
      return out;
    }
    case 'azure': {
      const subscriptionId = ($('#azure-subscription-id')?.value ?? cfg.subscriptionId ?? '').trim();
      const tenantId = ($('#azure-tenant-id')?.value ?? cfg.tenantId ?? '').trim();
      const clientId = ($('#azure-client-id')?.value ?? cfg.clientId ?? '').trim();
      const clientSecret = $('#azure-client-secret')?.value ?? cfg.clientSecret ?? '';
      if (!subscriptionId && !tenantId && !clientId && !clientSecret) return null;
      return {
        provider: 'azure',
        azure: {
          subscriptionId,
          tenantId,
          clientId,
          clientSecret
        }
      };
    }
    case 'ibmcloud': {
      const apiKey = $('#ibm-api-key')?.value ?? cfg.apiKey ?? '';
      if (!apiKey) return null;
      return {
        provider: 'ibmcloud',
        ibmcloud: { apiKey }
      };
    }
    case 'gcp': {
      const raw = ($('#gcp-service-account-json')?.value ?? cfg.serviceAccountJson ?? '').trim();
      if (!raw) return null;
      const parsed = tryParseJSON(raw);
      return {
        provider: 'gcp',
        gcp: {
          serviceAccount: parsed || raw
        }
      };
    }
    case 'powervs': {
      const apiKey = $('#powervs-api-key')?.value ?? cfg.apiKey ?? '';
      if (!apiKey) return null;
      return {
        provider: 'powervs',
        powervs: { apiKey }
      };
    }
    case 'baremetal': {
      const bmcUsername = ($('#bm-bmc-user')?.value ?? cfg.bmcUser ?? '').trim();
      const bmcPassword = $('#bm-bmc-password')?.value ?? cfg.bmcPassword ?? '';
      if (!bmcUsername && !bmcPassword) return null;
      return {
        provider: 'baremetal',
        baremetal: {
          bmcUsername,
          bmcPassword
        }
      };
    }
    default:
      return null;
  }
}

function generateYAML() {
  const clusterName = $('#clusterName').value.trim();
  const baseDomain = $('#baseDomain').value.trim();
  const pullSecretRaw = $('#pullSecret').value.trim();
  const pullSecret = pullSecretRaw ? tryParseJSON(pullSecretRaw) : null;

  const clusterNetworkCidr = $('#clusterNetworkCidr').value.trim() || '10.128.0.0/14';
  const hostPrefix = parseInt($('#hostPrefix').value, 10) || 23;
  const serviceNetwork = $('#serviceNetwork').value.trim() || '172.30.0.0/16';

  const config = {
    apiVersion: 'v1',
    baseDomain,
    metadata: { name: clusterName || 'openshift' },
    platform: buildPlatformConfig(),
    pullSecret: pullSecret ? JSON.stringify(pullSecret) : '""'
  };

  if (clusterNetworkCidr || serviceNetwork) {
    config.networking = {
      networkType: 'OVNKubernetes',
      clusterNetwork: [{ cidr: clusterNetworkCidr, hostPrefix }],
      serviceNetwork: [serviceNetwork]
    };
  }

  const computeBlocks = buildComputeForYaml();
  if (computeBlocks.length) {
    config.compute = computeBlocks;
  }

  const cred = buildCredentialsObject();
  if (cred) {
    config.credentials = cred;
  }

  const body = objectToYAML(config);
  return cred ? YAML_CREDENTIALS_HEADER + body : body;
}

function buildPlatformConfig() {
  const cfg = platformConfig[selectedPlatform] || {};
  switch (selectedPlatform) {
    case 'baremetal':
      return {
        baremetal: {
          provisioningNetwork: cfg.provisioningNetwork || 'Managed',
          ...(cfg.apiVIP && { apiVIPs: [cfg.apiVIP] }),
          ...(cfg.ingressVIP && { ingressVIPs: [cfg.ingressVIP] })
        }
      };
    case 'aws':
      return {
        aws: {
          region: cfg.region || 'eu-central-1',
          defaultMachinePlatform: {
            type: cfg.instanceType || 'm5.xlarge'
          }
        }
      };
    case 'azure':
      return {
        azure: {
          region: cfg.region || 'westeurope',
          defaultMachinePlatform: {
            type: cfg.vmSize || 'Standard_D8s_v5'
          },
          ...(cfg.baseDomainResourceGroupName && {
            baseDomainResourceGroupName: cfg.baseDomainResourceGroupName
          })
        }
      };
    case 'ibmcloud':
      return {
        ibmcloud: {
          region: cfg.region || 'eu-de',
          defaultMachinePlatform: {
            type: cfg.profile || 'bx2-16x64'
          }
        }
      };
    case 'gcp':
      return {
        gcp: {
          projectID: cfg.projectId || '',
          region: cfg.region || 'europe-west1',
          defaultMachinePlatform: {
            type: cfg.machineType || 'n1-standard-8'
          }
        }
      };
    case 'powervs': {
      const pr = P();
      const pid = cfg.powervsProfile || 'powervs-1x64';
      const prof = pr?.POWER_PROFILES?.find((p) => p.id === pid) || pr?.POWER_PROFILES?.[1];
      const dmp = prof
        ? { processors: prof.processors, memoryGiB: prof.memoryGiB }
        : { processors: 1, memoryGiB: 64 };
      return {
        powervs: {
          region: cfg.powervsRegion || 'tor',
          zone: cfg.zone || 'tor-1',
          serviceInstanceID: cfg.serviceInstanceID || '',
          ...(cfg.vpcName && { vpcName: cfg.vpcName }),
          defaultMachinePlatform: dmp
        }
      };
    }
    default:
      return {};
  }
}

function objectToYAML(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  const padNext = '  '.repeat(indent + 1);
  const lines = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      const first = value[0];
      if (typeof first === 'object' && first !== null) {
        lines.push(`${pad}${key}:`);
        value.forEach(item => {
          const block = objectToYAML(item, indent + 2);
          const itemLines = block.split('\n').filter(Boolean);
          itemLines.forEach((line, i) => {
            const trimmed = line.replace(/^\s+/, '');
            lines.push(i === 0 ? `${padNext}- ${trimmed}` : padNext + line.slice(2));
          });
        });
      } else {
        lines.push(`${pad}${key}:`);
        value.forEach(v => lines.push(`${padNext}- ${formatYAMLValue(v)}`));
      }
    } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
      if (Object.keys(value).length === 0) continue;
      lines.push(`${pad}${key}:`);
      lines.push(objectToYAML(value, indent + 1));
    } else {
      lines.push(`${pad}${key}: ${formatYAMLValue(value)}`);
    }
  }
  return lines.join('\n');
}

function formatYAMLValue(v) {
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'string') {
    if (v === '""') return '""';
    if (/^\{.*\}$/.test(v) || v.includes('\n') || v.includes(':') || v.includes('#')) {
      return `"${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    }
    return v;
  }
  return String(v);
}

function tryParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function showOutput(yaml) {
  lastGeneratedYaml = yaml;
  updateYamlSaveControls();
  const output = $('#yaml-output code');
  output.textContent = yaml;
  $('#dialog-output').showModal();
}

function getYamlTextForSave() {
  return lastGeneratedYaml || '';
}

function updateYamlSaveControls() {
  const has = !!getYamlTextForSave().trim();
  const saveExport = $('#btn-save-yaml-file');
  const saveDialog = $('#btn-download-yaml');
  if (saveExport) saveExport.disabled = !has;
  if (saveDialog) saveDialog.disabled = !has;
}

function fallbackDownloadYaml(text) {
  const blob = new Blob([text], { type: 'text/yaml;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'install-config.yaml';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

async function saveInstallConfigToFile() {
  const text = getYamlTextForSave();
  if (!text.trim()) return;

  if (typeof window.showSaveFilePicker === 'function') {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'install-config.yaml',
        types: [
          {
            description: 'YAML',
            accept: {
              'text/yaml': ['.yaml', '.yml'],
              'application/x-yaml': ['.yaml', '.yml']
            }
          }
        ]
      });
      const writable = await handle.createWritable();
      await writable.write(text);
      await writable.close();
    } catch (e) {
      if (e && e.name === 'AbortError') return;
      fallbackDownloadYaml(text);
    }
  } else {
    fallbackDownloadYaml(text);
  }
}

function copyToClipboard() {
  const text = $('#yaml-output code').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = $('#btn-copy-yaml');
    btn.textContent = typeof t === 'function' ? t('copied') : 'Copied!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = typeof t === 'function' ? t('btnCopy') : 'Copy';
      btn.disabled = false;
    }, 1500);
  });
}

const PANEL_TAB_ORDER = ['infrastructure', 'general', 'platform', 'network', 'compute', 'export'];

function getNavigableTabs() {
  return PANEL_TAB_ORDER.filter((name) => {
    if (name === 'platform') {
      const b = $('#tab-btn-platform');
      return !!(b && !b.disabled);
    }
    return true;
  });
}

function goPanelNext() {
  const tabs = getNavigableTabs();
  const cur = document.querySelector('.tab-button[aria-selected="true"]')?.dataset.tab;
  const i = tabs.indexOf(cur);
  if (i < 0 || i >= tabs.length - 1) return;
  switchTab(tabs[i + 1]);
}

function goPanelBack() {
  const tabs = getNavigableTabs();
  const cur = document.querySelector('.tab-button[aria-selected="true"]')?.dataset.tab;
  const i = tabs.indexOf(cur);
  if (i <= 0) return;
  switchTab(tabs[i - 1]);
}

function closeAllHelpBubbles() {
  $$('.help-bubble').forEach((b) => {
    b.hidden = true;
  });
  $$('.help-bubble-trigger').forEach((t) => {
    t.setAttribute('aria-expanded', 'false');
  });
}

function initPanelNav() {
  $$('.panel-nav-next').forEach((btn) => {
    btn.addEventListener('click', () => goPanelNext());
  });
  $$('.panel-nav-back').forEach((btn) => {
    btn.addEventListener('click', () => goPanelBack());
  });
}

function initHelpBubbles() {
  $$('.help-bubble-trigger').forEach((trig) => {
    trig.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = trig.dataset.helpBubble;
      const bubble = id ? document.getElementById(id) : null;
      if (!bubble) return;
      const willOpen = bubble.hidden;
      closeAllHelpBubbles();
      if (willOpen) {
        bubble.hidden = false;
        trig.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.help-bubble-trigger') || e.target.closest('.help-bubble')) return;
    closeAllHelpBubbles();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllHelpBubbles();
  });
}

function switchTab(tabName) {
  const btn = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
  if (!btn || btn.disabled) return;
  const panelId = btn.getAttribute('aria-controls');
  if (!panelId) return;

  $$('.tab-button').forEach((b) => {
    const on = b === btn;
    b.setAttribute('aria-selected', on ? 'true' : 'false');
    b.tabIndex = on ? 0 : -1;
    b.classList.toggle('tab-button--active', on);
  });

  $$('.tab-panel').forEach((p) => {
    const active = p.id === panelId;
    p.hidden = !active;
    p.classList.toggle('tab-panel--active', active);
  });

  closeAllHelpBubbles();
}

function initTabs() {
  const tablist = $('#main-tablist');
  if (!tablist) return;

  $$('.tab-button').forEach((b) => {
    b.addEventListener('click', () => switchTab(b.dataset.tab));
  });

  tablist.addEventListener('keydown', (e) => {
    const tabs = $$('.tab-button').filter((t) => !t.disabled);
    const cur = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    if (cur < 0) return;
    let next = cur;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = (cur + 1) % tabs.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = (cur - 1 + tabs.length) % tabs.length;
      e.preventDefault();
    } else if (e.key === 'Home') {
      next = 0;
      e.preventDefault();
    } else if (e.key === 'End') {
      next = tabs.length - 1;
      e.preventDefault();
    }
    if (next !== cur) {
      tabs[next].focus();
      switchTab(tabs[next].dataset.tab);
    }
  });

  const first = $$('.tab-button').find((b) => b.getAttribute('aria-selected') === 'true');
  if (first) {
    first.tabIndex = 0;
    $$('.tab-button').forEach((b) => {
      if (b !== first) b.tabIndex = -1;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-test-platform');
    if (btn && btn.dataset.platform) {
      e.preventDefault();
      runPlatformTest(btn.dataset.platform);
    }
  });

  initTabs();
  initPanelNav();
  initHelpBubbles();
  initComputePools();

  if (typeof setLocale === 'function') {
    const lang = typeof getLocale === 'function' ? getLocale() : 'en';
    setLocale(lang);
  } else if (typeof applyI18n === 'function') {
    applyI18n();
  }

  $('#lang-select').onchange = e => {
    if (typeof setLocale === 'function') setLocale(e.target.value);
  };

  $('#btn-select-infra').onclick = openInfraDialog;
  $('#btn-change-infra').onclick = openInfraDialog;
  $('#btn-close-infra').onclick = closeInfraDialog;

  $('#dialog-infra').onclick = (e) => {
    if (e.target === $('#dialog-infra')) closeInfraDialog();
  };

  $$('.infra-card').forEach(card => {
    card.onclick = () => selectInfrastructure(card.dataset.platform);
  });

  $$('.btn-close-platform').forEach(btn => {
    btn.onclick = () => {
      const dialog = btn.closest('dialog');
      const platform = Object.entries(PLATFORM_DIALOGS).find(([, id]) => id === dialog.id)?.[0];
      if (platform) closePlatformDialog(platform);
    };
  });

  $$('.btn-save-platform').forEach(btn => {
    btn.onclick = () => {
      const dialog = btn.closest('dialog');
      const platform = Object.entries(PLATFORM_DIALOGS).find(([, id]) => id === dialog.id)?.[0];
      if (platform) savePlatformConfig(platform);
    };
  });

  const btnAddPool = $('#btn-add-compute-pool');
  if (btnAddPool) {
    btnAddPool.onclick = () => addComputePoolRow({});
  }

  $('#btn-generate').onclick = () => {
    const yaml = generateYAML();
    showOutput(yaml);
  };

  $('#btn-copy-yaml').onclick = copyToClipboard;
  $('#btn-download-yaml').onclick = () => {
    saveInstallConfigToFile();
  };
  const btnSaveYaml = $('#btn-save-yaml-file');
  if (btnSaveYaml) {
    btnSaveYaml.onclick = () => saveInstallConfigToFile();
  }
  $('#btn-close-output').onclick = () => $('#dialog-output').close();

  wirePricingListeners();
  updateTotalClusterPrice();
});
