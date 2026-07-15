#!/usr/bin/env bash
set -euo pipefail

REPO="Muneerali199/RakshakAI"
NPM_PKG="rakshakai"
PYPI_PKG="rakshakai"
VERSION="3.0.0"

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

echo ""
echo -e "  ${CYAN}⚡ RakshakAI Installer${NC}"
echo -e "  ${BOLD}AI-Powered Security Scanner & Chat${NC}"
echo ""

# Detect OS
OS="$(uname -s)"
ARCH="$(uname -m)"

# Check for existing commands
HAS_NPM=0; command -v npm >/dev/null 2>&1 && HAS_NPM=1
HAS_BUN=0; command -v bun >/dev/null 2>&1 && HAS_BUN=1
HAS_BREW=0; command -v brew >/dev/null 2>&1 && HAS_BREW=1
HAS_PIP3=0; command -v pip3 >/dev/null 2>&1 && HAS_PIP3=1
HAS_CURL=0; command -v curl >/dev/null 2>&1 && HAS_CURL=1

# Auto-select best method
if [ "$HAS_BUN" -eq 1 ]; then
  RECOMMENDED="bun"
elif [ "$HAS_NPM" -eq 1 ]; then
  RECOMMENDED="npm"
elif [ "$HAS_BREW" -eq 1 ] && [ "$OS" = "Darwin" ]; then
  RECOMMENDED="brew"
elif [ "$HAS_PIP3" -eq 1 ]; then
  RECOMMENDED="pip"
else
  RECOMMENDED="curl"
fi

# Interactive selection if not piped
if [ -t 0 ]; then
  echo -e "  ${BOLD}Select install method:${NC}"
  echo "    ┌─────────────────────────────────────────────┐"
  [ "$HAS_BUN" -eq 1 ]  && echo -e "    │ ${CYAN}1)${NC} bun      ${CYAN}(recommended)${NC}               │" || echo -e "    │ ${YELLOW}1)${NC} bun      ${YELLOW}(not available)${NC}          │"
  [ "$HAS_NPM" -eq 1 ]  && echo -e "    │ ${CYAN}2)${NC} npm      ${CYAN}(recommended)${NC}               │" || echo -e "    │ ${YELLOW}2)${NC} npm      ${YELLOW}(not available)${NC}          │"
  [ "$HAS_BREW" -eq 1 ] && echo -e "    │ ${CYAN}3)${NC} brew     ${CYAN}(macOS)${NC}                     │" || echo -e "    │ ${YELLOW}3)${NC} brew     ${YELLOW}(not available)${NC}          │"
  [ "$HAS_PIP3" -eq 1 ] && echo -e "    │ ${CYAN}4)${NC} pip      ${CYAN}(Python full)${NC}              │" || echo -e "    │ ${YELLOW}4)${NC} pip      ${YELLOW}(not available)${NC}          │"
  echo -e "    │ ${CYAN}5)${NC} curl     (standalone binary)         │"
  echo -e "    │ ${CYAN}a)${NC} All methods                           │"
  echo "    └─────────────────────────────────────────────┘"
  echo ""
  echo -e "  ${BOLD}Recommended:${NC} ${CYAN}$RECOMMENDED${NC}"
  echo -n "  Choose [1-5/a]: "
  read -r choice
else
  choice="$RECOMMENDED"
fi

install_npm() {
  echo ""
  echo -e "  ${CYAN}▶ Installing via npm...${NC}"
  npm install -g "$NPM_PKG" --force
  echo ""
  echo -e "  ${GREEN}✓ Installed rakshakai${NC}"
  echo -e "  ${BOLD}Try:${NC} rakshak scan app.py"
  echo -e "  ${BOLD}Chat:${NC} rakshak chat  (requires Python deps)"
  echo -e "  ${BOLD}Web:${NC}  rakshak server"
}

install_bun() {
  echo ""
  echo -e "  ${CYAN}▶ Installing via bun...${NC}"
  bun add -g "$NPM_PKG"
  echo ""
  echo -e "  ${GREEN}✓ Installed rakshakai${NC}"
}

install_brew() {
  echo ""
  echo -e "  ${CYAN}▶ Installing via brew...${NC}"
  if [ "$OS" = "Darwin" ]; then
    brew tap "$REPO" 2>/dev/null || true
    brew install rakshakai 2>/dev/null || {
      echo -e "  ${YELLOW}⚠ Brew tap not available, falling back to npm...${NC}"
      install_npm
    }
  else
    echo -e "  ${YELLOW}⚠ Brew is macOS-only. Falling back to npm...${NC}"
    install_npm
  fi
}

