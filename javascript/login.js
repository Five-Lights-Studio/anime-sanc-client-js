document.querySelector('.login-button').addEventListener('click', async () => {
  const username = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loginRequest = {
      username: username,
      password: password
  };

  try {
      const response = await fetch('/api/members/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginRequest)
      });

      if (response.ok) {
          // 로그인 성공 시
          window.location.href = '/';  // 홈 페이지로 리다이렉트
      } else {
          // 로그인 실패 시
          alert('Invalid username or password');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
  }
});

fetch('http://localhost:9000/api/members/login', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      username: 'your-username',
      password: 'your-password'
  })
})
.then(response => {
  if (response.ok) {
      return response.json();
  } else {
      throw new Error('Login failed');
  }
})
.then(data => {
  console.log('Login successful:', data);
  // Redirect or handle successful login
})
.catch(error => {
  console.error('Error:', error);
});
