/**
 * ================================================
 * APLICACIÓN: SPORTZONE - TIENDA VIRTUAL DE ROPA
 * ================================================
 * Archivo principal que orquesta todas las clases
 * ================================================
 */

// ============ DATOS DEL CATÁLOGO ============
const productosData = [
  new Producto(1, "Camiseta Dry Move", 79900, "👕", "Ropa"),
  new Producto(2, "Legging Power Flex", 119900, "🩳", "Ropa"),
  new Producto(3, "Tenis Sprint X", 249900, "👟", "Calzado"),
  new Producto(4, "Chaqueta Wind Pro", 169900, "🧥", "Ropa"),
  new Producto(5, "Maleta Gym Core", 99900, "🎒", "Accesorios"),
  new Producto(6, "Termo Active 750", 49900, "🥤", "Accesorios"),
  new Producto(7, "Top Soporte Alto", 89900, "👙", "Ropa"),
  new Producto(8, "Tenis Trail Grip", 279900, "🥾", "Calzado"),
];

// ============ INICIALIZACIÓN DE CLASES ============
const tienda = new Tienda(productosData);
const carrito = new Carrito();
let usuarioActual = null;
let facturaActual = null;

// ============ REFERENCIAS AL DOM ============
const productGrid = document.querySelector("#productGrid");
const cartPanel = document.querySelector("#cartPanel");
const cartItems = document.querySelector("#cartItems");
const cartToggle = document.querySelector(".cart-toggle");
const closCartBtn = document.querySelector(".close-cart");
const contactForm = document.querySelector(".contact-form");
const filtersContainer = document.querySelector(".filters");

// Referencias para factura
const facturaModal = document.querySelector("#facturaModal");
const facturaContenedor = document.querySelector("#facturaContenedor");
const btnFinalizarCompra = document.querySelector("#finalizarCompra");
const btnDescargarFactura = document.querySelector("#btnDescargarFactura");
const btnEnviarEmail = document.querySelector("#btnEnviarEmail");
const btnImprimirFactura = document.querySelector("#btnImprimirFactura");
const btnCerrarFactura = document.querySelector("#btnCerrarFactura");

// ============ FUNCIONES DE INTERFAZ ============

/**
 * Inicializa la tienda renderizando catálogo y filtros
 */
function inicializarTienda() {
  tienda.renderizarCatalogo("Todos");
  tienda.renderizarFiltros();
  carrito.renderizar();
}

/**
 * Configura los eventos de los filtros
 */
function configurarFiltros() {
  document.addEventListener("click", (event) => {
    const filterBtn = event.target.closest(".filter");
    if (!filterBtn) return;

    // Actualizar estado visual
    document.querySelectorAll(".filter").forEach((btn) => btn.classList.remove("active"));
    filterBtn.classList.add("active");

    // Renderizar productos filtrados
    const categoria = filterBtn.dataset.category;
    tienda.renderizarCatalogo(categoria);
  });
}

/**
 * Configura los eventos del carrito
 */
