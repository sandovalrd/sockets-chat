var socket = io();
var searhParams = new URLSearchParams(window.location.search)

if (!searhParams.has("nombre") || !searhParams.has("sala")) {
    window.location = 'index.html';
}
var usuario = {
    nombre: searhParams.get("nombre"),
    sala: searhParams.get("sala")
}

socket.on('connect', function() {
    socket.emit('entrarChat', usuario, (resp) => {
        console.log(resp);
    });
});

// Escuchar información
socket.on('enviarMensaje', function(data) {
    console.log('Servidor:', data.mensaje);
});

socket.on('listaPersonas', function(mensaje) {
    console.log('Servidor:', mensaje);
});

socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje privado', mensaje);
});