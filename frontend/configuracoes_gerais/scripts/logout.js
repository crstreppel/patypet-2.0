// Variável de controle para rastrear se o logout foi registrado
let logoutRegistrado = false;

// Função para registrar o logout ao fechar ou recarregar a página
window.addEventListener('beforeunload', async (event) => {
  // Verifica se o logout já foi registrado para evitar duplicidade
  if (!logoutRegistrado) {
    const token = localStorage.getItem('token');

    if (token) {
      // Tenta registrar o logout usando fetch de forma síncrona
      try {
        await fetch('http://localhost:3000/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ token })
        });
        localStorage.removeItem('token'); // Remove o token após o logout
        logoutRegistrado = true; // Define a flag como true após o logout
      } catch (error) {
        console.error('Erro ao enviar logout:', error);
      }
    }
  }
});
