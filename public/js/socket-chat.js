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
    socket.emit('entrarChat', usuario, (usuarios) => {
        renderizarUsuarios(usuarios);
    });
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {
    // console.log('Servidor:', data.mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

socket.on('listaPersonas', (usuarios) => {
    renderizarUsuarios(usuarios);
});

socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje privado', mensaje);
});