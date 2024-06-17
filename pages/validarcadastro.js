function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
}

function consultarCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const { logradouro, bairro, localidade, uf } = data;
            console.log(`Endereço: ${logradouro}, ${bairro}, ${localidade} - ${uf}`);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data-nascimento').value;
    const sexo = document.getElementById('sexo').value;
    const nomeMae = document.getElementById('nome-materno').value;
    const cpf = document.getElementById('cpf').value;
    const celular = document.getElementById('telefone-celular').value;
    const telefone = document.getElementById('telefone-celular').value;
    const cep = document.getElementById('cep').value;
    const estado = document.getElementById('estado').value;
    const cidade = document.getElementById('cidade').value; 
    const bairro = document.getElementById('bairro').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if(nome.length < 15 || nome.length > 80) {
        alert('Nome inválido');
        return;
    }
    if (!validarCPF(cpf)) {
        alert('CPF inválido');
        return;
    }
    const endereco = await consultarCEP(cep);
    if(!estado || !cidade || !bairro|| !rua || !numero){
        if(endereco){
            estado = endereco.uf;
            cidade = endereco.localidade;
            bairro = endereco.bairro;
            rua = endereco.logradouro;
        }else{
            alert('Endereço inválido');
            return;
        }
    }
    if(senha !== confirmarSenha){
        alert('Senhas não conferem');
        return;
    }

    const Cliente = {
        nome,
        data,
        sexo,
        nomeMae,
        cpf,
        celular,
        telefone,
        cep,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        complemento,
        login,
        senha
    };

    localStorage.setItem('Cliente', JSON.stringify(Cliente));
    alert('Cadastro realizado com sucesso!');
    localStorage.setItem('ClienteLogado', JSON.stringify(Cliente));
    window.location.href = '/';
});

function autoFillAddress() {
    const cepInput = document.getElementById('cep');
    const estadoInput = document.getElementById('estado');
    const cidadeInput = document.getElementById('cidade');
    const bairroInput = document.getElementById('bairro');
    const ruaInput = document.getElementById('rua');
    const numeroInput = document.getElementById('numero');
    cepInput.addEventListener('blur', async () => {
        const cep = cepInput.value;
        if (cep.length === 8) {
            const endereco = await consultarCEP(cep);
            if (endereco) {
                estadoInput.value = endereco.uf;
                cidadeInput.value = endereco.localidade;
                bairroInput.value = endereco.bairro;
                ruaInput.value = endereco.logradouro;
                numeroInput.focus();
            }
        }
    });
}

autoFillAddress();