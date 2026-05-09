/**
 * Clase Factura
 * Gestiona la generación y visualización de facturas de compra
 */
class Factura {
  constructor(usuario, carrito) {
    this.numero = this.generarNumero();
    this.fecha = new Date();
    this.usuario = usuario;
    this.carrito = carrito;
    this.items = carrito.obtenerItems();
    this.total = carrito.calcularTotal();
    this.subtotal = this.total;
    this.iva = Math.round(this.total * 0.19); // IVA 19%
    this.totalConIVA = this.total + this.iva;
    this.estado = "pendiente";
    this.metodosPago = ["Tarjeta de Crédito", "Transferencia Bancaria", "PSE"];
  }

  /**
   * Genera un número de factura único
   */
  generarNumero() {
    return "FAC-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }

  /**
   * Formatea la fecha
   */
  formatearFecha(fecha = this.fecha) {
    return fecha.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /**
   * Obtiene HTML de la factura
   */
  obtenerHTML() {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

    const itemsHTML = this.items
      .map(
        (item) => `
        <tr>
          <td class="factura-item-nombre">${item.producto.nombre}</td>
          <td class="factura-item-cat">${item.producto.categoria}</td>
          <td class="factura-item-qty">${item.cantidad}</td>
          <td class="factura-item-precio">${formatter.format(item.producto.precio)}</td>
          <td class="factura-item-total">${formatter.format(item.producto.precio * item.cantidad)}</td>
        </tr>
      `
      )
      .join("");

    return `
      <div class="factura-container">
        <div class="factura-header">
          <div class="factura-logo">
            <span class="brand-mark-factura">AF</span>
            <h1>AeroFit</h1>
          </div>
          <div class="factura-titulo">
            <h2>FACTURA DE VENTA</h2>
            <p class="factura-numero">Factura: <strong>${this.numero}</strong></p>
            <p class="factura-fecha">Fecha: ${this.formatearFecha()}</p>
          </div>
        </div>

        <div class="factura-info">
          <div class="factura-cliente">
            <h3>Información del Cliente</h3>
            <p><strong>Nombre:</strong> ${this.usuario.nombre}</p>
            <p><strong>Email:</strong> ${this.usuario.email}</p>
            <p><strong>ID:</strong> ${this.usuario.id}</p>
          </div>
          <div class="factura-empresa">
            <h3>AeroFit S.A.S</h3>
            <p>NIT: 900.123.456-7</p>
            <p>Dirección: Calle 123 #45-67</p>
            <p>Teléfono: +57 1 2345678</p>
            <p>Email: ventas@aerofit.com</p>
          </div>
        </div>

        <table class="factura-items">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="factura-totales">
          <div class="factura-fila">
            <span>Subtotal:</span>
            <span>${formatter.format(this.subtotal)}</span>
          </div>
          <div class="factura-fila">
            <span>IVA (19%):</span>
            <span>${formatter.format(this.iva)}</span>
          </div>
          <div class="factura-fila-total">
            <span>TOTAL A PAGAR:</span>
            <span>${formatter.format(this.totalConIVA)}</span>
          </div>
        </div>

        <div class="factura-notas">
          <h3>Notas Importantes</h3>
          <ul>
            <li>Conserve esta factura como comprobante de compra</li>
            <li>La garantía de los productos es de 12 meses desde la fecha de compra</li>
            <li>Para cambios o devoluciones, consulte nuestras políticas</li>
            <li>Gracias por su compra en AeroFit</li>
          </ul>
        </div>

        <div class="factura-pie">
          <p>Esta es una factura electrónica válida - AeroFit © 2024</p>
        </div>
      </div>
    `;
  }

  /**
   * Obtiene solo el HTML de la tabla de items para actualizar dinámicamente
   */
  obtenerHTMLItems() {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

    return this.items
      .map(
        (item) => `
        <tr>
          <td class="factura-item-nombre">${item.producto.nombre}</td>
          <td class="factura-item-cat">${item.producto.categoria}</td>
          <td class="factura-item-qty">${item.cantidad}</td>
          <td class="factura-item-precio">${formatter.format(item.producto.precio)}</td>
          <td class="factura-item-total">${formatter.format(item.producto.precio * item.cantidad)}</td>
        </tr>
      `
      )
      .join("");
  }

  /**
   * Procesa el pago de la factura
   */
  procesarPago(metodoPago) {
    if (!this.metodosPago.includes(metodoPago)) {
      return {
        exitoso: false,
        mensaje: "Método de pago no válido",
      };
    }

    this.estado = "pagada";
    return {
      exitoso: true,
      mensaje: `Pago procesado exitosamente por ${metodoPago}`,
      numeroFactura: this.numero,
    };
  }

  /**
   * Descarga la factura como PDF (simulado - en producción usar librería PDF)
   */
  descargar() {
    const contenido = document.querySelector(".factura-container");
    if (!contenido) {
      console.error("Factura no encontrada en el DOM");
      return;
    }

    // Aquí iría la lógica de descarga real usando librería como jsPDF
    console.log("📥 Descargando factura:", this.numero);
    alert(
      `Factura ${this.numero} descargada.\n\nNota: En producción se descargaría un PDF real.`
    );
  }

  /**
   * Envía la factura por email (simulado)
   */
  enviarEmail() {
    console.log(`📧 Enviando factura ${this.numero} a ${this.usuario.email}`);
    return {
      exitoso: true,
      mensaje: `Factura enviada a ${this.usuario.email}`,
    };
  }

  /**
   * Obtiene el estado de la factura
   */
  obtenerEstado() {
    return {
      numero: this.numero,
      estado: this.estado,
      total: this.totalConIVA,
      cliente: this.usuario.nombre,
      fecha: this.formatearFecha(),
    };
  }
}
