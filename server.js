const express = require('express');
const app = express();
const Container = require('./public/js/container');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);

app.use(express.static('./public'));

const containerMensajes = new Container('chat.txt');
const containerProductos = new Container('products.txt');
const io = new IOServer(httpServer);
const productos = [];
const mensajes = [];

io.on('connection', (socket) => {
  console.log('New Client Connection');
  socket.emit('mensajes', mensajes);
  socket.emit('productos', productos);
  socket.on('new-message', (mensaje) => {
    io.sockets.emit('mensajes', mensajes);
    if (mensajes.length == 0) {
      mensajes.push(mensaje);
      containerMensajes.save(mensajes);
    } else {
      mensajes.push(mensaje);
      containerMensajes.save(mensaje);
    }
  });
  socket.on('new-product', (producto) => {
    io.sockets.emit('productos', productos);
    if (productos.length == 0) {
      productos.push(producto);
      containerProductos.save(productos);
    } else {
      productos.push(producto);
      containerProductos.save(producto);
    }
  });
});

const PORT = process.env.PORT || 8080;
httpServer
  .listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  .on('error', (error) => console.log(`Error en el servidor ${error}`));
