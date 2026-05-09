/**
 * Clase Tienda
 * Gestiona el catálogo de productos y filtros
 */
class Tienda {
  constructor(productos = []) {
    this.catalogo = productos;
    this.categorias = [...new Set(productos.map((p) => p.categoria))];
  }

  /**
   * Obtiene todos los productos del catálogo
   */
  obtenerProductos() {
    return this.catalogo;
  }

  /**
   * Obtiene productos filtrados por categoría
   * @param {string} categoria - Categoría a filtrar (o "Todos")
   * @returns {array} Array de productos filtrados
   */
  filtrarPorCategoria(categoria) {
    if (categoria === "Todos") {
      return this.catalogo;
    }
    return this.catalogo.filter((producto) => producto.categoria === categoria);
  }

  /**
   * Busca productos por nombre
   * @param {string} termino - Término a buscar
   * @returns {array} Array de productos que coinciden
   */
  buscar(termino) {
    return this.catalogo.filter((producto) =>
      producto.nombre.toLowerCase().includes(termino.toLowerCase())
    );
  }

  /**
   * Obtiene un producto por ID
   * @param {number} id - ID del producto
   */
  obtenerProductoPorId(id) {
    return this.catalogo.find((producto) => producto.id === id);
  }

  /**
   * Obtiene todas las categorías disponibles
   */
  obtenerCategorias() {
    return this.categorias;
  }

  /**
   * Renderiza el catálogo de productos
   * @param {string} categoria - Categoría a mostrar
   */
  renderizarCatalogo(categoria = "Todos") {
    const productGrid = document.querySelector("#productGrid");

    if (!productGrid) {
      console.error("No se encontró el elemento productGrid");
      return;
    }

    const productosVisibles = this.filtrarPorCategoria(categoria);

    productGrid.innerHTML = productosVisibles
      .map((producto) => producto.obtenerHTML())
      .join("");
  }

  /**
   * Renderiza los botones de filtro
   */
  renderizarFiltros() {
    const filtersContainer = document.querySelector(".filters");

    if (!filtersContainer) {
      console.error("No se encontró el contenedor de filtros");
      return;
    }

    // Limpiar filtros existentes (excepto el primero "Todos")
    const botonesFiltro = filtersContainer.querySelectorAll(".filter");
    botonesFiltro.forEach((btn) => btn.remove());

    // Crear nuevos filtros
    const categorias = ["Todos", ...this.obtenerCategorias()];
    const filtrosHTML = categorias
      .map((cat, index) => {
        const activo = index === 0 ? "active" : "";
        return `<button class="filter ${activo}" type="button" data-category="${cat}">${cat}</button>`;
      })
      .join("");

    filtersContainer.innerHTML += filtrosHTML;
  }
}
