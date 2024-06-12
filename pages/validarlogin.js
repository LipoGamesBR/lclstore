const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if (!login || !senha) {
        alert('Preencha todos os campos');
        return;
    }

    const Cliente = JSON.parse(localStorage.getItem('Cliente'))

    if (Cliente.login === login && Cliente.senha === senha) {
        alert('Login realizado com sucesso');
        return;
    }

    alert('Cadastro realizado com sucesso');
});