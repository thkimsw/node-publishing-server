# Introduce
![how to use](./introduce.gif)

# 서버 설정 가이드
#내부설정
### 방화벽 설정
외부접속시 방화벽 설정 필요

### 1. ngrok 설치
####windows
ngrok을 설치하려면 [ngrok 다운로드 페이지](https://ngrok.com/download)에서 운영 체제에 맞는 버전을 다운로드하고 설치합니다.

####mac
```bash
brew install ngrok
```
### 2. ngok 가입큰 및 토큰 발급

### 3. ngrok 토근 설정
ngrok authtoken <토근>

### 4. ngrok 실행
서버가 실행 중인 상태에서 다음 명령어를 사용하여 ngrok을 실행합니다:
```bash
ngrok http 5858
```
- 위 명령어는 로컬 서버의 5858 포트를 외부에 노출합니다.

###5. **URL 확인**: ngrok 실행 후, 터미널에 표시된 "Forwarding" URL을 확인합니다. 예를 들어:
   ```
   Forwarding                    https://f093-59-26-221-71.ngrok-free.app -> http://localhost:5858
   ```

### 6. **웹 브라우저에서 접근**: 확인한 URL을 웹 브라우저에 입력하여 페이지에 접근합니다.
   - 예시 URL: `https://f093-59-26-221-71.ngrok-free.app`

### 7. ngrok 종료
ngrok을 종료하려면 터미널에서 `Ctrl + C`를 눌러 프로세스를 중지합니다.


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
chmod +x ./node_modules/.bin/nodemon
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
