/**
 * ================================================
 * GUÍA DE ESTRUCTURA DEL PROYECTO AEROFIT
 * ================================================
 * Este archivo explica la organización de cada
 * archivo y su responsabilidad específica
 * ================================================
 */

// ============ ESTRUCTURA VISUAL ============
/*

SPORTZONE/
│
├── 📄 INDEX.HTML - Estructura semántica
│   ├─ Header (navegación + carrito)
│   ├─ Hero (presentación)
│   ├─ Intro-band (3 columnas de servicios)
│   ├─ Productos (grid dinámico + filtros)
│   ├─ Beneficios (métricas)
│   ├─ Contacto (formulario)
│   ├─ Carrito (panel lateral)
│   └─ Footer
│
├── 🎨 CSS (5 archivos)
│   ├─ styles.css
│   │  └─ Variables, header, hero, footer, etc.
│   ├─ styles-producto.css
│   │  └─ Grid de productos, tarjetas, hover effects
│   ├─ styles-carrito.css
│   │  └─ Panel lateral, items, botones
│   ├─ styles-tienda.css
│   │  └─ Filtros, categorías, responsive
│   └─ (Todos son responsivos)
│
├── 📜 JAVASCRIPT (4 archivos principales)
│   ├─ Models/
│   │  ├─ Producto.js (clase básica)
│   │  ├─ Carrito.js (gestión de items)
│   │  ├─ Tienda.js (catálogo y filtros)
│   │  └─ Usuario.js (datos y compras de usuario)
│   │
│   ├─ app.js (PUNTO DE ENTRADA)
│   │  └─ Orquesta todas las clases
│   │
│   └─ extensiones.js (OPCIONALES)
│      └─ Clases extendidas con funciones avanzadas
│
├── 📚 DOCUMENTACIÓN
│   ├─ DOCUMENTACION.md (completa)
│   └─ ESTRUCTURA.js (este archivo)
│
└── 📦 ASSETS/ (imágenes)

*/

// ============ FLUJO DE INICIALIZACIÓN ============

/*

1. NAVEGADOR CARGA index.html
   └─> <script> tags al final cargan:
       1. Models/Producto.js
       2. Models/Carrito.js
       3. Models/Tienda.js
       4. Models/Usuario.js
       5. app.js (SOLO DESPUÉS QUE TODAS LAS CLASES EXISTAN)

2. app.js SE EJECUTA SOLO CUANDO EL DOM ESTÁ LISTO
   └─> DOMContentLoaded event listener

3. INICIALIZACIÓN EN ORDEN:
   ├─ Crear instancias: tienda, carrito
   ├─ Seleccionar elementos DOM
   ├─ Ejecutar: inicializarTienda()
   │  ├─ tienda.renderizarCatalogo()
   │  ├─ tienda.renderizarFiltros()
   │  └─ carrito.renderizar()
   ├─ Configurar listeners:
   │  ├─ configurarFiltros()
   │  ├─ configurarCarrito()
   │  └─ configurarFormulario()
   └─ Aplicación lista para usar

*/

// ============ RESPONSABILIDADES DE CADA CLASE ============

/*

┌─────────────────────────────────────────────────┐
│ CLASE: Producto                                 │
├─────────────────────────────────────────────────┤
│ Responsabilidad: Representar UN producto       │
│                                                  │
│ Propiedades:                                    │
│  • id (number)                                  │
│  • nombre (string)                              │
│  • precio (number)                              │
│  • imagen (emoji/URL)                          │
│  • categoria (string)                           │
│                                                  │
│ Métodos:                                        │
│  • mostrarInfo() → string                       │
│  • obtenerHTML() → string HTML                  │
│                                                  │
│ Ciclo de vida:                                  │
│  1. Se crea una instancia                       │
│  2. Se agrega al array productosData            │
│  3. Se renderiza en la tienda                   │
│  4. Se puede agregar al carrito                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ CLASE: Carrito                                  │
├─────────────────────────────────────────────────┤
│ Responsabilidad: Gestionar items del carrito   │
│                                                  │
│ Propiedades:                                    │
│  • items[] (array de {producto, cantidad})     │
│                                                  │
│ Métodos Básicos:                                │
│  • agregarProducto(prod, cant) → void          │
│  • eliminarProducto(id) → void                 │
│  • calcularTotal() → number                     │
│  • vaciarCarrito() → void                       │
│                                                  │
│ Métodos de Consulta:                            │
│  • obtenerCantidad() → number                   │
│  • obtenerItems() → array                       │
│                                                  │
│ Método de Renderizado:                          │
│  • renderizar() → actualiza DOM                 │
│                                                  │
│ Ciclo de vida:                                  │
│  1. Se crea instancia en app.js                │
│  2. Recibe productos del usuario                │
│  3. Renderiza cambios en el DOM                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ CLASE: Tienda                                   │
├─────────────────────────────────────────────────┤
│ Responsabilidad: Gestionar catálogo y filtros  │
│                                                  │
│ Propiedades:                                    │
│  • catalogo[] (todos los productos)            │
│  • categorias[] (categorías únicas)            │
│                                                  │
│ Métodos de Datos:                               │
│  • obtenerProductos() → array                   │
│  • filtrarPorCategoria(cat) → array            │
│  • buscar(termino) → array                      │
│  • obtenerProductoPorId(id) → Producto        │
│  • obtenerCategorias() → array                  │
│                                                  │
│ Métodos de Renderizado:                         │
│  • renderizarCatalogo(cat) → actualiza DOM     │
│  • renderizarFiltros() → actualiza DOM         │
│                                                  │
│ Ciclo de vida:                                  │
│  1. Se crea en app.js con array productosData  │
│  2. Se renderiza el catálogo inicial            │
│  3. Escucha eventos de filtros                 │
│  4. Re-renderiza según selección               │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ CLASE: Usuario                                  │
├─────────────────────────────────────────────────┤
│ Responsabilidad: Representar un usuario        │
│                                                  │
│ Propiedades:                                    │
│  • id (number)                                  │
│  • nombre (string)                              │
│  • email (string)                               │
│  • carrito (Carrito instance)                   │
│                                                  │
│ Métodos:                                        │
│  • obtenerInfo() → object                       │
│  • realizarCompra() → object                    │
│  • agregarAlCarrito(prod, cant) → void         │
│  • quitarDelCarrito(id) → void                 │
│                                                  │
│ Ciclo de vida:                                  │
│  1. Se crea en formulario de contacto           │
│  2. Asocia el carrito de sesión                │
│  3. Realiza compras                            │
│  4. Puede extenderse con historial             │
└─────────────────────────────────────────────────┘

*/

