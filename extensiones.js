/**
 * ================================================
 * EXTENSIONES Y FUNCIONALIDADES AVANZADAS
 * ================================================
 * Este archivo contiene ejemplos de cómo extender
 * la aplicación con nuevas características
 * ================================================
 */

// ============ EJEMPLO 1: GUARDAR CARRITO EN LOCALSTORAGE ============

class CarritoConPersistencia extends Carrito {
  constructor(nombreLlave = "carrito_sportzone") {
    super();
    this.nombreLlave = nombreLlave;
    this.cargarDelLocal();
  }

  /**
   * Guarda el carrito en localStorage
   */
  guardarEnLocal() {
    const data = {
      items: this.items.map((item) => ({
        id: item.producto.id,
        nombre: item.producto.nombre,
        precio: item.producto.precio,
        categoria: item.producto.categoria,
        imagen: item.producto.imagen,
        cantidad: item.cantidad,
      })),
    };
    localStorage.setItem(this.nombreLlave, JSON.stringify(data));
  }

  /**
   * Carga el carrito desde localStorage
   */
  cargarDelLocal() {
    const data = localStorage.getItem(this.nombreLlave);
    if (!data) return;

    try {
      const { items } = JSON.parse(data);
      this.items = items.map((item) => ({
        producto: new Producto(
          item.id,
          item.nombre,
          item.precio,
          item.imagen,
          item.categoria
        ),
        cantidad: item.cantidad,
      }));
    } catch (error) {
      console.error("Error cargando carrito del localStorage:", error);
    }
  }

  /**
   * Sobrescribe agregarProducto para persistencia
   */
  agregarProducto(producto, cantidad = 1) {
    super.agregarProducto(producto, cantidad);
    this.guardarEnLocal();
  }

  /**
   * Sobrescribe eliminarProducto para persistencia
   */
  eliminarProducto(productoId) {
    super.eliminarProducto(productoId);
    this.guardarEnLocal();
  }

  /**
   * Sobrescribe vaciarCarrito para persistencia
   */
  vaciarCarrito() {
    super.vaciarCarrito();
    localStorage.removeItem(this.nombreLlave);
  }
}

// ============ EJEMPLO 2: SISTEMA DE CUPONES DE DESCUENTO ============

class CarritoConDescuentos extends Carrito {
  constructor() {
    super();
    this.descuentos = [];
    this.codigosCupones = {
      DESCUENTO10: 0.1,
      DESCUENTO20: 0.2,
      VERANO15: 0.15,
      VIPUSER: 0.25,
    };
  }

  /**
   * Aplica un cupón de descuento
   * @param {string} codigo - Código del cupón
   */
  aplicarCupon(codigo) {
    if (!this.codigosCupones[codigo]) {
      return {
        exitoso: false,
        mensaje: "Código de cupón inválido",
      };
    }

    if (this.descuentos.includes(codigo)) {
      return {
        exitoso: false,
        mensaje: "Este cupón ya fue aplicado",
      };
    }

    this.descuentos.push(codigo);
    return {
      exitoso: true,
      mensaje: `Cupón ${codigo} aplicado exitosamente`,
      descuento: this.codigosCupones[codigo] * 100,
    };
  }

  /**
   * Calcula el total con descuentos
   */
  calcularTotal() {
    const total = super.calcularTotal();
    const descuentoTotal = this.descuentos.reduce(
      (sum, codigo) => sum + this.codigosCupones[codigo],
      0
    );
    return Math.max(0, total * (1 - descuentoTotal));
  }

  /**
   * Retorna el porcentaje total de descuento
   */
  obtenerPorcentajeDescuento() {
    return this.descuentos.reduce(
      (sum, codigo) => sum + this.codigosCupones[codigo],
      0
    ) * 100;
  }
}

// ============ EJEMPLO 3: HISTORIAL DE COMPRAS ============

class UsuarioConHistorial extends Usuario {
  constructor(id, nombre, email) {
    super(id, nombre, email);
    this.historialCompras = [];
  }

  /**
   * Realiza una compra y la guarda en el historial
   */
  realizarCompra() {
    const resultado = super.realizarCompra();

    if (resultado.exitosa) {
      this.historialCompras.push({
        id: this.historialCompras.length + 1,
        fecha: new Date(),
        total: resultado.total,
        items: resultado.items,
      });
    }

    return resultado;
  }

  /**
   * Obtiene el historial de compras
   */
  obtenerHistorial() {
    return this.historialCompras;
  }

