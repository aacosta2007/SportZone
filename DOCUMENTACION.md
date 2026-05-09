# 🏋️ SportZone - Tienda Virtual de Ropa Deportiva

## Descripción
SportZone es una tienda virtual de ropa deportiva construida con **Programación Orientada a Objetos (POO)** en JavaScript vanilla. El proyecto implementa clases bien estructuradas, separación de responsabilidades y una interfaz responsive.

---

## 📁 Estructura del Proyecto

```
SportZone/
├── 📄 index.html              # Estructura HTML principal
├── 📄 app.js                  # Archivo de orquestación (main)
├── 📄 styles.css              # Estilos globales
├── 📄 styles-producto.css     # Estilos del componente Producto
├── 📄 styles-carrito.css      # Estilos del componente Carrito
├── 📄 styles-tienda.css       # Estilos del componente Tienda
├── 📁 assets/                 # Imágenes y recursos
└── 📁 Models/                 # Clases POO
    ├── Producto.js            # Clase Producto
    ├── Carrito.js             # Clase Carrito
    ├── Tienda.js              # Clase Tienda
    └── Usuario.js             # Clase Usuario
```

---

## 🏗️ Arquitectura de Clases

### 1️⃣ **Clase Producto**
Representa un producto individual en la tienda.

**Propiedades:**
- `id` - Identificador único
- `nombre` - Nombre del producto
- `precio` - Precio en COP
- `imagen` - Emoji o URL del producto
- `categoria` - Categoría (Ropa, Calzado, Accesorios)

**Métodos:**
- `mostrarInfo()` - Retorna información formateada
- `obtenerHTML()` - Genera el HTML de la tarjeta del producto

**Ejemplo:**
```javascript
const camiseta = new Producto(1, "Camiseta Dry Move", 79900, "👕", "Ropa");
console.log(camiseta.mostrarInfo());
```

---

### 2️⃣ **Clase Carrito**
Gestiona los productos agregados y cálculos del carrito.

**Propiedades:**
- `items` - Array de items con producto y cantidad

**Métodos Principales:**
- `agregarProducto(producto, cantidad)` - Agrega o incrementa cantidad
- `eliminarProducto(productoId)` - Elimina un producto por ID
- `calcularTotal()` - Retorna el total en pesos
- `vaciarCarrito()` - Limpia todos los items
- `obtenerCantidad()` - Retorna número de items
- `obtenerItems()` - Retorna array de items
- `renderizar()` - Actualiza el DOM del carrito

**Ejemplo:**
```javascript
const carrito = new Carrito();
carrito.agregarProducto(camiseta, 2);
console.log(carrito.calcularTotal()); // 159800
carrito.renderizar(); // Actualiza el DOM
```

---

### 3️⃣ **Clase Tienda**
Gestiona el catálogo de productos, filtros y búsqueda.

**Propiedades:**
- `catalogo` - Array de todos los productos
- `categorias` - Array único de categorías

**Métodos Principales:**
- `obtenerProductos()` - Retorna todos los productos
- `filtrarPorCategoria(categoria)` - Filtra por categoría
- `buscar(termino)` - Busca productos por nombre
- `obtenerProductoPorId(id)` - Obtiene un producto específico
- `obtenerCategorias()` - Retorna las categorías disponibles
- `renderizarCatalogo(categoria)` - Renderiza el catálogo en el DOM
- `renderizarFiltros()` - Renderiza los botones de filtro

**Ejemplo:**
```javascript
const tienda = new Tienda(productosArray);
tienda.renderizarCatalogo("Todos");
tienda.renderizarFiltros();

const ropaFitness = tienda.filtrarPorCategoria("Ropa");
const resultados = tienda.buscar("Nike");
```

---

### 4️⃣ **Clase Usuario**
Representa un usuario de la tienda.

**Propiedades:**
- `id` - ID del usuario
- `nombre` - Nombre completo
- `email` - Correo electrónico
- `carrito` - Instancia de Carrito

**Métodos:**
- `obtenerInfo()` - Retorna información del usuario
- `realizarCompra()` - Procesa la compra y vacía carrito
- `agregarAlCarrito(producto, cantidad)` - Agrega al carrito del usuario
- `quitarDelCarrito(productoId)` - Elimina del carrito

**Ejemplo:**
```javascript
const usuario = new Usuario(1, "Laura Gómez", "laura@email.com");
usuario.agregarAlCarrito(camiseta, 1);
const compra = usuario.realizarCompra();
```

---

## 🎯 Flujo de la Aplicación

