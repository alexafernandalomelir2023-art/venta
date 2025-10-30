const contenedor = document.getElementById("contenedor-producto");
const btnAgregar = document.getElementById("agregar");

let productosBase = []; // productos del JSON
let productosExtra = JSON.parse(localStorage.getItem("productosExtra")) || [];

// Mostrar todos los productos (base + agregados)
function mostrarProductos() {
  contenedor.innerHTML = "";

  // Mostrar productos del JSON (no se pueden eliminar)
  productosBase.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio} MXN</p>
    `;
    contenedor.appendChild(div);
  });

  // Mostrar productos agregados (se pueden eliminar)
  productosExtra.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

// Eliminar solo productos agregados
function eliminarProducto(index) {
  productosExtra.splice(index, 1);
  localStorage.setItem("productosExtra", JSON.stringify(productosExtra));
  mostrarProductos();
}

// Agregar nuevo producto
btnAgregar.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const precio = document.getElementById("precio").value.trim();
  const imagen = document.getElementById("imagen").value.trim();

  if (!nombre || !precio || !imagen) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevoProducto = { nombre, precio, imagen };
  productosExtra.push(nuevoProducto);
  localStorage.setItem("productosExtra", JSON.stringify(productosExtra));

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("imagen").value = "";

  mostrarProductos();
});

// Cargar productos del JSON al iniciar
fetch("products.json")
  .then(response => response.json())
  .then(datos => {
    productosBase = datos;
    mostrarProductos();
  })
  .catch(error => console.error("Error al cargar el JSON:", error));
