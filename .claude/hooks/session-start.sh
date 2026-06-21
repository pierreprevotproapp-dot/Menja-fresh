#!/bin/bash
set -euo pipefail

# Only run in Claude Code remote (web) sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Kill any stale server on port 3000
pkill -f 'python3 -m http.server 3000' 2>/dev/null || true

# Start preview server from repo root so all files are accessible
cd "${CLAUDE_PROJECT_DIR:-/home/user/Menja-fresh}"
nohup python3 -m http.server 3000 > /tmp/preview.log 2>&1 &

# Wait until port is ready (max 5s)
for i in 1 2 3 4 5; do
  sleep 1
  curl -s -o /dev/null http://localhost:3000/preview-hub.html && break
done

echo "Preview server running at http://localhost:3000/preview-hub.html"
