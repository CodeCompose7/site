#!/bin/bash
# Hugo 서버를 백그라운드에서 실행하는 스크립트
set -euo pipefail

cd /workspaces/courses

# go.mod의 replace가 남아 있을 경우를 대비해 항상 정리
/workspaces/courses/.devcontainer/disable-layout-dev.sh

# 이미 실행 중인 Hugo 서버가 있으면 종료
pkill -f 'hugo server' || true

# Hugo 서버를 백그라운드에서 실행
# 로컬 개발용 baseURL 오버라이드
nohup hugo server -D --bind 0.0.0.0 --port 1313 --baseURL http://localhost:1313 > /tmp/hugo-server.log 2>&1 &
# nohup hugo server --bind 0.0.0.0 --port 1313 --baseURL http://localhost:1313 > /tmp/hugo-server.log 2>&1 &

# 프로세스가 시작되었는지 확인
sleep 2
if pgrep -f 'hugo server' > /dev/null; then
    echo "✅ Hugo 서버가 시작되었습니다. http://localhost:1313 에서 확인하세요."
    echo "📋 로그는 /tmp/hugo-server.log 에서 확인할 수 있습니다."
else
    echo "❌ Hugo 서버 시작에 실패했습니다. 로그를 확인하세요: /tmp/hugo-server.log"
fi

