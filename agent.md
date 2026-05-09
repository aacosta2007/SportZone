# 📋 Instrucciones del Proyecto AeroFit

## Reglas de Programación Obligatorias

### 1. Programación Orientada a Objetos (POO)
- ✅ **Usa solo POO** - Todo debe estar dentro de clases
- ✅ **Una clase por archivo** en la carpeta `Models/`
- ✅ Cada clase debe tener propiedades y métodos definidos
- ✅ No uses variables globales (excepto instancias de clases)
- ❌ **No uses** funciones sueltas sin clase

### 2. Variables y Declaración
- ✅ **Usa `const`** para valores que no cambian
- ✅ **Usa `let`** para variables que sí cambian
- ❌ **Nunca uses `var`** - Es obsoleto

### 3. Selección y Manipulación del DOM
- ✅ **Usa `document.querySelector()`** para seleccionar elementos
- ✅ **Usa `document.querySelectorAll()`** para múltiples elementos
- ✅ **Usa `addEventListener()`** para manejar eventos
- ✅ **Implementa Event Delegation** - Un listener en document para múltiples elementos
- ❌ **No uses** métodos deprecated como `document.getElementsById()`

### 4. Creación de Elementos Dinámicos
- ✅ **Genera todo desde JavaScript** - El HTML solo contiene estructura base
- ✅ **Usa `innerHTML` o `createElement()`** para crear elementos
- ✅ Cada clase tiene un método `obtenerHTML()` o `renderizar()`
- ❌ **No hardcodees** elementos de productos o items en HTML

### 5. Métodos Requeridos por Clase

#### Clase Producto
```javascript
constructor(id, nombre, precio, imagen, categoria)
mostrarInfo()
obtenerHTML()
```

#### Clase Carrito
```javascript
agregarProducto(producto, cantidad)
eliminarProducto(id)
calcularTotal()
vaciarCarrito()
renderizar()
obtenerCantidad()
obtenerItems()
```

#### Clase Tienda
```javascript
filtrarPorCategoria(categoria)
buscar(termino)
obtenerProductoPorId(id)
renderizarCatalogo(categoria)
renderizarFiltros()
```

#### Clase Usuario
```javascript
realizarCompra()
agregarAlCarrito(producto, cantidad)
quitarDelCarrito(id)
```

#### Clase Factura
```javascript
obtenerHTML()
procesarPago(metodoPago)
descargar()
enviarEmail()
```

### 6. Estilos CSS
- ✅ **CSS separado por componente** - Un archivo por clase
- ✅ **Usa Flexbox o Grid** para layouts
- ✅ **Responsive first** - Media queries para mobile/tablet/desktop
- ✅ **Variables CSS** (--ink, --lime, --teal, etc.)
- ✅ Propiedades como `--accent` para personalización dinámica

### 7. Estructura de Carpetas
```
SportZone/
├── index.html
├── app.js (orquestación)
├── styles.css (global)
├── styles-[componente].css (por componente)
├── Models/
│   ├── Producto.js
│   ├── Carrito.js
│   ├── Tienda.js
│   ├── Usuario.js
│   └── Factura.js
├── DOCUMENTACION.md
└── extensiones.js (opcional)
```

### 8. Event Delegation
- ✅ **Un listener en `document`** para múltiples elementos
- ✅ **Usa `event.target.closest()`** para encontrar el elemento clickeado
- ✅ Ejemplo:
```javascript
document.addEventListener("click", (event) => {
  const btn = event.target.closest(".add-to-cart");
  if (!btn) return;
  // Tu lógica aquí
});
```

### 9. Nombres y Convenciones
- ✅ **Clases en CamelCase mayúscula**: `Producto`, `Carrito`, `Factura`
- ✅ **Métodos en camelCase minúscula**: `agregarProducto()`, `renderizar()`
- ✅ **Constantes en UPPER_SNAKE_CASE**: `MAX_ITEMS`, `TAX_RATE`
- ✅ **Data attributes en kebab-case**: `data-product-id`, `data-category`

