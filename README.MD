# Introduce
![how to use](./introduce.gif)

# 서버 설정 가이드

## 방화벽 설정
외부접속시 방화벽 설정 필요

## Node.js 설치 및 실행

### 1. NVM을 통한 Node 설치
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

### 2. 종속성 설치
```bash
npm install
```

### 3. 서버 실행
```bash
# Windows
npm run dev:windows

# Mac
npm run dev:mac
```

### 4. 서버 종료 방법
#### Windows
```bash
# 포트 사용 프로세스 확인
netstat -ano | findstr :5858 

# 프로세스 종료
taskkill /PID {pid} /F
```

#### Mac
```bash
# 포트 사용 프로세스 확인
lsof -i :5858

# 프로세스 종료
kill -9 {pid}
```

## 접속 URL
- **내부접속**: `http://localhost:5858`
- **외부접속**: `http://192.168.0.4:5858`

## 페이지 라우팅 설정
라우팅 설정은 `/src/routes/pageRoutes.js`에서 관리

### 라우팅 예시
```javascript
// 메인 페이지 ('/'가 루트 경로)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/search.html'));
});

// 다른 페이지 예시
router.get('/repot_view', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/repot_view.html'));
});
```

## 파일 구조
### 정적 파일 위치
- **HTML**: `/public/pages`
- **CSS**: `/public/css`
- **JavaScript**: `/public/js`

### 리소스 접근 경로
절대경로 사용 가능:
- `/page` → `/public/pages`
- `/css` → `/public/css`
- `/js` → `/public/js`
