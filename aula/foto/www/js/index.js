document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    document.getElementById('tirarfoto').addEventListener('click', tirarFoto);
}

function tirarFoto() {

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

}
// foto tirada com sucesso!
function onSuccess(imageData) {
    // exibe a image
    document.getElementById('preview').style.backgroundImage = "url('" + imageData + "')";

    // envia a imagem para o backend
    cordova.plugin.http.setDataSerializer('json');
    cordova.plugin.http.post('https://pedidos-pizzaria.glitch.me/imagem', {
        imagem: imageData
    }, {}, function (response) {
        alert(response.status);
    }, function (response) {
        alert(response.error);
    });

}

function onFail(message) {
    alert('Failed because: ' + message);
} 
