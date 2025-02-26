document.addEventListener('deviceready', onDeviceReady, false);

var itensCardapio;

var idItem = 0;
var endereco;
var qtde;
var preco;
var imagem;
var pizza;

const URL_PING = 'https://pedidos-pizzaria.glitch.me/ping';
const URL_CARDAPIO = 'https://pedidos-pizzaria.glitch.me/pizzas';
const URL_PEDIDO = 'https://pedidos-pizzaria.glitch.me';

// codigo de inicializacao do app
function onDeviceReady() {

    // exibe alert quando o nivel da bateria e alterado
    window.addEventListener("batterystatus", (status) => { if (status.level <= 20) alert("Recarregue o celular!!!") }, false);

    document.getElementById('btnCliqueAqui').addEventListener('click', btnCliqueAquiOnClick, false);
    document.getElementById('esquerda').addEventListener('click', esquerda, false);
    document.getElementById('direita').addEventListener('click', direita, false);

    endereco = document.getElementById('endereco');
    qtde = document.getElementById('qtde');
    preco = document.getElementById('preco');
    imagem = document.getElementById('imagem');
    pizza = document.getElementById('pizza');

    StatusBar.hide();

    info();

    document.addEventListener("offline", redeOff, false);

    document.addEventListener("online", redeOn, false);

    testeBackEnd();

    navigator.geolocation.getCurrentPosition(geoOK, geoError);
    obterEndereco();

}

function obterEndereco() {

    let storage = window.localStorage;
    // caso o endereco exista no local storage exibe o endereco no campo correspondente
    if (storage.getItem("endereco")) {
        endereco.value = storage.getItem("endereco");
    }

}

function geoOK(posicao) {
    alert("lat x long: " + posicao.coords.latitude + " x " + posicao.coords.longitude);
}

function geoError(err) {
    alert("Erro" + err);
}

function info() {

    navigator.notification.alert(
        "Plataforma: " + device.platform + " - " + device.sdkVersion, // mensagem
        fecharAlerta(), // função acionada quando fechar o diálogo
        'Informações', // título
        'OK' // texto do botão
    );
}

function fecharAlerta() {

}

function redeOff() {
    alert("Sem internet: " + navigator.connection.type);
}

function redeOn() {
    alert("Com internet: " + navigator.connection.type);
}

function testeBackEnd() {

    // função acionada se a requisição GET ocorrer com sucesso
    const resposta = (resposta) => {
        if (resposta.status === 200) {
            // requisitar o cardapio
            obterCardapio();
        }
    }
    // função chamada caso ocorre algum erro
    const erro = (erro) => {
        alert("Erro: " + erro.error);
    }

    cordova.plugin.http.get(URL_PING, {}, {}, resposta, erro);
}

function obterCardapio() {

    // função acionada se a requisição GET ocorrer com sucesso
    const resposta = (resposta) => {
        if (resposta.status === 200) {
            // requisitar o cardapio
            itensCardapio = JSON.parse(resposta.data);
            // atualiza interface
            atualizarInterface();
        }
    }
    // função chamada caso ocorre algum erro
    const erro = (erro) => {
        alert("Erro: " + erro.error);
    }

    cordova.plugin.http.get(URL_CARDAPIO, {}, {}, resposta, erro);
}

// incrementa idItem em 1 unidade e atualiza a interface
function direita() {

    if (idItem > itensCardapio.length) {
        idItem = 0;
    } else {
        idItem++;
    }

    atualizarInterface();

}

// decrementa idItem em 1 unidade e atualiza a interface
function esquerda() {

    if (idItem < 0) {
        idItem = itensCardapio.length - 1;
    } else {
        idItem--;
    }

    atualizarInterface();
}

// atualiza os dados na interface de acordo com a posicao do array itensCardapio (idItem)
function atualizarInterface() {
    pizza.innerHTML = itensCardapio[idItem].pizza;
    preco.innerHTML = itensCardapio[idItem].preco;
    imagem.style.backgroundImage = itensCardapio[idItem].imagem;
}

function btnCliqueAquiOnClick() {

    let endereco = document.getElementById("endereco").value;
    let pizza = itensCardapio[idItem].pizza;
    let quantidade = qtde.value;

    let storage = window.localStorage;
    // atualiza o endereco no local storage
    storage.setItem("endereco", endereco);

    // converte a string do corpo da requisição POST para JSON
    cordova.plugin.http.setDataSerializer('json');

    let corpo = { pizza: pizza, quantidade: quantidade, endereco: endereco };

    alert(corpo);
    const resposta = (resposta) => {
        if (resposta.status === 200) {
            alert('Pedido enviado com sucesso!!!');
        }
    }

    const erro = (erro) => {
        alert('Erro ao enviar o pedido: ' + erro.error);
    }

    cordova.plugin.http.post(URL_PEDIDO, corpo, {}, resposta, erro);

}