  /**
   * Calcula el total gastado
   */
  totalGastado() {
    return this.historialCompras.reduce((sum, compra) => sum + compra.total, 0);
  }

  /**
   * Obtiene la compra más reciente
   */
  ultimaCompra() {
    if (this.historialCompras.length === 0) return null;
    return this.historialCompras[this.historialCompras.length - 1];
  }
}

// ============ EJEMPLO 4: PRODUCTOS CON CALIFICACIONES ============

class ProductoConCalificacion extends Producto {
  constructor(id, nombre, precio, imagen, categoria) {
    super(id, nombre, precio, imagen, categoria);
    this.calificaciones = [];
    this.stock = 100;
  }

  /**
   * Agrega una calificación al producto
   */
  agregarCalificacion(estrella, comentario = "") {
    if (estrella < 1 || estrella > 5) {
      return { exitoso: false, mensaje: "Calificación debe ser de 1 a 5" };
    }

    this.calificaciones.push({
      estrella,
      comentario,
      fecha: new Date(),
    });

    return { exitoso: true, mensaje: "Calificación agregada" };
  }

  /**
   * Obtiene el promedio de calificaciones
   */
  promedioCalificaciones() {
    if (this.calificaciones.length === 0) return 0;
    const sum = this.calificaciones.reduce((sum, cal) => sum + cal.estrella, 0);
    return (sum / this.calificaciones.length).toFixed(1);
  }

  /**
   * Obtiene todas las calificaciones
   */
  obtenerCalificaciones() {
    return this.calificaciones;
  }

  /**
   * Verifica si hay stock disponible
   */
  hayStock(cantidad = 1) {
    return this.stock >= cantidad;
  }

  /**
   * Reduce el stock del producto
   */
  reducirStock(cantidad = 1) {
    if (this.hayStock(cantidad)) {
      this.stock -= cantidad;
      return true;
    }
    return false;
  }
}

// ============ EJEMPLO 5: BUSCADOR AVANZADO ============

class TiendaAvanzada extends Tienda {
  /**
   * Busca por múltiples criterios
   */
  buscarAvanzado(filtros) {
    let resultados = this.catalogo;

    // Filtrar por nombre
    if (filtros.nombre) {
      resultados = resultados.filter((p) =>
        p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (filtros.categoria) {
      resultados = resultados.filter((p) => p.categoria === filtros.categoria);
    }

    // Filtrar por rango de precio
    if (filtros.precioMin !== undefined) {
      resultados = resultados.filter((p) => p.precio >= filtros.precioMin);
    }

    if (filtros.precioMax !== undefined) {
      resultados = resultados.filter((p) => p.precio <= filtros.precioMax);
    }

    // Ordenar resultados
    if (filtros.ordenar === "precio_asc") {
      resultados.sort((a, b) => a.precio - b.precio);
    } else if (filtros.ordenar === "precio_desc") {
      resultados.sort((a, b) => b.precio - a.precio);
    } else if (filtros.ordenar === "nombre") {
      resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    return resultados;
  }

  /**
   * Obtiene productos en oferta
   */
  obtenerProductosEnOferta(descuentoMinimo = 0.1) {
    return this.catalogo.filter(
      (p) => p.descuento && p.descuento >= descuentoMinimo
    );
  }

  /**
   * Obtiene productos más vendidos
   */
  obtenerProductosMasVendidos(limite = 5) {
    return this.catalogo
      .sort((a, b) => (b.ventas || 0) - (a.ventas || 0))
      .slice(0, limite);
  }
}

// ============ EJEMPLO DE USO ============

/*
// Con persistencia en localStorage:
const carritoLocal = new CarritoConPersistencia();
carritoLocal.agregarProducto(producto1, 2);
// El carrito se guarda automáticamente en localStorage

// Con descuentos:
const carritoConDesc = new CarritoConDescuentos();
carritoConDesc.agregarProducto(producto1, 1);
carritoConDesc.aplicarCupon("DESCUENTO10");
console.log(carritoConDesc.calcularTotal()); // 10% menos

// Con historial:
const usuarioHistorial = new UsuarioConHistorial(1, "Laura", "laura@email.com");
usuarioHistorial.agregarAlCarrito(producto1, 1);
usuarioHistorial.realizarCompra();
console.log(usuarioHistorial.totalGastado());

// Búsqueda avanzada:
const tiendaAvanzada = new TiendaAvanzada(productosData);
const resultados = tiendaAvanzada.buscarAvanzado({
  nombre: "Tenis",
  categoria: "Calzado",
  precioMax: 300000,
  ordenar: "precio_asc"
});
*/
