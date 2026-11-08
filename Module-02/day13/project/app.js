const state = {
  dishes: [],
  cart: [],
  search: "",
};

const menuEl = document.querySelector("#menu");
const cartItemsEl = document.querySelector("#cart-items");
const cartTotalEl = document.querySelector("#cart-total");
const searchEl = document.querySelector("#search");

async function loadMenu() {
  menuEl.textContent = "Loading menu...";
  try {
    const res = await fetch("./menu.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    state.dishes = await res.json();
    render();
  } catch (err) {
    menuEl.textContent = "Could not load the menu.";
  }
}

function render() {
  const term = state.search.toLowerCase();
  const shown = state.dishes.filter((d) => d.name.toLowerCase().includes(term));

  if (shown.length === 0) {
    menuEl.innerHTML = "<p>No dishes found.</p>";
  } else {
    menuEl.innerHTML = shown
      .map(
        (d) => `
            <article class="dish" data-id="${d.id}">
                <div>
                    <h3>${d.name}</h3>
                    <p class="price">${d.price} ETB</p>
                </div>
                <button class="add">Add</button>
            </article>
        `,
      )
      .join("");
  }

  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = state.cart
    .map(
      (i) => `
        <li data-id="${i.id}">
            <span>${i.name} (${i.qty})</span>
            <span>${i.price * i.qty} ETB <button class="rm">X</button></span>
        </li>
    `,
    )
    .join("");

  const total = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartTotalEl.textContent = total;
}

searchEl.addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

menuEl.addEventListener("click", (e) => {
  if (!e.target.matches(".add")) return;
  const id = Number(e.target.closest(".dish").dataset.id);
  const dish = state.dishes.find((d) => d.id === id);
  const line = state.cart.find((i) => i.id === id);

  if (line) {
    line.qty++;
  } else {
    state.cart.push({ ...dish, qty: 1 });
  }

  save();
  renderCart();
});

cartItemsEl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const id = Number(e.target.closest("li").dataset.id);
  state.cart = state.cart.filter((i) => i.id !== id);

  save();
  renderCart();
});

function save() {
  localStorage.setItem("addiseats", JSON.stringify(state.cart));
}

function load() {
  const s = localStorage.getItem("addiseats");
  if (s) state.cart = JSON.parse(s);
}

function init() {
  load();
  loadMenu();
}

init();
