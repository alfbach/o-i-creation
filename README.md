# OpenShift Install-Config Generator (o-i-creator)

Web UI to draft **`install-config.yaml`** for [Red Hat OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift) installs: pick infrastructure, fill cluster and platform fields, then generate or download YAML. UI strings in **English, German, French, and Spanish**.

## Features

- **Infrastructure**: Bare metal, AWS, Azure, IBM Cloud, Google Cloud, IBM Power Virtual Server (Power VS), plus pricing hints where applicable.
- **General**: cluster name, base domain, pull secret.
- **Platform dialogs**: region, credentials (where relevant), default instance/machine profiles.
- **Network & compute**: optional CIDRs, machine pools with replicas and infra types.
- **Export**: generate YAML, copy to clipboard, or save as a file.
- **Test connection** (where supported): validates cloud/API inputs via `/api/test-connection` (implemented in Go for standalone builds; PHP mirror for `php -S`).

## Requirements

| Mode | Needs |
|------|--------|
| **PHP (development)** | PHP **7.4+** (8.x recommended) |
| **Standalone binary** | Nothing at runtime; **Go 1.22+** and **PHP CLI** only when *building* |

## Quick start (PHP)

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
php -S localhost:8080
```

Open **http://localhost:8080/** in a browser.

For Apache/Nginx, point the document root at this directory (or mount under a subpath); asset URLs use `bootstrap.php`’s `oic_url()` so paths work in subfolders.

## Pull secret

Get JSON from [OpenShift Cluster Manager — pull secret](https://console.redhat.com/openshift/install/pull-secret) and paste it into the form.

## Standalone executable (no PHP at runtime)

The Go binary embeds a static export of the UI (`static/`, produced by `make static`) and serves it with a small HTTP server, including `/api/test-connection`.

### Build prerequisites

- [Go](https://go.dev/dl/) 1.22+ (see `go.mod`)
- **PHP CLI** (only for `scripts/export-static.php` during `make static`)

### Build (macOS / Linux)

```bash
make dist-all          # Linux + Windows → dist/
make dist-darwin       # macOS Apple Silicon → dist/o-i-creator-darwin-arm64
make dist-darwin-amd64 # macOS Intel → dist/o-i-creator-darwin-amd64
```

Artifacts land under **`dist/`** (ignored by Git; build locally or in CI).

### Build (Windows)

```bat
scripts\build-all.bat
```

### Run

Default port **8080**:

```bash
./dist/o-i-creator-linux-amd64
```

```bat
dist\o-i-creator-windows-amd64.exe
```

Custom port (example **3000**):

```bash
PORT=3000 ./dist/o-i-creator-linux-amd64
```

```bat
set PORT=3000
dist\o-i-creator-windows-amd64.exe
```

**Note:** Binaries ship a **frozen** copy of the UI. After changing `views/` or `assets/`, rebuild. For day-to-day work, `php -S` is enough.

## Project layout

| Path | Role |
|------|------|
| `index.php`, `bootstrap.php` | PHP entry and URL helpers |
| `views/main.php` | Main HTML UI |
| `assets/` | CSS, JS (source of truth for the UI) |
| `api/test-connection.php` | Test-connection handler for PHP dev server |
| `main.go`, `test_connection.go` | Standalone server + test-connection API |
| `scripts/export-static.php` | Generates `static/index.html` from PHP view |
| `Makefile` | `static`, cross-compiled `dist/*` targets |

## Development

```bash
# sanity checks (examples)
php -l api/test-connection.php
go build .
node --check assets/js/app.js
```

## Push this repo to GitHub

1. Create an empty repository on GitHub (**no** README/license/gitignore if you already have them locally).
2. In the project directory:

```bash
git init -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Use SSH if you prefer: `git@github.com:YOUR_USERNAME/YOUR_REPO.git`.

## License

This project is licensed under the **GNU General Public License v2.0** — see [LICENSE](LICENSE).

SPDX-License-Identifier: `GPL-2.0-only`
