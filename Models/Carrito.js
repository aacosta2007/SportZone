/**
 * Clase Carrito
 * Maneja los productos agregados al carrito y su lógica
 */
class Carrito {
  constructor() {
    this.items = [];
  }

  /**
   * Agrega un producto al carrito
   * @param {Producto} producto - Producto a agregar
   * @param {number} cantidad - Cantidad del producto (por defecto 1)
   */
  agregarProducto(producto, cantidad = 1) {
    const itemExistente = this.items.find((item) => item.producto.id === producto.id);

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push({
        producto: producto,
        cantidad: cantidad,
      });
    }
  }

  /**
   * Elimina un producto del carrito por su ID
   * @param {number} productoId - ID del producto a eliminar
   */
  eliminarProducto(productoId) {
    this.items = this.items.filter((item) => item.producto.id !== productoId);
  }

  /**
   * Calcula el total del carrito
   * @returns {number} Total en pesos
   */
  calcularTotal() {
    return this.items.reduce((total, item) => {
      return total + item.producto.precio * item.cantidad;
    }, 0);
  }

  /**
   * Vacía completamente el carrito
   */
  vaciarCarrito() {
    this.items = [];
  }

  /**
   * Retorna la cantidad de items en el carrito
   */
  obtenerCantidad() {
    return this.items.length;
  }

  /**
   * Retorna el HTML del carrito renderizado
   */
  renderizar() {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

    const carritoItems = document.querySelector("#cartItems");
    const carritoTotal = document.querySelector("#cartTotal");
    const carritoCount = document.querySelector("#cartCount");

    if (!carritoItems || !carritoTotal || !carritoCount) {
      console.error("No se encontraron elementos del DOM del carrito");
      return;
    }

    // Actualizar contador
    carritoCount.textContent = this.obtenerCantidad();

    // Actualizar total
    carritoTotal.textContent = formatter.format(this.calcularTotal());

    // Renderizar items
    if (this.items.length === 0) {
      carritoItems.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
      carritoItems.innerHTML = this.items
        .map(
          (item) => `
            <article class="cart-line">
              <div>
                <strong>${item.producto.nombre}</strong>
                <small>${item.producto.categoria} x${item.cantidad}</small>
              </div>
              <span>${formatter.format(item.producto.precio * item.cantidad)}</span>
              <button class="cart-btn-remove" type="button" data-producto-id="${item.producto.id}" aria-label="Eliminar ${item.producto.nombre}">
                ✕
              </button>
            </article>
          `
        )
        .join("");
    }
  }

  /**
   * Retorna un array con los items del carrito
   */
  obtenerItems() {
    return this.items;
  }
}
