class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        const persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas.filter(item => item.sala === sala);
    }

    getPersona(id) {
        const persona = this.personas.filter(item => {
            return item.id === id
        })[0];
        return persona
    }

    getPersonas() {
        return this.personas
    }

    deletePersona(id) {
        const persona = this.getPersona(id);
        const personas = this.personas.filter(item => {
            return item.id !== id
        });
        this.personas = personas;
        return persona
    }

    getPersonasSala(sala) {
        return this.personas.filter(item => item.sala === sala);
    }
}


module.exports = {
    Usuarios
}