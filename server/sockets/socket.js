const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { enviarMensaje } = require('../utilidades/util');
const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {

        if (!usuario.nombre || !usuario.sala) {
            callback('Es necesario el nombre del usuario y la sala!')
        }
        const { sala, nombre } = usuario;
        client.join(sala);
        const personas = usuarios.agregarPersona(client.id, nombre, sala);
        client.broadcast.to(sala).emit('listaPersonas', personas);
        client.broadcast.to(sala).emit('enviarMensaje', enviarMensaje('Administrador', `${nombre} Entro!`));
        callback(personas);
    });

    client.on('enviarMensaje', (data, callback) => {
        const persona = usuarios.getPersona(client.id);
        const mensaje = enviarMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('enviarMensaje', mensaje);
        callback(mensaje);
    })

    client.on('disconnect', () => {
        const persona = usuarios.deletePersona(client.id);
        const personas = usuarios.getPersonasSala(persona.sala);
        client.broadcast.to(persona.sala).emit('listaPersonas', personas);
        client.broadcast.to(persona.sala).emit('enviarMensaje', enviarMensaje('Administrador', `${persona.nombre} Salió!`));
    });

    client.on('mensajePrivado', (data) => {
        const persona = usuarios.getPersona(client.id);
        const mensaje = enviarMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
    });

});