### 10. Comentarios y Documentación
- ✅ **Comenta cada método** con descripción
- ✅ **Usa JSDoc** para parámetros y retornos:
```javascript
/**
 * Agrega un producto al carrito
 * @param {Producto} producto - El producto a agregar
 * @param {number} cantidad - Cantidad (por defecto 1)
 * @returns {void}
 */
agregarProducto(producto, cantidad = 1) { }
```
- ✅ Agrupa código con comentarios de sección

### 11. Flujo de Datos
- ✅ **Unidireccional** - Datos fluyen de arriba hacia abajo
- ✅ **app.js orquesta todo** - Crea instancias y configura eventos
- ✅ **Las clases no se conocen entre sí** - Solo se comunican a través de app.js

### 12. Sin Dependencias Externas
- ✅ **Solo JavaScript vanilla** - Sin librerías externas
- ✅ Usa `Intl.NumberFormat` para formateo de moneda
- ✅ Usa `Date()` nativo para fechas

### 13. Accesibilidad
- ✅ **Usa atributos `aria-*`** en HTML
- ✅ **Labels descriptivos** en botones
- ✅ **Estructura semántica** con `<section>`, `<article>`, `<aside>`

### 14. Encapsulación
- ✅ **Propiedades privadas** con `_` (por convención)
- ✅ **Métodos públicos** sin prefijo
- ✅ **No accedas** directamente a propiedades desde fuera

### 15. Validación
- ✅ **Valida entrada** en métodos
- ✅ **Retorna objetos** con `{exitoso, mensaje}`
- ✅ **Usa alerts/console.log** para feedback al usuario

---

## ✅ Checklist de Calidad

Antes de hacer commits, verifica:

- [ ] ¿Todas las clases están en `Models/`?
- [ ] ¿Cada clase tiene sus métodos requeridos?
- [ ] ¿Se usa `const` y `let` (nunca `var`)?
- [ ] ¿No hay funciones sueltas?
- [ ] ¿El CSS está separado por componente?
- [ ] ¿La interfaz es responsive?
- [ ] ¿Se implementó Event Delegation?
- [ ] ¿Hay comentarios JSDoc en métodos?
- [ ] ¿Sin librerías externas?
- [ ] ¿El código es mantenible?

---

## 🎯 Ejemplos de Lo Correcto

### ✅ CORRECTO - POO
```javascript
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
  
  obtenerHTML() {
    return `<div>${this.nombre}</div>`;
  }
}
```

### ❌ INCORRECTO - Funciones sueltas
```javascript
function crearProducto(id, nombre) {
  // Esto NO se permite
}
```

### ✅ CORRECTO - Event Delegation
```javascript
document.addEventListener("click", (event) => {
  const btn = event.target.closest(".add-to-cart");
  if (!btn) return;
  const id = btn.dataset.id;
});
```

### ❌ INCORRECTO - Listeners individuales
```javascript
const botones = document.querySelectorAll(".add-to-cart");
botones.forEach(btn => {
  btn.addEventListener("click", () => {
    // Demasiados listeners
  });
});
```

### ✅ CORRECTO - Separación CSS
```
styles.css - Globales
styles-producto.css - Componente Producto
styles-carrito.css - Componente Carrito
```

### ❌ INCORRECTO - Todo en un archivo
```
styles.css - TODO mezclado (no permitido)
```

---

## 📝 Notas Importantes

1. **Cada cambio** debe respetar estas reglas
2. **Mantén la coherencia** con el código existente
3. **Prueba la funcionalidad** en el navegador
4. **Responsive first** - Mobile debe funcionar perfectamente
5. **Sin hardcoding** - Todo dinámico desde JavaScript

---

*Última actualización: Mayo 2026*
*Proyecto: AeroFit - Tienda Virtual de Ropa Deportiva*
