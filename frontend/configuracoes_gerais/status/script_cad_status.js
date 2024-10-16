document.getElementById('statusForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    const descricao = document.getElementById('description').value.trim(); // Coleta o valor do campo de descrição

    console.log('Descrição:', descricao); // Exibe o valor no console para depuração

    if (!descricao) {
        document.getElementById('responseMessage').textContent = 'Descrição é obrigatória.';
        document.getElementById('responseMessage').style.color = 'red';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ descricao }), // Envia o campo "descricao" corretamente
            
        });

        const data = await response.json();
        console.log('Resposta do servidor:', data); // Exibe a resposta completa

        const responseMessage = document.getElementById('responseMessage');

        if (response.ok) {
            responseMessage.textContent = 'Status cadastrado com sucesso!';
            responseMessage.style.color = 'green';
            document.getElementById('statusForm').reset(); // Limpa o formulário
        } else {
            responseMessage.textContent = `Erro: ${data.error}`;
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('responseMessage').textContent = 'Erro ao cadastrar o status.';
    }
});