function configurarCarrito() {
  // Evento: agregar producto al carrito
  document.addEventListener("click", (event) => {
    const addBtn = event.target.closest(".add-to-cart");
    if (!addBtn) return;

    const productoId = Number(addBtn.dataset.id);
    const producto = tienda.obtenerProductoPorId(productoId);

    if (producto) {
      carrito.agregarProducto(producto, 1);
      carrito.renderizar();
      cartPanel.classList.add("open");
    }
  });

  // Evento: eliminar producto del carrito
  document.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".cart-btn-remove");
    if (!removeBtn) return;

    const productoId = Number(removeBtn.dataset.productoId);
    carrito.eliminarProducto(productoId);
    carrito.renderizar();
  });

  // Evento: abrir carrito
  cartToggle.addEventListener("click", () => {
    cartPanel.classList.add("open");
  });

  // Evento: cerrar carrito
  closCartBtn.addEventListener("click", () => {
    cartPanel.classList.remove("open");
  });

  // Evento: vaciar carrito
  const vaciarBtn = document.querySelector("#vaciarCarrito");
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
      if (carrito.obtenerCantidad() === 0) {
        alert("El carrito ya está vacío");
        return;
      }

      if (confirm("¿Estás seguro de que deseas vaciar todo el carrito?")) {
        carrito.vaciarCarrito();
        carrito.renderizar();
      }
    });
  }

  // Evento: finalizar compra
  if (btnFinalizarCompra) {
    btnFinalizarCompra.addEventListener("click", () => {
      mostrarFactura();
    });
  }

  // Eventos del modal de factura
  if (btnCerrarFactura) {
    btnCerrarFactura.addEventListener("click", () => {
      cerrarFactura();
    });
  }

  if (btnDescargarFactura) {
    btnDescargarFactura.addEventListener("click", () => {
      if (facturaActual) {
        facturaActual.descargar();
      }
    });
  }

  if (btnEnviarEmail) {
    btnEnviarEmail.addEventListener("click", () => {
      if (facturaActual) {
        const resultado = facturaActual.enviarEmail();
        alert(resultado.mensaje);
      }
    });
  }

  if (btnImprimirFactura) {
    btnImprimirFactura.addEventListener("click", () => {
      window.print();
    });
  }
}

/**
 * Configura el formulario de contacto
 */
function configurarFormulario() {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = event.currentTarget.querySelector('[name="nombre"]').value;
    const email = event.currentTarget.querySelector('[name="correo"]').value;

    // Crear usuario
    usuarioActual = new Usuario(Date.now(), nombre, email);

    alert(
      `¡Gracias ${nombre}! Pronto recibirás una recomendación de talla de nuestros asesores.`
    );

    event.currentTarget.reset();
  });
}

/**
 * Muestra el modal de factura
 */
function mostrarFactura() {
  if (carrito.obtenerCantidad() === 0) {
    alert("El carrito está vacío. Agrega productos antes de finalizar.");
    return;
  }

  // Si no hay usuario, crear uno genérico
  if (!usuarioActual) {
    usuarioActual = new Usuario(Date.now(), "Cliente", "cliente@sportzone.com");
  }

  // Crear factura
  facturaActual = new Factura(usuarioActual, carrito);

  // Renderizar factura en el modal
  facturaContenedor.innerHTML = facturaActual.obtenerHTML();

  // Mostrar modal
  facturaModal.classList.add("open");

  // Cerrar carrito
  cartPanel.classList.remove("open");
}

/**
 * Cierra el modal de factura
 */
function cerrarFactura() {
  facturaModal.classList.remove("open");
}

/**
 * Procesa la compra final
 */
function procesarCompra(metodoPago = "Tarjeta de Crédito") {
  if (!facturaActual) {
    alert("Error: No hay factura para procesar");
    return;
  }

  const resultado = facturaActual.procesarPago(metodoPago);

  if (resultado.exitoso) {
    alert(
      `✅ ${resultado.mensaje}\n\nFactura: ${resultado.numeroFactura}\n\nTu carrito ha sido vaciado.`
    );

    // Vaciar carrito
    carrito.vaciarCarrito();
    carrito.renderizar();

    // Cerrar modal
    cerrarFactura();

    // Abrir carrito vacío
    cartPanel.classList.add("open");
  } else {
    alert(`❌ Error: ${resultado.mensaje}`);
  }
}

/**
 * Configura los eventos de la factura
 */
function configurarFactura() {
  // Cerrar modal clickeando fuera
  facturaModal.addEventListener("click", (event) => {
    if (event.target === facturaModal) {
      cerrarFactura();
    }
  });
}

// ============ INICIALIZACIÓN DE LA APP ============
document.addEventListener("DOMContentLoaded", () => {
  inicializarTienda();
  configurarFiltros();
  configurarCarrito();
  configurarFormulario();
  configurarFactura();

  console.log("✅ SportZone tienda virtual cargada correctamente");
  console.log("📄 Sistema de facturación integrado");
});
