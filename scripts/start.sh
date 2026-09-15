#!/usr/bin/env bash
# Start o-i-creator locally (PHP dev server by default).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PORT="${PORT:-8080}"
MODE="php"
OPEN_BROWSER=0

usage() {
  cat <<'EOF'
Usage: scripts/start.sh [options]

Start the OpenShift Install-Config Generator on your machine.

Options:
  --go, --binary   Run the Go standalone server (embeds static UI)
  --open           Open the app in your default browser (macOS/Linux)
  -h, --help       Show this help

Environment:
  PORT             Listen port (default: 8080)

Examples:
  scripts/start.sh
  PORT=3000 scripts/start.sh
  scripts/start.sh --go
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --go|--binary)
      MODE="go"
      shift
      ;;
    --open)
      OPEN_BROWSER=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

open_browser() {
  if [[ "$OPEN_BROWSER" -ne 1 ]]; then
    return
  fi
  local url="http://localhost:${PORT}"
  if command -v open >/dev/null 2>&1; then
    open "$url"
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$url"
  else
    echo "Open $url in your browser."
  fi
}

start_php() {
  if ! command -v php >/dev/null 2>&1; then
    echo "Error: PHP is not installed. Install PHP 7.4+ or use: scripts/start.sh --go" >&2
    exit 1
  fi

  echo "Starting PHP dev server at http://localhost:${PORT}"
  echo "Press Ctrl+C to stop."
  open_browser
  exec php -S "localhost:${PORT}" -t "$ROOT"
}

dist_binary() {
  local os arch
  os="$(uname -s)"
  arch="$(uname -m)"

  case "$os" in
    Darwin)
      case "$arch" in
        arm64) echo "dist/o-i-creator-darwin-arm64" ;;
        x86_64) echo "dist/o-i-creator-darwin-amd64" ;;
        *) return 1 ;;
      esac
      ;;
    Linux)
      case "$arch" in
        x86_64|amd64) echo "dist/o-i-creator-linux-amd64" ;;
        *) return 1 ;;
      esac
      ;;
    *)
      return 1
      ;;
  esac
}

start_go() {
  local bin
  bin="$(dist_binary || true)"

  if [[ -n "$bin" && -x "$bin" ]]; then
    echo "Starting Go binary ($bin) at http://127.0.0.1:${PORT}"
    echo "Press Ctrl+C to stop."
    open_browser
    exec env PORT="$PORT" "$bin"
  fi

  if ! command -v go >/dev/null 2>&1; then
    echo "Error: Go is not installed and no prebuilt binary was found in dist/." >&2
    echo "Install Go 1.22+ or build one with: make dist-darwin" >&2
    exit 1
  fi

  if [[ ! -f static/index.html ]]; then
    echo "Generating static export (requires PHP CLI)..."
    if ! command -v php >/dev/null 2>&1; then
      echo "Error: PHP CLI is required to run 'make static'." >&2
      exit 1
    fi
    make static
  fi

  echo "Starting Go server at http://127.0.0.1:${PORT}"
  echo "Press Ctrl+C to stop."
  open_browser
  exec env PORT="$PORT" go run .
}

case "$MODE" in
  php) start_php ;;
  go) start_go ;;
esac
