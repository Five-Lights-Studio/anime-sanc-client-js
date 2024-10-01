document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", handleLogin);

  fetchPosts();
});

async function handleLogin(event) {
  event.preventDefault();
  console.log("handleLogin 호출됨"); // 로그 추가
  const username = document.getElementById("usernameOrEmail").value;
  const password = document.getElementById("password").value;

  try {
    console.log("로그인 요청 준비됨"); // 로그 추가
    const response = await fetch('http://localhost:9000/api/members/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail: username, password })
    });
    
    
    if (response.ok) {
      const responseData = await response.json();  // 서버 응답에서 memberId를 추출
      const memberId = responseData.memberId || responseData.id;  // 서버 응답에서 적절한 필드 확인
  // 서버 응답에서 받은 memberId
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("memberId", memberId);  // memberId 저장
      console.log('로그인 성공, memberId:', memberId);  // 로그 추가
      login(); // 로그인 성공 시 login() 함수 호출
    } else {
      const errorData = await response.json();
      console.log(`로그인 실패: ${errorData.message}`); // 로그 추가
      alert(`로그인 실패: ${errorData.message}`);
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    alert('로그인 중 오류가 발생했습니다.');
  }
}

// 로그인 함수
function login() {
  console.log("로그인 함수 호출됨");
  localStorage.setItem("isLoggedIn", "true");
  
  checkLoginStatus();
  console.log("로그인 상태 확인 완료");
  // 페이지 리디렉션 대신 버튼을 동적으로 변경
  showLogoutButton();
}

async function fetchPosts() {
  try {
    const response = await fetch("http://localhost:8080/api/posts");
    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayPosts(posts) {
  const postsList = document.getElementById("posts-list");
  postsList.innerHTML = "";
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
    postsList.appendChild(postElement);
  });
}
