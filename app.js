const products = [
  {
    name: "Camiseta Dry Move",
    category: "Ropa",
    price: 79900,
    accent: "#00a8a8",
    code: "DM",
  },
  {
    name: "Legging Power Flex",
    category: "Ropa",
    price: 119900,
    accent: "#ff6b5f",
    code: "PF",
  },
  {
    name: "Tenis Sprint X",
    category: "Calzado",
    price: 249900,
    accent: "#b7ff2a",
    code: "SX",
  },
  {
    name: "Chaqueta Wind Pro",
    category: "Ropa",
    price: 169900,
    accent: "#3b82f6",
    code: "WP",
  },
  {
    name: "Maleta Gym Core",
    category: "Accesorios",
    price: 99900,
    accent: "#f59e0b",
    code: "GC",
  },
  {
    name: "Termo Active 750",
    category: "Accesorios",
    price: 49900,
    accent: "#14b8a6",
    code: "AT",
  },
  {
    name: "Top Soporte Alto",
    category: "Ropa",
    price: 89900,
    accent: "#ec4899",
    code: "SA",
  },
  {
    name: "Tenis Trail Grip",
    category: "Calzado",
    price: 279900,
    accent: "#84cc16",
    code: "TG",
  },
];

const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const productGrid = document.querySelector("#productGrid");
const cartPanel = document.querySelector("#cartPanel");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const filters = document.querySelectorAll(".filter");
const cart = [];

function renderProducts(category = "Todos") {
  const visibleProducts =
    category === "Todos"
      ? products
      : products.filter((product) => product.category === category);

  productGrid.innerHTML = visibleProducts
    .map(
      (product, index) => `
        <article class="product-card">
          <div class="product-visual" style="--accent: ${product.accent}">
            <span>${product.code}</span>
          </div>
          <div class="product-info">
            <div class="product-top">
              <div>
                <h3>${product.name}</h3>
                <span class="category">${product.category}</span>
              </div>
              <strong class="price">${formatter.format(product.price)}</strong>
            </div>
            <button class="button add-to-cart" type="button" data-index="${products.indexOf(product)}">
              Agregar al carrito
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCart() {
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  cartCount.textContent = cart.length;
  cartTotal.textContent = formatter.format(total);
  cartItems.innerHTML = cart.length
    ? cart
        .map(
          (product, index) => `
            <article class="cart-line">
              <div>
                <strong>${product.name}</strong>
                <small>${product.category}</small>
              </div>
              <span>${formatter.format(product.price)}</span>
              <button class="close-cart" type="button" data-remove="${index}">Quitar</button>
            </article>
          `
        )
        .join("")
    : "<p>Tu carrito esta vacio.</p>";
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.category);
  });
});

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-to-cart");
  if (!addButton) return;
  cart.push(products[Number(addButton.dataset.index)]);
  renderCart();
  cartPanel.classList.add("open");
});

cartItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove]");
  if (!removeButton) return;
  cart.splice(Number(removeButton.dataset.remove), 1);
  renderCart();
});

document.querySelector(".cart-toggle").addEventListener("click", () => {
  cartPanel.classList.add("open");
});

document.querySelector(".close-cart").addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  alert("Solicitud enviada. Pronto recibiras una recomendacion de talla.");
});

renderProducts();
renderCart();
