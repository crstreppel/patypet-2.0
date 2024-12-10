// Função para cadastrar uma nova espécie
document.getElementById('formEspecie').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Captura apenas a descrição da espécie
  const descricao = document.getElementById('descricao').value;

  try {
    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Autenticação
      },
      body: JSON.stringify({ descricao }) // Envia apenas a descrição
    });

    const data = await response.json();
    const responseMessage = document.getElementById('responseMessage');

    if (response.ok) {
      responseMessage.textContent = 'Espécie cadastrada com sucesso!';
      responseMessage.style.color = 'green';
      document.getElementById('formEspecie').reset(); // Limpa o formulário
    } else {
      responseMessage.textContent = `Erro: ${data.error}`;
      responseMessage.style.color = 'red';
    }
  } catch (error) {
    console.error('Erro ao cadastrar espécie:', error);
    document.getElementById('responseMessage').textContent = 'Erro ao cadastrar espécie.';
  }
});
