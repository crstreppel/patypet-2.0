// Define o tempo máximo de inatividade (10 minutos)
const INATIVIDADE_MAXIMA = 1 * 60 * 1000;
let temporizadorInatividade;

// Função para registrar o logout e redirecionar
function encerrarSessao() {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Envia a requisição de logout para o backend
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ token })
    }).finally(() => {
      localStorage.removeItem('token'); // Remove o token após logout
      alert("Sessão encerrada por inatividade.");
      window.location.href = 'http://127.0.0.1:5500/frontend/login.html'; // Redireciona para a página de login
    });
  } else {
    window.location.href = 'http://127.0.0.1:5500/frontend/login.html'; // Redireciona para o login se não houver token
  }
}

// Reseta o temporizador de inatividade sempre que o usuário interage
function resetarTemporizador() {
  clearTimeout(temporizadorInatividade);
  temporizadorInatividade = setTimeout(encerrarSessao, INATIVIDADE_MAXIMA);
}

// Monitora eventos do usuário para resetar o temporizador de inatividade
window.addEventListener('mousemove', resetarTemporizador);
window.addEventListener('keypress', resetarTemporizador);
window.addEventListener('click', resetarTemporizador);
window.addEventListener('scroll', resetarTemporizador);

// Inicializa o temporizador ao carregar a página
resetarTemporizador();
