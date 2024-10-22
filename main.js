const buscador = document.querySelector('.buscar');
const botonBuscar = document.querySelector('.botonbuscar');
const productos = document.querySelectorAll('.producto');
const contenedorProductos = document.querySelector('.contenedor-productos'); // Selector corregido

// Añadir evento de búsqueda al pulsar Enter
buscador.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        realizarBusqueda();
    }
});

// Añadir evento de búsqueda al hacer clic en el botón
botonBuscar.addEventListener('click', realizarBusqueda);

// Función para realizar la búsqueda
function realizarBusqueda() {
    const terminoBusqueda = buscador.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    
    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('.nombreproducto').textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        
        // Mostrar u ocultar productos según coincidencia
        if (nombreProducto.includes(terminoBusqueda)) {
            producto.style.display = 'block'; 
        } else {
            producto.style.display = 'none'; 
        }
    });
    
    ordenarProductos();
}

// Función para ordenar los productos
function ordenarProductos() {
    const productosCoincidentes = document.querySelectorAll('.producto:not([style*="display: none"])');
    
    // Limpiar contenedor de productos
    contenedorProductos.innerHTML = '';

    // Ajustar estilo de los productos y añadirlos al contenedor
    productosCoincidentes.forEach(producto => {
        producto.style.width = '350px'; 
        contenedorProductos.appendChild(producto);
    });
}

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchProductos();
});

// Función para obtener productos desde la API
function fetchProductos() {
    fetch('http://127.0.0.1:8000/admin/myapp/producto/')  // Asegúrate de que la URL de tu API esté activa
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            return response.json();
        })
        .then(data => mostrarProductos(data))
        .catch(error => console.error('Error:', error));
}

// Función para mostrar los productos obtenidos de la API
function mostrarProductos(productos) {
    contenedorProductos.innerHTML = '';  // Limpiar el contenedor antes de agregar los productos

    productos.forEach(producto => {
        // Crear el elemento HTML para cada producto
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        
        // Añadir la imagen del producto si existe
        const imagenProducto = producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" />` : '';

        // Estructura HTML del producto
        productoElement.innerHTML = `
            ${imagenProducto}
            <h3 class="nombreproducto">${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
        `;
        
        contenedorProductos.appendChild(productoElement);
    });
}

// Inicializar variables
let totalProductCount = 0; // Total de productos en el carrito
let selectedProductCount = 1; // Cantidad seleccionada
const productName = "Producto Ejemplo"; // Nombre del producto
const productPrice = 10; // Precio del producto

// Obtener elementos del DOM
const addToCartBtn = document.getElementById('addToCartBtn');
const cartCount = document.getElementById('cartCount');
const cartTableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
const totalSumCell = document.getElementById('totalSum');

// Función para agregar productos al carrito
function addToCart() {
    if (selectedProductCount > 0) {
        // Calcular total para este producto
        const total = productPrice * selectedProductCount;

        // Agregar el producto a la tabla
        addProductToTable(productName, productPrice, selectedProductCount, total);

        // Actualizar el contador total de productos
        totalProductCount += selectedProductCount;
        cartCount.textContent = totalProductCount;

        // Reiniciar la cantidad seleccionada después de agregar al carrito
        selectedProductCount = 1;
    }
}

// Función para agregar un producto a la tabla
function addProductToTable(name, price, quantity, total) {
    const newRow = cartTableBody.insertRow();
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = price.toFixed(2); // Mostrar el precio con dos decimales
    newRow.insertCell(2).innerHTML = `
        <div class="quantity-controls">
            <button onclick="changeQuantity(this, -1)">−</button>
            <input type="number" value="${quantity}" min="0" readonly />
            <button onclick="changeQuantity(this, 1)">+</button>
        </div>
    `;
    newRow.insertCell(3).textContent = total.toFixed(2); // Mostrar el total con dos decimales
    newRow.insertCell(4).innerHTML = `<button onclick="removeProduct(this)">Eliminar</button>`;

    // Actualizar el total general después de agregar el producto
    updateTotalSum();
}

// Función para cambiar la cantidad de un producto
function changeQuantity(button, change) {
    const row = button.parentElement.parentElement.parentElement; // Obtener la fila del producto
    const quantityInput = row.getElementsByTagName('input')[0]; // Obtener el input de cantidad
    let quantity = parseInt(quantityInput.value) + change; // Calcular nueva cantidad

    // No permitir cantidades negativas
    if (quantity < 0) quantity = 0;

    quantityInput.value = quantity; // Actualizar el input
    const price = parseFloat(row.cells[1].textContent); // Obtener el precio
    const total = price * quantity; // Calcular nuevo total
    row.cells[3].textContent = total.toFixed(2); // Actualizar total en la tabla

    // Si la cantidad es 0, eliminar la fila
    if (quantity === 0) {
        row.remove(); // Eliminar la fila
    }

    // Actualizar el contador total de productos en el carrito
    updateTotalCount();
}

// Función para actualizar el contador total de productos en el carrito
function updateTotalCount() {
    totalProductCount = 0; // Reiniciar el contador
    const rows = cartTableBody.getElementsByTagName('tr'); // Obtener todas las filas

    for (let row of rows) {
        const quantity = parseInt(row.getElementsByTagName('input')[0].value); // Obtener cantidad
        totalProductCount += quantity; // Sumar al contador total
    }

    cartCount.textContent = totalProductCount; // Actualizar visualización
    updateTotalSum(); // Actualizar la suma total
}

// Función para calcular y mostrar la suma total
function updateTotalSum() {
    let totalSum = 0; // Inicializar suma total
    const rows = cartTableBody.getElementsByTagName('tr'); // Obtener todas las filas

    for (let row of rows) {
        const total = parseFloat(row.cells[3].textContent); // Obtener el total de la columna
        totalSum += total; // Sumar al total general
    }

    totalSumCell.textContent = totalSum.toFixed(2); // Actualizar el total general en la tabla
}

// Función para eliminar un producto
function removeProduct(button) {
    const row = button.parentElement.parentElement; // Obtener la fila del producto
    row.remove(); // Eliminar la fila
    updateTotalCount(); // Actualizar contador después de eliminar
}

// Añadir eventos a los botones
addToCartBtn.addEventListener('click', addToCart);








