const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
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
        localStorage.setItem('ClienteLogado', JSON.stringify(Cliente));
        window.location.href = '/';
    }else{
        alert('Login ou senha inválidos');
    }
});