```
1. DOMContentLoaded
   ↓
2. inicializarTienda()
   ├─ tienda.renderizarCatalogo("Todos")
   ├─ tienda.renderizarFiltros()
   └─ carrito.renderizar()
   ↓
3. configurarFiltros()
   → Escucha clics en botones de filtro
   ↓
4. configurarCarrito()
   ├─ Agregar al carrito
   ├─ Eliminar del carrito
   ├─ Abrir carrito
   └─ Cerrar carrito
   ↓
5. configurarFormulario()
   → Maneja la solicitud de asesoría
```

---

## 🎨 Componentes CSS Separados

### `styles.css`
Estilos globales del sitio (variables, header, hero, footer, etc.)

### `styles-producto.css`
Estilos específicos de las tarjetas de producto
- Grid responsivo
- Efectos hover
- Animaciones

### `styles-carrito.css`
Estilos del panel del carrito
- Panel deslizable
- Items del carrito
- Botones de acción

### `styles-tienda.css`
Estilos de filtros y búsqueda
- Botones de filtro activos/inactivos
- Responsive para mobile

---

## 📱 Características

✅ **POO Completa** - Clases bien estructuradas con métodos y propiedades  
✅ **Separación de Responsabilidades** - Cada clase tiene una función clara  
✅ **DOM Dinámico** - Elementos creados desde JavaScript  
✅ **Event Listeners** - Manejo de eventos con delegación  
✅ **Responsive Design** - Funciona en desktop, tablet y mobile  
✅ **LocalStorage Ready** - Estructura preparada para guardar datos  
✅ **Documentación** - Comentarios claros en el código  

---

## 🚀 Cómo Usar

### 1. Agregar productos al catálogo
```javascript
const nuevoProducto = new Producto(
  9,
  "Zapatilla Running Pro",
  299900,
  "👟",
  "Calzado"
);
productosData.push(nuevoProducto);
tienda = new Tienda(productosData);
tienda.renderizarCatalogo();
```

### 2. Acceder al carrito de un usuario
```javascript
const usuario = new Usuario(1, "Juan", "juan@email.com");
usuario.agregarAlCarrito(productosData[0], 2);
console.log(usuario.carrito.calcularTotal());
```

### 3. Filtrar productos
```javascript
const calzado = tienda.filtrarPorCategoria("Calzado");
console.log(calzado); // Array de productos
```

### 4. Buscar productos
```javascript
const resultados = tienda.buscar("Tenis");
console.log(resultados); // Array de productos encontrados
```

---

## 📋 Requisitos Técnicos Cumplidos

✅ **1. Programación Orientada a Objetos**
- ✓ Clase Producto con propiedades: id, nombre, precio, imagen, categoria
- ✓ Clase Carrito con métodos: agregarProducto(), eliminarProducto(), calcularTotal(), vaciarCarrito(), renderizar()
- ✓ Clase Tienda para manejar catálogo y filtros
- ✓ Clase Usuario opcional pero implementada

✅ **2. Selección del DOM**
- ✓ document.querySelector() / getElementById()
- ✓ addEventListener en múltiples elementos

✅ **3. Creación de Elementos Dinámicos**
- ✓ Catálogo generado desde JavaScript
- ✓ Cada producto tiene botón "Agregar al carrito"
- ✓ Carrito muestra productos de forma dinámica

✅ **4. Eventos**
- ✓ Clic en "Agregar" → actualiza carrito y total
- ✓ Clic en "Eliminar" → quita producto del carrito
- ✓ Botón "Vaciar carrito" → limpia items
- ✓ Filtros por categoría implementados

✅ **5. Estilos CSS**
- ✓ Interfaz responsive (Flexbox + Grid)
- ✓ Estilos separados por componente
- ✓ Efectos hover y transiciones
- ✓ Variables CSS para temas

---

## 🔧 Extensiones Posibles

- 📦 Guardar carrito en localStorage
- 🔐 Sistema de autenticación
- 💳 Integración con pasarela de pago
- 📊 Panel de administración
- ⭐ Sistema de reseñas y calificaciones
- 📈 Análisis de compras
- 🛒 Persistencia de datos en backend

---

## 📝 Notas

- El proyecto usa emojis como imágenes de productos (fácil de cambiar a URLs reales)
- Todos los precios están en COP (Pesos Colombianos)
- El formato es completamente responsive
- Se pueden agregar más productos sin modificar HTML

---

## 📧 Contacto / Soporte

Para preguntas o sugerencias sobre el proyecto, revisa los comentarios en el código fuente.

---

**Versión:** 1.0  
**Última actualización:** 2024  
**Autor:** Equipo de Desarrollo  
**Licencia:** MIT
