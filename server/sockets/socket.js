const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {crearMensaje} = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    
    client.on('entrarChat', (data, callback) => {
        if(!data.nombre || !data.sala){
            return callback({
                error: true,
                msg: 'el nombre y sala son necesarios'
            });
        }      
        client.join(data.sala);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listarPersonas', usuarios.getPersonasPorSala(data.sala));
        callback(personas);
    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    
    client.on('disconnect', () => {
        let personaBorrada = usuarios.deletePersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador',`${personaBorrada.nombre} salio`));
        client.broadcast.to(personaBorrada.sala).emit('listarPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    //Mensajes privados
    client.on('mensajePrivado', data => {
        //saber que persona lo esta mandando
        let persona = usuarios.getPersona(client.id);
        //emitir a todos los usuarios
        // client.broadcast.emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
        //emitir a un usuario en especifico usando su id
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});

