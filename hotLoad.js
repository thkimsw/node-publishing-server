window.onload = function() {
  // 페이지 로드 시 로그 출력
  console.log('페이지가 로드되었습니다.');
  
  // h2 요소 클릭 이벤트는 선택적으로 등록
  const h2Element = document.querySelector('h2');
  if (h2Element) {
    h2Element.addEventListener('click', function() {
      alert('예제 페이지에 오신 것을 환영합니다!');
    });
  }

  // 현재 프로토콜에 맞는 WebSocket 프로토콜 설정 (http: -> ws:, https: -> wss:)
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const ws = new WebSocket(`${wsProtocol}//${window.location.host}`);

  // WebSocket 연결 성공 시
  ws.onopen = () => {
      console.log('WebSocket 연결됨');
  };

  let isIntentionalClosure = false;

  // 서버로부터 메시지 수신 시
  ws.onmessage = (event) => {
      if (event.data === 'reload') {
          console.log('서버로부터 새로고침 신호를 받았습니다.');
          window.location.reload();
      } else if (event.data === 'shutdown') {
          isIntentionalClosure = true;
          console.log('서버가 종료됩니다.');
      }
  };

  // 연결 종료 시 (의도하지 않은 종료일 경우 재연결을 위해 새로고침)
  ws.onclose = () => {
      console.log('WebSocket 연결이 종료되었습니다.');
      if (!isIntentionalClosure) {
          setTimeout(() => {
              window.location.reload();
          }, 1000);
      }
  };

  // 에러 발생 시 로그 출력
  ws.onerror = (error) => {
      console.error('WebSocket 에러:', error);
  };
};
