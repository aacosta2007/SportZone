/**
 * Clase Usuario
 * Representa un usuario de la tienda virtual
 */
class Usuario {
  constructor(id, nombre, email) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.carrito = new Carrito();
  }

  /**
   * Retorna la información del usuario
   */
  obtenerInfo() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      cantidadEnCarrito: this.carrito.obtenerCantidad(),
      totalCarrito: this.carrito.calcularTotal(),
    };
  }

  /**
   * Realiza una compra (vacía el carrito)
   */
  realizarCompra() {
    if (this.carrito.obtenerCantidad() === 0) {
      return {
        exitosa: false,
        mensaje: "El carrito está vacío",
      };
    }

    const total = this.carrito.calcularTotal();
    const items = this.carrito.obtenerItems();

    // Aquí iría la lógica de procesamiento de pago
    const compra = {
      exitosa: true,
      mensaje: `Compra realizada exitosamente por ${this.nombre}`,
      total: total,
      items: items,
      fecha: new Date(),
    };

    // Vaciar carrito después de compra exitosa
    this.carrito.vaciarCarrito();

    return compra;
  }

  /**
   * Agrega un producto al carrito del usuario
   */
  agregarAlCarrito(producto, cantidad = 1) {
    this.carrito.agregarProducto(producto, cantidad);
  }

  /**
   * Elimina un producto del carrito del usuario
   */
  quitarDelCarrito(productoId) {
    this.carrito.eliminarProducto(productoId);
  }
}
