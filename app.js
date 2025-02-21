const express = require('express');
const WebSocket = require('ws');
const app = express();
const path = require('path');
const port = 5858;

// 정적 파일 제공 설정 (public 폴더)
app.use(express.static(path.join(__dirname, 'public')));

// 추가 라우트 파일 임포트 (예: src/routes/pageRoutes.js)
const pageRoutes = require('./src/routes/pageRoutes');
app.use('/', pageRoutes);

// HTML 응답 인터셉트를 위한 미들웨어 추가
app.use((req, res, next) => {
  // 원래의 send 함수를 저장
  const originalSend = res.send;

  // send 함수를 재정의
  res.send = function(body) {
    // HTML 응답인 경우에만 처리
    if (typeof body === 'string' && body.includes('</html>')) {
      // </body> 태그 앞에 hotLoad.js 스크립트 삽입
      body = body.replace(
        '</body>',
        '<script src="/hotLoad.js"></script></body>'
      );
    }
    // 원래의 send 함수 호출
    return originalSend.call(this, body);
  };

  next();
});

// 정적 파일 제공 설정 (hotLoad.js 파일도 제공)
app.use('/hotLoad.js', express.static(path.join(__dirname, 'hotLoad.js')));

// 기본 라우트
app.get('/', (req, res) => {
  res.send('안녕하세요! Node.js 서버입니다.');
});

// 서버 생성 및 실행
const server = app.listen(port, () => {
  const ip = require('ip');
  const localUrl = `http://localhost:${port}`;
  const externalUrl = `http://${ip.address()}:${port}`;
  
  console.log('서버가 시작되었습니다:');
  console.log(`- Local URL: ${localUrl}`);
  console.log(`- External URL: ${externalUrl}`);
});

// WebSocket 서버 설정
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  console.log('클라이언트가 연결되었습니다');
});

// 파일 변경 감지 (public 폴더)
const fs = require('fs');
fs.watch('public', { recursive: true }, (eventType, filename) => {
  console.log(`${filename} 파일이 변경되었습니다. 새로고침...`);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('reload');
    }
  });
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('서버 에러가 발생했습니다!');
});

// 종료 시그널 핸들링 (예: Ctrl+C)
process.on('SIGINT', () => {
  console.log('서버를 종료합니다...');
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('shutdown');
    }
  });
  
  wss.close(() => {
    server.close(() => {
      console.log('서버가 정상적으로 종료되었습니다.');
      process.exit(0);
    });
  });
});
