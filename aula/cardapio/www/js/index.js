document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    document.getElementById('btnCliqueAqui').addEventListener('click', btnCliqueAquiOnClick, false);
}

function btnCliqueAquiOnClick() {

    let texto = document.getElementById("texto").value;
    alert(texto);
    document.getElementById("mensagem").innerHTML = texto;

}