install_pip() {
  echo ""
  echo -e "  ${CYAN}▶ Installing via pip (full Python CLI)...${NC}"
  pip3 install --upgrade pip 2>/dev/null || true
  pip3 install rich openai pygments watchdog GitPython httpx requests
  pip3 install -e "$(dirname "$0")/.." 2>/dev/null || pip3 install "$PYPI_PKG" 2>/dev/null || {
    echo -e "  ${YELLOW}⚠ PyPI package not published yet, installing from source...${NC}"
    echo -e "  ${YELLOW}  Clone: git clone https://github.com/$REPO${NC}"
    echo -e "  ${YELLOW}  Then:  cd RakshakAI && pip3 install -e .${NC}"
  }
  echo ""
  echo -e "  ${GREEN}✓ Python CLI installed${NC}"
  echo -e "  ${BOLD}Chat:${NC} python3 -m v2.cli.main"
  echo -e "  ${BOLD}Scan:${NC} python3 -m v2.cli.main scan app.py --json"
}

install_curl() {
  echo ""
  echo -e "  ${CYAN}▶ Installing standalone...${NC}"
  
  # Determine download URL
  case "$OS-$ARCH" in
    Darwin-arm64)  BIN="rakshak-darwin-arm64" ;;
    Darwin-x86_64) BIN="rakshak-darwin-x64" ;;
    Linux-arm64)   BIN="rakshak-linux-arm64" ;;
    Linux-x86_64)  BIN="rakshak-linux-x64" ;;
    *) echo -e "  ${RED}✖ Unsupported platform: $OS-$ARCH${NC}"; exit 1 ;;
  esac

  URL="https://github.com/$REPO/releases/download/v$VERSION/$BIN"
  INSTALL_DIR="/usr/local/bin"
  
  if [ ! -w "$INSTALL_DIR" ]; then
    INSTALL_DIR="$HOME/.local/bin"
    mkdir -p "$INSTALL_DIR"
  fi

  echo -e "  Downloading ${CYAN}$BIN${NC}..."
  if [ "$HAS_CURL" -eq 1 ]; then
    curl -fsSL "$URL" -o "$INSTALL_DIR/rakshak"
  else
    wget -q "$URL" -O "$INSTALL_DIR/rakshak"
  fi
  
  chmod +x "$INSTALL_DIR/rakshak"
  echo ""
  echo -e "  ${GREEN}✓ Installed to $INSTALL_DIR/rakshak${NC}"
  echo -e "  ${BOLD}Try:${NC} rakshak scan app.py"
}

# Parse choice
case "$choice" in
  1|bun)
    install_bun
    [ "$HAS_PIP3" -eq 1 ] && install_pip
    ;;
  2|npm)
    install_npm
    [ "$HAS_PIP3" -eq 1 ] && install_pip
    ;;
  3|brew)
    install_brew
    [ "$HAS_PIP3" -eq 1 ] && install_pip
    ;;
  4|pip)
    install_pip
    install_npm
    ;;
  5|curl)
    install_curl
    [ "$HAS_PIP3" -eq 1 ] && install_pip
    ;;
  a|A|all)
    [ "$HAS_BUN" -eq 1 ]  && install_bun
    [ "$HAS_NPM" -eq 1 ]  && install_npm
    [ "$HAS_BREW" -eq 1 ] && install_brew
    [ "$HAS_PIP3" -eq 1 ] && install_pip
    install_curl 2>/dev/null || true
    ;;
  *)
    echo -e "  ${RED}✖ Invalid choice${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "  ${GREEN}${BOLD}✓ RakshakAI installed!${NC}"
echo ""
echo -e "  ${BOLD}Quick Start:${NC}"
echo -e "    ${CYAN}rakshak scan app.py${NC}        Scan a file"
echo -e "    ${CYAN}rakshak scan src/ --json${NC}   Scan directory as JSON"
echo -e "    ${CYAN}rakshak chat${NC}               Launch AI chat (requires Python)"
echo -e "    ${CYAN}rakshak server${NC}             Web UI"
echo -e "    ${CYAN}rakshak models${NC}             Browse 65+ AI models"
echo ""
echo -e "  ${BOLD}Need Python CLI?${NC}  ${CYAN}rakshak install${NC}"
echo -e "  ${BOLD}See docs:${NC}         ${CYAN}https://github.com/$REPO${NC}"
echo ""
