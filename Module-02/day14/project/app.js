const STORAGE_KEY = "addiseats";
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

const state = {
  dishes: [],
  cart: [],
  search: "",
};

// DOM Elements
const menuEl = document.querySelector("#menu");
const cartItemsEl = document.querySelector("#cart-items");
const cartTotalEl = document.querySelector("#cart-total");
const searchEl = document.querySelector("#search");
const checkoutForm = document.querySelector("#checkout");
const nameEl = document.querySelector("#name");
const phoneEl = document.querySelector("#phone");
const areaEl = document.querySelector("#area");
const errEl = document.querySelector("#form-error");
const confirmationEl = document.querySelector("#confirmation");

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
  renderMenu();
  renderCart();
}

function renderMenu() {
  const term = state.search.toLowerCase();
  const shown = state.dishes.filter((d) =>
    d?.name?.toLowerCase().includes(term),
  );

  if (shown.length === 0) {
    menuEl.innerHTML = "<p>No dishes found.</p>";
    return;
  }

  menuEl.innerHTML = shown
    .map(
      (d) => `
        <article class="dish" data-id="${d.id}">
            <div>
                <h3>${d.name}</h3>
                <p class="price">${d.price ?? 0} ETB</p>
            </div>
            <button class="add">Add</button>
        </article>
    `,
    )
    .join("");
}

function renderCart() {
  // Guard clause for empty cart
  if (state.cart.length === 0) {
    cartItemsEl.innerHTML = "<li>Your cart is empty</li>";
    cartTotalEl.textContent = "0";
    return;
  }

  cartItemsEl.innerHTML = state.cart
    .map(
      (i) => `
        <li data-id="${i.id}">
            <span>${i.name} (${i.qty})</span>
            <span>${(i.price ?? 0) * i.qty} ETB <button class="rm">X</button></span>
        </li>
    `,
    )
    .join("");

  const total = state.cart.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0);
  cartTotalEl.textContent = total;
}

function validate({ name, phone }) {
  if (!name.trim()) return "Please enter your name.";
  if (!PHONE_REGEX.test(phone))
    return "Enter a valid Ethiopian phone (e.g. 09xxxxxxxx).";
  if (state.cart.length === 0) return "Your cart is empty.";
  return "";
}

function placeOrder(formData) {
  const order = {
    ...formData,
    items: [...state.cart],
    total: state.cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    placedAt: new Date().toISOString(),
  };

  console.log("Order placed:", order);

  // Clear state & persist
  state.cart = [];
  save();
  render();

  confirmationEl.className = "success-msg";
  confirmationEl.textContent = `Order placed successfully! Total: ${order.total} ETB, delivering to ${order.area}.`;
  checkoutForm.reset();
}

// --- Persistence ---
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function load() {
  const s = localStorage.getItem(STORAGE_KEY);
  if (s) {
    try {
      state.cart = JSON.parse(s);
    } catch (e) {
      state.cart = [];
    }
  }
}

searchEl.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderMenu();
});

menuEl.addEventListener("click", (e) => {
  if (!e.target.matches(".add")) return;
  const card = e.target.closest(".dish");
  if (!card) return;

  const id = Number(card.dataset.id);
  const dish = state.dishes.find((d) => d.id === id);
  if (!dish) return;

  const line = state.cart.find((i) => i.id === id);
  if (line) {
    line.qty++;
  } else {
    state.cart.push({ ...dish, qty: 1 });
  }

  confirmationEl.className = "hidden"; // Hide previous success msg on action
  save();
  renderCart();
});

cartItemsEl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);
  state.cart = state.cart.filter((i) => i.id !== id);

  save();
  renderCart();
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  confirmationEl.className = "hidden";

  const formData = {
    name: nameEl.value,
    phone: phoneEl.value,
    area: areaEl.value,
  };

  const errorMessage = validate(formData);
  errEl.textContent = errorMessage;

  if (errorMessage) return;

  placeOrder(formData);
});

function init() {
  load();
  loadMenu();
}

init();
