// 공유 버튼 및 팝업 메뉴 엘리먼트 선택
const shareBtn = document.getElementById('shareBtn');
const popupMenu = document.getElementById('popupMenu');

// 공유 버튼 클릭 시 팝업 메뉴 토글
shareBtn.addEventListener('click', () => {
  popupMenu.classList.toggle('active');
});

// 다른 곳을 클릭하면 팝업 메뉴 닫기
document.addEventListener('click', function(event) {
  if (!shareBtn.contains(event.target) && !popupMenu.contains(event.target)) {
    popupMenu.classList.remove('active');
  }
});

// 각 공유 링크에 대한 동작 정의
document.getElementById('copyLink').addEventListener('click', (event) => {
  event.preventDefault();
  const pageUrl = window.location.href;
  navigator.clipboard.writeText(pageUrl);
  alert('링크가 복사되었습니다!');
});

document.getElementById('shareTwitter').addEventListener('click', (event) => {
  event.preventDefault();
  const pageUrl = window.location.href;
  window.open(`https://twitter.com/intent/tweet?url=${pageUrl}`);
});

document.getElementById('shareLine').addEventListener('click', (event) => {
  event.preventDefault();
  const pageUrl = window.location.href;
  window.open(`https://social-plugins.line.me/lineit/share?url=${pageUrl}`);
});

document.getElementById('shareFacebook').addEventListener('click', (event) => {
  event.preventDefault();
  const pageUrl = window.location.href;
  window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
});