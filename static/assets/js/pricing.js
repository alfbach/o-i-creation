/**
 * Indicative on-demand compute estimates (USD/month, ~730 h).
 * Not a quote — rates are approximate; use cloud pricing tools for binding numbers.
 */
(function (global) {
  const HOURS_PER_MONTH = 730;

  const AWS_REGIONS = [
    { id: 'us-east-1', label: 'US East (N. Virginia)', mult: 0.92 },
    { id: 'us-west-2', label: 'US West (Oregon)', mult: 0.92 },
    { id: 'eu-central-1', label: 'Europe (Frankfurt)', mult: 1.0 },
    { id: 'eu-west-1', label: 'Europe (Ireland)', mult: 0.98 },
    { id: 'ap-southeast-1', label: 'Asia Pacific (Singapore)', mult: 1.08 }
  ];

  const AWS_INSTANCES = [
    { id: 'm5.large', hourlyUsd: 0.096, vcpus: 2, ramGb: 8 },
    { id: 'm5.xlarge', hourlyUsd: 0.192, vcpus: 4, ramGb: 16 },
    { id: 'm5.2xlarge', hourlyUsd: 0.384, vcpus: 8, ramGb: 32 },
    { id: 'm5.4xlarge', hourlyUsd: 0.768, vcpus: 16, ramGb: 64 },
    { id: 'c5.4xlarge', hourlyUsd: 0.68, vcpus: 16, ramGb: 32 }
  ];

  /** AWS EC2 bare metal (metal) instance families — illustrative on-demand $/h; confirm in your region. */
  const AWS_PROVIDER_BARE_METAL = [
    { id: 'm5.metal', hourlyUsd: 4.608, vcpus: 96, ramGb: 384 },
    { id: 'm5zn.metal', hourlyUsd: 3.964, vcpus: 48, ramGb: 192 },
    { id: 'c5.metal', hourlyUsd: 4.08, vcpus: 96, ramGb: 192 },
    { id: 'r5.metal', hourlyUsd: 6.048, vcpus: 96, ramGb: 768 },
    { id: 'm6i.metal', hourlyUsd: 5.424, vcpus: 128, ramGb: 512 },
    { id: 'i3.metal', hourlyUsd: 4.992, vcpus: 72, ramGb: 512 }
  ];

  const AZURE_REGIONS = [
    { id: 'westeurope', label: 'West Europe', mult: 1.0 },
    { id: 'northeurope', label: 'North Europe', mult: 0.98 },
    { id: 'eastus', label: 'East US', mult: 0.9 },
    { id: 'westus2', label: 'West US 2', mult: 0.9 },
    { id: 'germanywestcentral', label: 'Germany West Central', mult: 1.05 }
  ];

  const AZURE_SIZES = [
    { id: 'Standard_D8s_v5', hourlyUsd: 0.384, vcpus: 8, ramGb: 32 },
    { id: 'Standard_D16s_v5', hourlyUsd: 0.768, vcpus: 16, ramGb: 64 },
    { id: 'Standard_D32s_v5', hourlyUsd: 1.536, vcpus: 32, ramGb: 128 },
    { id: 'Standard_E8s_v5', hourlyUsd: 0.504, vcpus: 8, ramGb: 64 }
  ];

  /** Azure large / bare-metal-class SKUs (representative; verify availability & BareMetal offers in your subscription). */
  const AZURE_PROVIDER_BARE_METAL = [
    { id: 'Standard_M64ms_v2', hourlyUsd: 4.15, vcpus: 64, ramGb: 1750 },
    { id: 'Standard_M128ms_v2', hourlyUsd: 7.85, vcpus: 128, ramGb: 3800 },
    { id: 'Standard_M208ms_v2', hourlyUsd: 12.2, vcpus: 208, ramGb: 5700 },
    { id: 'Standard_E96ads_v5', hourlyUsd: 6.2, vcpus: 96, ramGb: 672 }
  ];

  const IBM_REGIONS = [
    { id: 'eu-de', label: 'Frankfurt (eu-de)', mult: 1.0 },
    { id: 'eu-gb', label: 'London (eu-gb)', mult: 1.02 },
    { id: 'us-south', label: 'Dallas (us-south)', mult: 0.95 },
    { id: 'jp-tok', label: 'Tokyo (jp-tok)', mult: 1.1 }
  ];

  const IBM_PROFILES = [
    { id: 'bx2-8x32', hourlyUsd: 0.35, vcpus: 8, ramGb: 32 },
    { id: 'bx2-16x64', hourlyUsd: 0.7, vcpus: 16, ramGb: 64 },
    { id: 'bx2-32x128', hourlyUsd: 1.4, vcpus: 32, ramGb: 128 },
    { id: 'cx2-8x16', hourlyUsd: 0.28, vcpus: 8, ramGb: 16 }
  ];

  /** IBM Cloud VPC — provider bare metal / dedicated-style profiles (illustrative; confirm in catalog). */
  const IBM_PROVIDER_BARE_METAL = [
    { id: 'bx2d-32x128', hourlyUsd: 2.65, vcpus: 32, ramGb: 128 },
    { id: 'bx2d-48x192', hourlyUsd: 3.85, vcpus: 48, ramGb: 192 },
    { id: 'bx2d-64x256', hourlyUsd: 5.1, vcpus: 64, ramGb: 256 },
    { id: 'cx2d-32x64', hourlyUsd: 2.1, vcpus: 32, ramGb: 64 }
  ];

  const GCP_REGIONS = [
    { id: 'europe-west1', label: 'Belgium (europe-west1)', mult: 1.0 },
    { id: 'europe-west4', label: 'Netherlands (europe-west4)', mult: 0.98 },
    { id: 'us-central1', label: 'Iowa (us-central1)', mult: 0.94 },
    { id: 'us-east1', label: 'South Carolina (us-east1)', mult: 0.95 },
    { id: 'asia-southeast1', label: 'Singapore (asia-southeast1)', mult: 1.08 }
  ];

  const GCP_MACHINE_TYPES = [
    { id: 'n1-standard-4', hourlyUsd: 0.19, vcpus: 4, ramGb: 15 },
    { id: 'n1-standard-8', hourlyUsd: 0.38, vcpus: 8, ramGb: 30 },
    { id: 'n1-standard-16', hourlyUsd: 0.76, vcpus: 16, ramGb: 60 },
    { id: 'n2-standard-4', hourlyUsd: 0.21, vcpus: 4, ramGb: 16 },
    { id: 'n2-standard-8', hourlyUsd: 0.42, vcpus: 8, ramGb: 32 },
    { id: 'e2-standard-8', hourlyUsd: 0.27, vcpus: 8, ramGb: 32 }
  ];

  /** IBM Power Virtual Server — illustrative $/h; confirm in IBM catalog. */
  const POWERVS_REGIONS = [
    { id: 'tor', label: 'Toronto (tor)', mult: 1.0 },
    { id: 'mon', label: 'Montreal (mon)', mult: 1.0 },
    { id: 'syd', label: 'Sydney (syd)', mult: 1.12 },
    { id: 'osa', label: 'Osaka (osa)', mult: 1.08 },
    { id: 'eu-de', label: 'Frankfurt VPC (eu-de)', mult: 1.02 }
  ];

  /** Power VM profiles: processors + memoryGiB for install-config powervs platform blocks. */
  const POWER_PROFILES = [
    { id: 'powervs-0.5x32', processors: 0.5, memoryGiB: 32, hourlyUsd: 0.42 },
    { id: 'powervs-1x64', processors: 1, memoryGiB: 64, hourlyUsd: 0.78 },
    { id: 'powervs-2x128', processors: 2, memoryGiB: 128, hourlyUsd: 1.45 },
    { id: 'powervs-4x256', processors: 4, memoryGiB: 256, hourlyUsd: 2.75 },
    { id: 'powervs-8x512', processors: 8, memoryGiB: 512, hourlyUsd: 5.2 }
  ];

  const BM_LOCATIONS = [
    { id: 'eu-fra', label: 'EU — Frankfurt colo', mult: 1.0 },
    { id: 'eu-ams', label: 'EU — Amsterdam colo', mult: 0.98 },
    { id: 'us-ash', label: 'US — Ashburn colo', mult: 0.92 },
    { id: 'ap-sin', label: 'APAC — Singapore colo', mult: 1.05 }
  ];

  /** Bare metal server profiles (illustrative monthly lease per node). Used for control-plane default and compute pools. */
  const BM_HARDWARE = [
    { id: 'edge-4x32', label: '4 vCPU / 32 GiB — edge / small', monthlyUsd: 260 },
    { id: 'r640-8x64', label: '8 vCPU / 64 GiB — general purpose', monthlyUsd: 420 },
    { id: 'r650-12x96', label: '12 vCPU / 96 GiB — balanced', monthlyUsd: 590 },
    { id: 'r640-16x128', label: '16 vCPU / 128 GiB — dense', monthlyUsd: 780 },
    { id: 'r740-20x192', label: '20 vCPU / 192 GiB — memory-optimized', monthlyUsd: 1100 },
    { id: 'r740-32x256', label: '32 vCPU / 256 GiB — large', monthlyUsd: 1450 },
    { id: 'r750-48x384', label: '48 vCPU / 384 GiB — XL', monthlyUsd: 2100 },
    { id: 'storage-16x128-nvme', label: '16 vCPU / 128 GiB — storage / NVMe', monthlyUsd: 920 },
    { id: 'gpu-16x256', label: '16 vCPU / 256 GiB — GPU-ready (est.)', monthlyUsd: 2400 }
  ];

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function awsRegionMult(regionId) {
    const region = AWS_REGIONS.find((r) => r.id === regionId) || AWS_REGIONS[2];
    return region.mult;
  }

  function awsHourly(instanceId) {
    let inst = AWS_INSTANCES.find((i) => i.id === instanceId);
    if (!inst) inst = AWS_PROVIDER_BARE_METAL.find((i) => i.id === instanceId);
    if (!inst) inst = AWS_INSTANCES[1];
    return inst.hourlyUsd;
  }

  function estimateAwsFull(regionId, controlInstanceId, pools) {
    const mult = awsRegionMult(regionId);
    const cpHourly = awsHourly(controlInstanceId) * mult;
    let total = 3 * cpHourly * HOURS_PER_MONTH;
    (pools || []).forEach((p) => {
      const r = Math.max(0, p.replicas | 0);
      const h = awsHourly(p.typeId) * mult;
      total += r * h * HOURS_PER_MONTH;
    });
    return round2(total);
  }

  function azureRegionMult(regionId) {
    const region = AZURE_REGIONS.find((r) => r.id === regionId) || AZURE_REGIONS[0];
    return region.mult;
  }

  function azureHourly(sizeId) {
    let vm = AZURE_SIZES.find((s) => s.id === sizeId);
    if (!vm) vm = AZURE_PROVIDER_BARE_METAL.find((s) => s.id === sizeId);
    if (!vm) vm = AZURE_SIZES[0];
    return vm.hourlyUsd;
  }

  function estimateAzureFull(regionId, controlSizeId, pools) {
    const mult = azureRegionMult(regionId);
    const cpHourly = azureHourly(controlSizeId) * mult;
    let total = 3 * cpHourly * HOURS_PER_MONTH;
    (pools || []).forEach((p) => {
      const r = Math.max(0, p.replicas | 0);
      const h = azureHourly(p.typeId) * mult;
      total += r * h * HOURS_PER_MONTH;
    });
    return round2(total);
  }

  function ibmRegionMult(regionId) {
    const region = IBM_REGIONS.find((r) => r.id === regionId) || IBM_REGIONS[0];
    return region.mult;
  }

  function ibmHourly(profileId) {
    let prof = IBM_PROFILES.find((p) => p.id === profileId);
    if (!prof) prof = IBM_PROVIDER_BARE_METAL.find((p) => p.id === profileId);
    if (!prof) prof = IBM_PROFILES[1];
    return prof.hourlyUsd;
  }

  function estimateIbmFull(regionId, controlProfileId, pools) {
    const mult = ibmRegionMult(regionId);
    const cpHourly = ibmHourly(controlProfileId) * mult;
    let total = 3 * cpHourly * HOURS_PER_MONTH;
    (pools || []).forEach((p) => {
      const r = Math.max(0, p.replicas | 0);
      const h = ibmHourly(p.typeId) * mult;
      total += r * h * HOURS_PER_MONTH;
    });
    return round2(total);
  }

  function gcpRegionMult(regionId) {
    const region = GCP_REGIONS.find((r) => r.id === regionId) || GCP_REGIONS[0];
    return region.mult;
  }

  function gcpHourly(machineId) {
    const m = GCP_MACHINE_TYPES.find((x) => x.id === machineId) || GCP_MACHINE_TYPES[1];
    return m.hourlyUsd;
  }

  function estimateGcpFull(regionId, controlMachineId, pools) {
    const mult = gcpRegionMult(regionId);
    const cpHourly = gcpHourly(controlMachineId) * mult;
    let total = 3 * cpHourly * HOURS_PER_MONTH;
    (pools || []).forEach((p) => {
      const r = Math.max(0, p.replicas | 0);
      const h = gcpHourly(p.typeId) * mult;
      total += r * h * HOURS_PER_MONTH;
    });
    return round2(total);
  }

  function powervsRegionMult(regionId) {
    const region = POWERVS_REGIONS.find((r) => r.id === regionId) || POWERVS_REGIONS[0];
    return region.mult;
  }

  function powervsHourly(profileId) {
    const prof = POWER_PROFILES.find((p) => p.id === profileId) || POWER_PROFILES[1];
    return prof.hourlyUsd;
  }

  function estimatePowervsFull(regionId, controlProfileId, pools) {
    const mult = powervsRegionMult(regionId);
    const cpHourly = powervsHourly(controlProfileId) * mult;
    let total = 3 * cpHourly * HOURS_PER_MONTH;
    (pools || []).forEach((p) => {
      const r = Math.max(0, p.replicas | 0);
      const h = powervsHourly(p.typeId) * mult;
      total += r * h * HOURS_PER_MONTH;
    });
    return round2(total);
  }

  function estimateBareMetalFull(locationId, controlHardwareId, pools) {
    const loc = BM_LOCATIONS.find((l) => l.id === locationId) || BM_LOCATIONS[0];
    const ctrlHw = BM_HARDWARE.find((h) => h.id === controlHardwareId) || BM_HARDWARE[1];
    const mult = loc.mult;
    let total = 3 * ctrlHw.monthlyUsd * mult;
    (pools || []).forEach((p) => {
      const r = Math.max(0, p.replicas | 0);
      const hw = BM_HARDWARE.find((h) => h.id === p.typeId) || BM_HARDWARE[1];
      total += r * hw.monthlyUsd * mult;
    });
    return round2(total);
  }

  /** @deprecated use estimateAwsFull + compute pools */
  function estimateAws(regionId, instanceId, workerReplicas) {
    return estimateAwsFull(regionId, instanceId, [{ replicas: workerReplicas, typeId: instanceId }]);
  }

  function estimateAzure(regionId, sizeId, workerReplicas) {
    return estimateAzureFull(regionId, sizeId, [{ replicas: workerReplicas, typeId: sizeId }]);
  }

  function estimateIbm(regionId, profileId, workerReplicas) {
    return estimateIbmFull(regionId, profileId, [{ replicas: workerReplicas, typeId: profileId }]);
  }

  function estimateBareMetal(locationId, hardwareId, workerReplicas) {
    return estimateBareMetalFull(locationId, hardwareId, [{ replicas: workerReplicas, typeId: hardwareId }]);
  }

  function fillRegionSelect(selectEl, items, selectedId) {
    if (!selectEl) return;
    selectEl.innerHTML = items
      .map(
        (item) =>
          `<option value="${item.id}"${item.id === selectedId ? ' selected' : ''}>${item.label}</option>`
      )
      .join('');
  }

  function fillAwsInstanceSelect(selectEl, selectedId) {
    if (!selectEl) return;
    selectEl.innerHTML = AWS_INSTANCES.map(
      (item) =>
        `<option value="${item.id}"${item.id === selectedId ? ' selected' : ''}>${item.id} — ${item.vcpus} vCPU, ${item.ramGb} GiB (~$${item.hourlyUsd}/h)</option>`
    ).join('');
  }

  function fillAzureSizeSelect(selectEl, selectedId) {
    if (!selectEl) return;
    selectEl.innerHTML = AZURE_SIZES.map(
      (item) =>
        `<option value="${item.id}"${item.id === selectedId ? ' selected' : ''}>${item.id} — ${item.vcpus} vCPU, ${item.ramGb} GiB (~$${item.hourlyUsd}/h)</option>`
    ).join('');
  }

  function fillIbmProfileSelect(selectEl, selectedId) {
    if (!selectEl) return;
    selectEl.innerHTML = IBM_PROFILES.map(
      (item) =>
        `<option value="${item.id}"${item.id === selectedId ? ' selected' : ''}>${item.id} — ${item.vcpus} vCPU, ${item.ramGb} GiB (~$${item.hourlyUsd}/h)</option>`
    ).join('');
  }

  function fillBareMetalHardwareSelect(selectEl, selectedId) {
    if (!selectEl) return;
    selectEl.innerHTML = BM_HARDWARE.map(
      (item) =>
        `<option value="${item.id}"${item.id === selectedId ? ' selected' : ''}>${item.label} (~$${item.monthlyUsd}/mo/node)</option>`
    ).join('');
  }

  /** Same catalog as control plane; compute pools can use the full bare metal profile list. */
  function fillBareMetalComputePoolSelect(selectEl, selectedId) {
    fillBareMetalHardwareSelect(selectEl, selectedId);
  }

  function fillGcpMachineSelect(selectEl, selectedId) {
    if (!selectEl) return;
    selectEl.innerHTML = GCP_MACHINE_TYPES.map(
      (item) =>
        `<option value="${item.id}"${item.id === selectedId ? ' selected' : ''}>${item.id} — ${item.vcpus} vCPU, ${item.ramGb} GiB (~$${item.hourlyUsd}/h)</option>`
    ).join('');
  }

  function fillPowervsProfileSelect(selectEl, selectedId) {
    if (!selectEl) return;
    selectEl.innerHTML = POWER_PROFILES.map(
      (item) =>
        `<option value="${item.id}"${item.id === selectedId ? ' selected' : ''}>${item.id} — ${item.processors} proc, ${item.memoryGiB} GiB (~$${item.hourlyUsd}/h)</option>`
    ).join('');
  }

  function appendAwsProviderBareMetalOptgroup(selectEl, selectedId, label) {
    if (!selectEl) return;
    const og = document.createElement('optgroup');
    og.label = label || 'AWS — EC2 bare metal';
    AWS_PROVIDER_BARE_METAL.forEach((item) => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.id} — ${item.vcpus} vCPU, ${item.ramGb} GiB (~$${item.hourlyUsd}/h)`;
      if (selectedId === item.id) opt.selected = true;
      og.appendChild(opt);
    });
    selectEl.appendChild(og);
  }

  function appendAzureProviderBareMetalOptgroup(selectEl, selectedId, label) {
    if (!selectEl) return;
    const og = document.createElement('optgroup');
    og.label = label || 'Azure — large / bare-metal class';
    AZURE_PROVIDER_BARE_METAL.forEach((item) => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.id} — ${item.vcpus} vCPU, ${item.ramGb} GiB (~$${item.hourlyUsd}/h)`;
      if (selectedId === item.id) opt.selected = true;
      og.appendChild(opt);
    });
    selectEl.appendChild(og);
  }

  function appendIbmProviderBareMetalOptgroup(selectEl, selectedId, label) {
    if (!selectEl) return;
    const og = document.createElement('optgroup');
    og.label = label || 'IBM Cloud — bare metal / dedicated';
    IBM_PROVIDER_BARE_METAL.forEach((item) => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.id} — ${item.vcpus} vCPU, ${item.ramGb} GiB (~$${item.hourlyUsd}/h)`;
      if (selectedId === item.id) opt.selected = true;
      og.appendChild(opt);
    });
    selectEl.appendChild(og);
  }

  global.Pricing = {
    HOURS_PER_MONTH,
    AWS_REGIONS,
    AWS_INSTANCES,
    AWS_PROVIDER_BARE_METAL,
    AZURE_REGIONS,
    AZURE_SIZES,
    AZURE_PROVIDER_BARE_METAL,
    IBM_REGIONS,
    IBM_PROFILES,
    IBM_PROVIDER_BARE_METAL,
    GCP_REGIONS,
    GCP_MACHINE_TYPES,
    POWERVS_REGIONS,
    POWER_PROFILES,
    BM_LOCATIONS,
    BM_HARDWARE,
    estimateAwsFull,
    estimateAzureFull,
    estimateIbmFull,
    estimateGcpFull,
    estimatePowervsFull,
    estimateBareMetalFull,
    estimateAws,
    estimateAzure,
    estimateIbm,
    estimateBareMetal,
    fillRegionSelect,
    fillAwsInstanceSelect,
    fillAzureSizeSelect,
    fillIbmProfileSelect,
    fillGcpMachineSelect,
    fillPowervsProfileSelect,
    fillBareMetalHardwareSelect,
    fillBareMetalComputePoolSelect,
    appendAwsProviderBareMetalOptgroup,
    appendAzureProviderBareMetalOptgroup,
    appendIbmProviderBareMetalOptgroup
  };
})(typeof window !== 'undefined' ? window : this);
