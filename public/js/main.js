const socket = io.connect();
socket.on('mensajes', (data) => {
  console.log(data);
  render(data);
});

socket.on('productos', (data) => {
  renderProductos(data);
});

const addMessage = (e) => {
  const mensaje = {
    autor: document.getElementById('name').value,
    mensaje: document.getElementById('text').value,
  };
  socket.emit('new-message', mensaje);
  return false;
};

function render(data) {
  const date = new Date();
  const html = data
    .map((elem) => {
      return `<div class="container m-1 p-1">
                    <strong style="color:blue;">${elem.autor}</strong>
                    <span style="color:brown";>${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</span>:
                    <em style="color:green;">${elem.mensaje}</em>
                </div>`;
    })
    .join(' ');
  document.getElementById('mensajes').innerHTML = html;
}

const addProduct = (e) => {
  const producto = {
    nombre: document.getElementById('nombre').value,
    precio: document.getElementById('precio').value,
    url: document.getElementById('url').value,
  };
  socket.emit('new-product', producto);
  return false;
};

function renderProducts(data) {
  const html = data
    .map((prod) => {
      return `<div class="container m-1 p-1">
                    <strong>${prod.nombre}</strong>:
                    <p>$${prod.precio}</p>
                    <p>${prod.url}</p>
                </div>`;
    })
    .join(' ');
  document.getElementById('productos').innerHTML = html;
}

socket.on('mensajes', function (data) {
  render(data);
});
socket.on('productos', function (data) {
  renderProducts(data);
});
