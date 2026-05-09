/**
 * Clase Producto
 * Representa un producto en la tienda virtual
 */
class Producto {
  constructor(id, nombre, precio, imagen, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen; // URL o emoji
    this.categoria = categoria;
  }

  /**
   * Retorna la información del producto formateada
   */
  mostrarInfo() {
    return `${this.nombre} - ${this.precio} COP (${this.categoria})`;
  }

  /**
   * Obtiene el HTML de la tarjeta del producto
   */
  obtenerHTML() {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

    return `
      <article class="product-card">
        <div class="product-visual" style="--accent: ${this.imagen}">
          <span>${this.imagen}</span>
        </div>
        <div class="product-info">
          <div class="product-top">
            <div>
              <h3>${this.nombre}</h3>
              <span class="category">${this.categoria}</span>
            </div>
            <strong class="price">${formatter.format(this.precio)}</strong>
          </div>
          <button class="button add-to-cart" type="button" data-id="${this.id}">
            Agregar al carrito
          </button>
        </div>
      </article>
    `;
  }
}
