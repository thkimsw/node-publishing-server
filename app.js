const express = require('express');
const app = express();
const port = 5858;

// 미들웨어 설정
app.use(express.json());
app.use('/static', express.static('public', { etag: false, maxAge: 0 }));
app.use('/pages', express.static('public/pages', { etag: false, maxAge: 0 }));
app.use('/css', express.static('public/css', { etag: false, maxAge: 0 }));
app.use('/js', express.static('public/js', { etag: false, maxAge: 0 }));
app.use('/images', express.static('public/images', { etag: false, maxAge: 0 }));

// // 개발 환경 설정
// if (process.env.NODE_ENV === 'development') {
//   const livereload = require('livereload');
//   const connectLivereload = require('connect-livereload');
  
//   // LiveReload 서버 생성
//   const liveReloadServer = livereload.createServer({
//     exts: ['html', 'css', 'js'],
//     delay: 0,
//     port: 35729  // 기본 LiveReload 포트
//   });
  
//   // LiveReload 미들웨어를 가장 먼저 적용
//   app.use(connectLivereload({
//     port: 35729
//   }));
  
//   liveReloadServer.watch(__dirname + '/public');

//   // 서버 시작 시 자동 새로고침
//   liveReloadServer.server.once("connection", () => {
//     liveReloadServer.refresh("/");
//   });
// }

// 라우트 파일 임포트
const pageRoutes = require('./src/routes/pageRoutes');

// 라우트 바인딩
app.use('/', pageRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('안녕하세요! Node.js 서버입니다.');
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('서버 에러가 발생했습니다!');
});

// 서버 시작
app.listen(port, () => {
  const ip = require('ip');
  const localUrl = `http://localhost:${port}`;
  const externalUrl = `http://${ip.address()}:${port}`;
  
  console.log('서버가 시작되었습니다:');
  console.log(`- Local URL: ${localUrl}`);
  console.log(`- External URL: ${externalUrl}`);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('개발 모드로 실행 중입니다.');
  }
}); 