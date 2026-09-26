#!/usr/bin/env bash
# Build the portfolio and publish it to GitHub Pages.
#
# Repo layout (ekupekuAI/ekupekuAI.github.io):
#   source  branch  -> this Vite project (edit here)
#   main    branch  -> built static site (what GitHub Pages serves)
#
# Usage, from the project folder:   bash deploy.sh
set -e
REPO="https://github.com/ekupekuAI/ekupekuAI.github.io.git"
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$(mktemp -d)"

echo ">>> building"
cd "$HERE" && npm run build

echo ">>> cloning main"
git clone -q --branch main --single-branch "$REPO" "$OUT/site"
cd "$OUT/site"
git rm -rqf . >/dev/null 2>&1 || true
cp -r "$HERE/dist/." .
touch .nojekyll                       # serve files/folders starting with "_" or "."
git add -A
if git diff --cached --quiet; then
  echo "nothing changed"; exit 0
fi
git commit -qm "deploy: $(date -u +%Y-%m-%dT%H:%MZ)"
git push origin main
echo ">>> live at https://ekupekuai.github.io (Pages can take ~1 min to update)"
