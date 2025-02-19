document.addEventListener('deviceready', onDeviceReady, false);

const itensCardapio = [{ pizza: "Calabresa", preco: "R$ 25,00", imagem: "../img/pizza.jpg" },
{ pizza: "Quatro Queijos", preco: "R$ 35,00", imagem: "../img/logo.png" }];

var idItem = 0;
var endereco;
var qtde;
var preco;
var imagem;
var pizza;

// codigo de inicializacao do app
function onDeviceReady() {

    document.getElementById('btnCliqueAqui').addEventListener('click', btnCliqueAquiOnClick, false);
    document.getElementById('esquerda').addEventListener('click', esquerda, false);
    document.getElementById('direita').addEventListener('click', direita, false);

    endereco = document.getElementById('endereco');
    qtde = document.getElementById('qtde');
    preco = document.getElementById('preco');
    imagem = document.getElementById('imagem');
    pizza = document.getElementById('pizza');

    // atualiza interface inicialmente
    atualizarInterface();

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
    alert("Enviar para: " + endereco);

}