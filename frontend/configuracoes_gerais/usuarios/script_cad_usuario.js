// script_cad_usuario.js
document.getElementById('cadastroUsuarioForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Exibir no console para depuração
    console.log('Usuário:', username);
    console.log('Senha:', password);
  
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
      if (response.ok) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerText = 'Usuário cadastrado com sucesso!';
      } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerText = data.error || 'Erro ao cadastrar o usuário.';
      }
    } catch (error) {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerText = 'Erro ao cadastrar o usuário.';
    }
  });
  