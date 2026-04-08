# Build standalone executables (Go embeds static/). Requires: go 1.22+, php CLI.
.PHONY: static clean dist-linux dist-windows dist-darwin dist-darwin-amd64 dist-all

static:
	@rm -rf static
	@mkdir -p static/assets
	@cp -r assets/* static/assets/
	@php scripts/export-static.php

clean:
	rm -rf static dist/o-i-creator-linux-amd64 dist/o-i-creator-windows-amd64.exe \
		dist/o-i-creator-darwin-arm64 dist/o-i-creator-darwin-amd64

dist-linux: static
	@mkdir -p dist
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o dist/o-i-creator-linux-amd64 .

dist-windows: static
	@mkdir -p dist
	GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o dist/o-i-creator-windows-amd64.exe .

# macOS Apple Silicon (arm64)
dist-darwin: static
	@mkdir -p dist
	GOOS=darwin GOARCH=arm64 CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o dist/o-i-creator-darwin-arm64 .

# macOS Intel (amd64)
dist-darwin-amd64: static
	@mkdir -p dist
	GOOS=darwin GOARCH=amd64 CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o dist/o-i-creator-darwin-amd64 .

dist-all: dist-linux dist-windows
	@echo "Artifacts in dist/"
