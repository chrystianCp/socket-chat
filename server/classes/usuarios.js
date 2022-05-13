// {
//     id: 'asdf72a7sdf-asdf275'
//     nombre: 'chrystian',
//     sala: 'videojuegos'
// }

class Usuarios {

    constructor(){
        this.personas = [];
    }

    agregarPersona(id,nombre,sala){
        let persona = {id,nombre,sala};
        this.personas.push(persona);        
        return this.personas;
    }

    getPersona(id){
        let persona = this.personas.filter(el => el.id === id)[0];        
        return persona;
    };

    getPersonas(){
        return this.personas;
    }

    deletePersona(id){
        let personaBorrada = this.getPersona(id); 
        this.personas = this.personas.filter( el => el.id !== id );        
        return personaBorrada;
    }

    getPersonasPorSala(sala){
        ///TODO: salas
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }



}



module.exports = {
    Usuarios
}