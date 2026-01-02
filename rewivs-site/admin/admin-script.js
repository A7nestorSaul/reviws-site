// Login simulado (luego usa backend)
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Verifica credenciales (en real, fetch a server)
  localStorage.setItem('loggedIn', 'true');
  window.location.href = 'dashboard.html';
});

// En dashboard: Si no loggedIn, redirige a login
if (!localStorage.getItem('loggedIn')) window.location.href = 'login.html';