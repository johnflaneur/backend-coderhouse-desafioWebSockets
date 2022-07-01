const fs = require('fs');
//clases
class Contenedor{
    
    //constructor
    constructor(archivo){
        this.archivo = "dbChats";
    }


    //métodos
    async save (message) {
        try{
            const mensajePorGrabar = `FechaYHora: ${message.time}, UserName: ${message.username}, Mensaje: ${message.message}\n`;
            await fs.promises.appendFile(`./${this.archivo}.txt`, mensajePorGrabar);
            console.log("Mensaje guardado correctamente")
        } catch(error) {
            console.log(`Ocurrio el siguiente error al guardar el mensaje: ${error}`)
        }
    }
    async getAll () {
        let listadoMsg = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        console.log("Listado de mensajes: ", listadoMsg);
        return listadoMsg;
    }
    async deleteAll () {
        await fs.promises.writeFile(`./${this.archivo}.txt`, '{}');
        return "Borrado con exito"
    }
};

module.exports = Contenedor;