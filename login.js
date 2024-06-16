// Verifica se existe um cliente logado no localStorage
if (localStorage.getItem('ClienteLogado')) {
    const Cliente = JSON.parse(localStorage.getItem('ClienteLogado'));

    const nomeCliente = Cliente.nome.split(' ')[0] + ' ' + Cliente.nome.split(' ')[1];

    const h2NomeCliente = document.createElement('h2');
    h2NomeCliente.textContent = nomeCliente;

    const btnLogout = document.createElement('button');
    btnLogout.textContent = 'Logout';
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('ClienteLogado');
        location.reload();
    });

    document.getElementById('btnLogin').insertAdjacentElement('afterend', btnLogout);

    
    document.getElementById('btnLogin').replaceWith(h2NomeCliente);
    document.getElementById('btnLogin').textContent = nomeCliente;

}