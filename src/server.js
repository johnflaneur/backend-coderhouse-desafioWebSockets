const express = require('express');
const app = express();
const puerto = 8080;
const path = require('path');
const expressServer = app.listen(puerto, () => {
    try{
        console.log(`El servidor está escuchando el puerto: ${puerto}`)
    }
    catch(error){
        console.log("Ocurrió el siguiente error al iniciar: ", error);
    }
});
//io server
const { Server: IOServer } = require('socket.io');
const io = new IOServer(expressServer);
//array
const msgArray = [];
const productos = [
    {
        "id": 1,
        "url": "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/2CC7LXZ5E5BYDIANUS2XHBF5G4.jpg",
        "price": 800,
        "description": "Shampoo Solido Natural"
    },
    {
        "id": 2,
        "url": "http://d3ugyf2ht6aenh.cloudfront.net/stores/883/166/products/agua-micelar1-315eef8dbea987ec9415957062896121-640-0.jpg",
        "price": 300,
        "description": "Agua Micelar"
    },
    {
        "id": 3,
        "url": "https://i.pinimg.com/originals/cc/01/76/cc0176e0b91358c8a84f58e7fc389ff0.jpg",
        "price": 450,
        "description": "Jabón Vegano"
    },
    {
        "id": 4,
        "url": "https://www.eluniversal.com.mx/sites/default/files/2021/02/10/desodorante_natural.jpg",
        "price": 600,
        "description": "Desodorante Natural"
    },
    {
        "id": 5,
        "url": "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/040/363/products/meraki-21-123e4ac70e276d920615722213253108-640-0.jpg",
        "price": 300,
        "description": "Cepillo de dientes de bambú"
    },
    {
        "id": 6,
        "url": "https://m3k8v6r5.stackpathcdn.com/wp-content/uploads/Estuche-Luffa-para-jabon-solido-1024x512.jpg",
        "price": 350,
        "description": "Esponja de Luffa"
    }
];
//contenedor de archivo
const Contenedor = require('./contenedor.js');
dbChats = new Contenedor;


//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));



//io sockets
io.on('connection', socket => {
    console.log('Se conectó el cliente con id: ', socket.id);

    //productos
    socket.emit('server:products', productos);
    socket.on('client:product', productoInfo => {
        productos.push(productoInfo);
        io.emit('server:products', productos);
    })
    
    //mensajes
    socket.emit('server:msgs', msgArray);
    socket.on('client:msg', msgInfo => {
        msgArray.push(msgInfo);
        dbChats.save(msgInfo);
        io.emit('server:msgs', msgArray)
    })
})