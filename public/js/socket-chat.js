var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('el nombre y sala son necesarios');
}


var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala'),
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp){
        console.log('usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});



// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Chrystian',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cuando un usuario entra o sale del chat
socket.on('listarPersonas', function(personas){
    console.log(personas);
});

//Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
console.log('mensajePrivado:', mensaje);
});