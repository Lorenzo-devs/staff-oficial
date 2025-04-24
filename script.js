// Array para armazenar os membros e seus registros
let membros = [];
let registrosHoras = [];

// Carregar dados salvos ao iniciar
function carregarDados() {
    try {
        const membrosSalvos = localStorage.getItem('membros');
        const registrosSalvos = localStorage.getItem('registrosHoras');
        
        if (membrosSalvos) {
            membros = JSON.parse(membrosSalvos);
        }
        
        if (registrosSalvos) {
            registrosHoras = JSON.parse(registrosSalvos);
        }
        
        atualizarTabelaMembros();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar dados salvos. Os dados serão reiniciados.');
        localStorage.clear();
    }
}

// Salvar dados no localStorage
function salvarDados() {
    try {
        localStorage.setItem('membros', JSON.stringify(membros));
        localStorage.setItem('registrosHoras', JSON.stringify(registrosHoras));
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        alert('Erro ao salvar dados. Verifique se há espaço suficiente no navegador.');
    }
}

// Funções para mostrar/esconder formulários
function mostrarFormulario() {
    document.getElementById('formulario-membro').style.display = 'block';
    document.getElementById('nome').focus();
}

function esconderFormulario() {
    document.getElementById('formulario-membro').style.display = 'none';
    document.getElementById('form-membro').reset();
}

function mostrarFormularioHoras() {
    document.getElementById('registro-horas').style.display = 'block';
    document.getElementById('data').focus();
}

function esconderFormularioHoras() {
    document.getElementById('registro-horas').style.display = 'none';
    document.getElementById('form-horas').reset();
}

// Função para adicionar novo membro
document.getElementById('form-membro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const cargo = document.getElementById('cargo').value.trim();
    const discord = document.getElementById('discord').value.trim();
    
    if (!nome || !cargo || !discord) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const novoMembro = {
        id: Date.now(),
        nome: nome,
        cargo: cargo,
        discord: discord
    };
    
    membros.push(novoMembro);
    salvarDados();
    atualizarTabelaMembros();
    esconderFormulario();
});

// Função para atualizar a tabela de membros
function atualizarTabelaMembros() {
    const tbody = document.getElementById('lista-membros');
    tbody.innerHTML = '';
    
    if (membros.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="3" style="text-align: center;">Nenhum membro cadastrado</td>';
        tbody.appendChild(tr);
        return;
    }
    
    membros.forEach(membro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${membro.nome}</td>
            <td>${membro.cargo}</td>
            <td class="acoes">
                <a href="#" onclick="registrarHoras(${membro.id})">Registrar Horas</a>
                <a href="#" onclick="editarMembro(${membro.id})">Editar</a>
                <a href="#" onclick="verRegistros(${membro.id})">Ver Registros</a>
                <a href="#" onclick="excluirMembro(${membro.id})" style="color: #e74c3c;">Excluir</a>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para registrar horas
function registrarHoras(membroId) {
    const membro = membros.find(m => m.id === membroId);
    if (membro) {
        document.getElementById('registro-horas').dataset.membroId = membroId;
        document.getElementById('data').value = new Date().toISOString().split('T')[0];
        mostrarFormularioHoras();
    }
}

// Função para editar membro
function editarMembro(membroId) {
    const membro = membros.find(m => m.id === membroId);
    if (membro) {
        document.getElementById('nome').value = membro.nome;
        document.getElementById('cargo').value = membro.cargo;
        document.getElementById('discord').value = membro.discord;
        mostrarFormulario();
    }
}

// Função para ver registros de um membro
function verRegistros(membroId) {
    const registrosDoMembro = registrosHoras.filter(r => r.membroId === membroId);
    const membro = membros.find(m => m.id === membroId);
    
    if (!membro) return;
    
    let mensagem = `Registros de ${membro.nome}:\n\n`;
    
    if (registrosDoMembro.length === 0) {
        mensagem += 'Nenhum registro encontrado.';
    } else {
        registrosDoMembro.sort((a, b) => new Date(b.data) - new Date(a.data));
        
        registrosDoMembro.forEach(registro => {
            const dataFormatada = new Date(registro.data).toLocaleDateString('pt-BR');
            mensagem += `Data: ${dataFormatada}\n`;
            mensagem += `Horas: ${registro.horas}\n`;
            mensagem += `Descrição: ${registro.descricao}\n`;
            mensagem += `[ID: ${registro.id}]\n\n`;
        });
        
        mensagem += '\nPara excluir um registro específico, digite o ID do registro:';
        const registroId = prompt(mensagem);
        
        if (registroId) {
            const id = parseInt(registroId);
            if (!isNaN(id) && registrosDoMembro.some(r => r.id === id)) {
                excluirRegistro(id);
            } else {
                alert('ID de registro inválido!');
            }
        }
    }
}

// Função para salvar registro de horas
document.getElementById('form-horas').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const membroId = parseInt(this.parentElement.dataset.membroId);
    const data = document.getElementById('data').value;
    const horas = parseFloat(document.getElementById('horas').value);
    const descricao = document.getElementById('descricao').value.trim();
    
    if (!data || isNaN(horas) || !descricao) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
    
    const novoRegistro = {
        id: Date.now(),
        membroId: membroId,
        data: data,
        horas: horas,
        descricao: descricao
    };
    
    registrosHoras.push(novoRegistro);
    salvarDados();
    
    esconderFormularioHoras();
});

// Função para excluir um membro e seus registros
function excluirMembro(membroId) {
    if (confirm('Tem certeza que deseja excluir este membro? Todos os registros de horas também serão excluídos.')) {
        // Remove o membro
        membros = membros.filter(m => m.id !== membroId);
        
        // Remove os registros do membro
        registrosHoras = registrosHoras.filter(r => r.membroId !== membroId);
        
        salvarDados();
        atualizarTabelaMembros();
        alert('Membro e seus registros foram excluídos com sucesso!');
    }
}

// Função para excluir um registro específico
function excluirRegistro(registroId) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
        registrosHoras = registrosHoras.filter(r => r.id !== registroId);
        salvarDados();
        alert('Registro excluído com sucesso!');
    }
}

// Carregar dados ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarDados); 