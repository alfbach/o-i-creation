#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
make dist-all
ls -la dist/
