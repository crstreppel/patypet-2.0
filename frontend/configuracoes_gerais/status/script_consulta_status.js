// Função para buscar e listar os status
async function fetchStatuses() {
    const response = await fetch('http://localhost:3000/status');
    const statuses = await response.json();
  
    const tableBody = document.querySelector('#statusTable tbody');
    tableBody.innerHTML = '';
  
    statuses.forEach(status => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${status.id}</td>
        <td>${status.descricao}</td>
        <td>
          <button class="edit" onclick="openEditModal(${status.id}, '${status.descricao}')">Editar</button>
          <button class="delete" onclick="deleteStatus(${status.id})">Excluir</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Função para abrir o modal de edição
  function openEditModal(id, descricao) {
    document.getElementById('editId').value = id;
    document.getElementById('editDescricao').value = descricao;
    document.getElementById('editModal').style.display = 'block';
  }
  
  // Função para fechar o modal
  function closeModal() {
    document.getElementById('editModal').style.display = 'none';
  }
  
  document.querySelector('.close').addEventListener('click', closeModal);
  
  // Função para editar o status
  document.getElementById('editStatusForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const id = document.getElementById('editId').value;
    const descricao = document.getElementById('editDescricao').value;
    const password = document.getElementById('password').value;
  
    if (!password) {
      alert('Senha é obrigatória!');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Status atualizado com sucesso!');
        closeModal();
        fetchStatuses(); // Recarregar a lista de status
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      console.error('Erro ao editar status:', error);
    }
  });
  
  // Função para excluir o status
  async function deleteStatus(id) {
    const password = prompt('Digite sua senha para confirmar a exclusão:');
  
    if (!password) {
      alert('A senha é necessária para excluir!');
      return;
    }
  
    const confirmDelete = confirm('Você tem certeza que deseja excluir este status?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/status/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          alert('Status excluído com sucesso!');
          fetchStatuses(); // Recarregar a lista de status
        } else {
          alert(`Erro: ${data.error}`);
        }
      } catch (error) {
        console.error('Erro ao excluir status:', error);
      }
    }
  }
  
  // Inicializar a listagem dos status ao carregar a página
  document.addEventListener('DOMContentLoaded', fetchStatuses);
  