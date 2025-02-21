#외부접속시 방화벽 설정

#node 설치
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

#node 설치
```

#node 종속성 설치
```
npm install
```

#node 실행(백그라운드드)
```
npm run dev:windows
npm run dev:mac

#종료 
windows - 
1. netstat -ano | findstr :5858 
2. taskkill /PID {pid} /F

mac - lsof -i :5858
        - kill -9 {pid}
```
- Local URL: http://localhost:5858 -내부접속 url
- External URL: http://192.168.0.4:5858 -외부접속 url

#페이지 라우팅 설정
/src/routes/pageRoutes.js 에
// 메인 페이지
페이지 이름을 '/' 로 하면 루트가 됨.

// 메인 페이지
  router.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/pages/search.html'));
  });

//다른페이지지
  router.get('/repot_view', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/repot_view.html'));
});

페이지별 추가

#귀찮으면 public 내에 때려넣어도..

#html 파일추가
/public/pages 에 html 넣기

#css 파일추가
/public/css 에 css 넣기

#js 파일추가
/public/js 에 js 넣기

#리소스 경로는
/page => /public/pages
/css => /public/css
/js => /public/js

로 되어 있으므로 css 나 js에서도 절대경로로 사용가능