// ============ INTERACCIÓN ENTRE CLASES ============

/*

   USUARIO
   ├─ realiza acciones
   ├─ agrega/quita productos
   └─ realiza compra
      │
      ├──> CARRITO
      │    ├─ almacena items
      │    ├─ calcula totales
      │    └─ renderiza en DOM
      │
      └──> TIENDA
           ├─ busca productos por ID
           ├─ filtra catálogo
           └─ renderiza catálogo

   TIENDA
   ├─ contiene muchos PRODUCTOS
   ├─ renderiza catalogo
   └─ permite filtrar

   PRODUCTO (clase más básica)
   ├─ se crea con propiedades
   ├─ genera su propio HTML
   └─ se agrega a CARRITO o como referencia

   app.js
   ├─ orquesta todo
   ├─ crea instancias
   ├─ conecta eventos
   └─ coordina renderización

*/

// ============ PATRONES DE DISEÑO USADOS ============

/*

1. ENCAPSULACIÓN
   - Cada clase encapsula sus datos
   - Métodos públicos vs privados (convención con _)

2. SEPARACIÓN DE RESPONSABILIDADES
   - Producto: solo datos del producto
   - Carrito: solo lógica del carrito
   - Tienda: solo gestión del catálogo
   - Usuario: solo datos del usuario

3. INYECCIÓN DE DEPENDENCIAS
   - Tienda recibe array de Productos
   - Usuario recibe instancia de Carrito
   - app.js inyecta datos donde se necesitan

4. DELEGACIÓN DE EVENTOS
   - app.js usa event.target.closest()
   - Un listener en document para múltiples elementos

5. COMPOSICIÓN
   - Usuario tiene un Carrito
   - Carrito tiene array de Productos
   - Tienda tiene array de Productos

6. MÉTODOS TEMPLATE
   - renderizar() implementado en cada clase
   - Cada una sabe cómo dibujarse en el DOM

*/

// ============ CÓMO AGREGAR NUEVAS FUNCIONES ============

/*

OPCIÓN 1: Agregar método a clase existente
─────────────────────────────────────────────
Editar la clase en Models/X.js:

class Carrito {
  // ... métodos existentes ...
  
  // NUEVO MÉTODO
  aplicarDescuento(porcentaje) {
    // implementación
  }
}


OPCIÓN 2: Extender clase con herencia
─────────────────────────────────────────
En extensiones.js:

class CarritoConDescuentos extends Carrito {
  // Override métodos
  calcularTotal() {
    // nueva lógica
  }
}


OPCIÓN 3: Agregar método en app.js
─────────────────────────────────────
Si es lógica específica del flujo:

function hacerAlgo() {
  tienda.filtrarPorCategoria("Ropa");
  carrito.agregarProducto(producto, 1);
}


OPCIÓN 4: Crear nueva clase
─────────────────────────────
Para concepto nuevo:
1. Crear Models/MiClase.js
2. Importar en index.html
3. Usar en app.js

*/

// ============ DEBUGGING Y TESTING ============

/*

EN CONSOLA DEL NAVEGADOR:

// Acceder a instancias globales
console.log(tienda);
console.log(carrito);

// Probar métodos
tienda.buscar("Tenis");
carrito.calcularTotal();

// Verificar items
console.log(carrito.obtenerItems());

// Filtrar
tienda.filtrarPorCategoria("Ropa");

*/

// ============ OPTIMIZACIONES FUTURAS ============

/*

□ LocalStorage para persistencia
□ IndexedDB para datos grandes
□ Async/await para llamadas a API
□ Lazy loading de imágenes
□ Web Workers para cálculos pesados
□ Service Workers para offline
□ Cache de templates
□ Minificación y bundling
□ Web Components para componentes
□ Observables para reactividad
□ Patterns MVC/MVVM completos

*/

console.log("📚 ESTRUCTURA.js cargado - Revisar este archivo para entender la arquitectura");
