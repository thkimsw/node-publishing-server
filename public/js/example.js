window.onload = function() {
  // 페이지 로드 시 실행되는 함수
  console.log('페이지가 로드되었습니다.');
  
  // h2 요소 클릭 이벤트
  document.querySelector('h2').addEventListener('click', function() {
      alert('예제 페이지에 오신 것을 환영합니다!');
  });
};