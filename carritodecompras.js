// Array para almacenar los productos agregados al carrito
let carrito = [];

// Función para agregar productos al carrito
document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', function() {
        const nombre = this.getAttribute('data-nombre');
        const precio = parseFloat(this.getAttribute('data-precio'));
        
        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(item => item.nombre === nombre);
        
        if (productoExistente) {
            // Si ya existe, no lo agrega nuevamente
            productoExistente.cantidad++;
        } else {
            // Si no existe, lo agrega al carrito
            carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
        }

        guardarCarrito();
    });
});

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito en la página del carrito de compras
function cargarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        mostrarCarrito();
    }
}

// Función para mostrar el carrito con tarjetas en lugar de una tabla
function mostrarCarrito() {
    const contenedor = document.querySelector('.productos-container'); // Div donde se agregarán las tarjetas
    contenedor.innerHTML = '';  // Limpiar el contenedor
    let totalCarrito = 0;

    carrito.forEach((producto, index) => {
        const total = producto.precio * producto.cantidad;
        totalCarrito += total;

        // Crear tarjeta para cada producto
        const tarjeta = `
            <div class="card mb-3" style="max-width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
                    <p class="card-text">Cantidad: 
                        <button class="btn btn-sm btn-outline-secondary disminuir-cantidad" data-index="${index}">-</button>
                        ${producto.cantidad}
                        <button class="btn btn-sm btn-outline-secondary aumentar-cantidad" data-index="${index}">+</button>
                    </p>
                    <p class="card-text">Total: $${total.toFixed(2)}</p>
                    <button class="btn btn-danger btn-sm eliminar-producto" data-index="${index}">Eliminar</button>
                </div>
            </div>
        `;

        contenedor.innerHTML += tarjeta;
    });

    document.querySelector('#totalCarrito').textContent = `$${totalCarrito.toFixed(2)}`;

    // Añadir eventos para incrementar y disminuir cantidad
    document.querySelectorAll('.aumentar-cantidad').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            incrementarCantidad(index);
        });
    });

    document.querySelectorAll('.disminuir-cantidad').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            disminuirCantidad(index);
        });
    });

    // Añadir evento de eliminar
    document.querySelectorAll('.eliminar-producto').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            eliminarProducto(index);
        });
    });
}

// Función para incrementar la cantidad de un producto
function incrementarCantidad(index) {
    carrito[index].cantidad++;
    guardarCarrito();
    mostrarCarrito();
}

// Función para disminuir la cantidad de un producto
function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        eliminarProducto(index); // Si la cantidad es 1 y se reduce, elimina el producto
    }
    guardarCarrito();
    mostrarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);  // Eliminar el producto del array
    guardarCarrito();
    mostrarCarrito();  // Volver a mostrar la tabla actualizada
}

// Cargar el carrito cuando se carga la página del carrito
if (window.location.pathname.includes('carritodecompras.html')) {
    cargarCarrito();
}

document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', function() {
        const nombre = this.getAttribute('data-nombre');
        
        // Usar SweetAlert con colores personalizados
        Swal.fire({
            title: 'Producto agregado',
            text: `Se ha agregado ${nombre} al carrito exitosamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#714212', // Color del botón de confirmación
            background: '#f9f9f9', // Color de fondo del modal
            color: '#333', // Color del texto
            iconColor: '#714212' // Color del icono de éxito
        });
    });
});





// implementación de metodo de pago paypal

// Cargar el total del carrito
let totalCarrito = 0;

function calcularTotalCarrito() {
    totalCarrito = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    document.querySelector('#totalCarrito').textContent = `$${totalCarrito.toFixed(2)}`;
}

calcularTotalCarrito(); // Calcular el total al cargar la página

// Crear el botón de PayPal
paypal.Buttons({
    // Configuración de creación de transacción
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: totalCarrito.toFixed(2) // Usar el total del carrito
                }
            }]
        });
    },
    // Manejar la aprobación del pago
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Aquí puedes manejar el resultado exitoso del pago
            alert('Pago completado por ' + details.payer.name.given_name);
            
            // Limpiar el carrito después de un pago exitoso
            carrito = [];
            guardarCarrito();
            mostrarCarrito();
            calcularTotalCarrito();
        });
    },
    // Manejar errores de pago
    onError: function(err) {
        console.error('Error durante el proceso de pago:', err);
        alert('Hubo un error durante el pago. Inténtalo nuevamente.');
    }
}).render('#paypal-button-container'); // Renderizar el botón en el contenedor
