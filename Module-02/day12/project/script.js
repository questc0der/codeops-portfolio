const STORAGE_KEY = "etb_currency_app_state";

const state = {
  rates: {},
  watchlist: [],
  amount: 100,
  selectedCurrency: "USD",
};

const statusBox = document.getElementById("status");
const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const resultBox = document.getElementById("result");
const watchlistSelect = document.getElementById("watchlist-select");
const watchlistList = document.getElementById("watchlist-list");
const addWatchlistButton = document.getElementById("add-watchlist-btn");

function loadSavedState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return;
  }

  try {
    const data = JSON.parse(saved);

    if (Array.isArray(data.watchlist)) {
      state.watchlist = data.watchlist;
    }

    if (data.amount !== undefined && data.amount !== null) {
      state.amount = Number(data.amount);
    }

    if (data.selectedCurrency) {
      state.selectedCurrency = data.selectedCurrency;
    }
  } catch (error) {
    console.log("Could not read saved app state:", error);
  }
}

function saveState() {
  const data = {
    watchlist: state.watchlist,
    amount: state.amount,
    selectedCurrency: state.selectedCurrency,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function updateStatus(message, type = "info") {
  statusBox.textContent = message;
  statusBox.className = "mb-4 rounded-md px-3 py-2 text-sm";

  if (type === "success") {
    statusBox.classList.add("bg-emerald-50", "text-emerald-700");
  } else if (type === "error") {
    statusBox.classList.add("bg-red-50", "text-red-700");
  } else {
    statusBox.classList.add("bg-blue-50", "text-blue-700");
  }
}

function formatNumber(value) {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function renderCurrencyOptions() {
  const currencyCodes = Object.keys(state.rates).sort();

  if (!currencyCodes.length) {
    return;
  }

  const defaultCode = currencyCodes.includes(state.selectedCurrency)
    ? state.selectedCurrency
    : currencyCodes[0];

  state.selectedCurrency = defaultCode;

  currencySelect.innerHTML = currencyCodes
    .map(
      (code) =>
        `<option value="${code}" ${code === defaultCode ? "selected" : ""}>${code}</option>`,
    )
    .join("");

  watchlistSelect.innerHTML = currencyCodes
    .filter((code) => !state.watchlist.includes(code))
    .map((code) => `<option value="${code}">${code}</option>`)
    .join("");

  if (!watchlistSelect.innerHTML) {
    watchlistSelect.innerHTML = '<option value="">No more currencies</option>';
  }
}

function renderResult() {
  const amount = Number(amountInput.value);

  if (!state.rates || !state.rates[state.selectedCurrency]) {
    resultBox.textContent = "Please wait for the rate list to load.";
    return;
  }

  if (Number.isNaN(amount) || amount < 0) {
    resultBox.textContent = "Please enter a valid amount.";
    return;
  }

  const rate = state.rates[state.selectedCurrency];
  const converted = amount * rate;

  resultBox.textContent = `${formatNumber(amount)} ETB = ${formatNumber(
    converted,
  )} ${state.selectedCurrency}`;
}

function renderWatchlist() {
  if (!state.watchlist.length) {
    watchlistList.innerHTML =
      '<li class="rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500">No currencies added yet.</li>';
    renderCurrencyOptions();
    return;
  }

  watchlistList.innerHTML = state.watchlist
    .map((code) => {
      const rate = state.rates[code];
      const value = rate ? state.amount * rate : "N/A";

      return `
        <li class="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <span class="font-semibold">${code}</span>
          <span>${typeof value === "number" ? formatNumber(value) : value}</span>
          <button class="rounded bg-red-500 px-2 py-1 text-xs text-white" type="button" data-code="${code}">Remove</button>
        </li>
      `;
    })
    .join("");

  renderCurrencyOptions();
}

async function fetchRates() {
  updateStatus("Loading live ETB rates...", "info");

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/ETB");

    if (!response.ok) {
      throw new Error("Request failed.");
    }

    const data = await response.json();

    if (!data.rates || Object.keys(data.rates).length === 0) {
      throw new Error("No rate data available.");
    }

    state.rates = data.rates;
    state.rates.ETB = 1;

    if (!state.rates[state.selectedCurrency]) {
      state.selectedCurrency = Object.keys(state.rates)[0];
    }

    renderCurrencyOptions();
    renderWatchlist();
    renderResult();
    updateStatus("Live rates loaded successfully.", "success");
  } catch (error) {
    console.log(error);
    updateStatus("Could not load live rates. Please try again later.", "error");
    resultBox.textContent = "Unable to load exchange rates.";
  }
}

function addCurrencyToWatchlist() {
  const code = watchlistSelect.value;

  if (!code) {
    updateStatus("Choose a currency to add to the watchlist.", "error");
    return;
  }

  if (state.watchlist.includes(code)) {
    updateStatus(`${code} is already in your watchlist.`, "error");
    return;
  }

  state.watchlist.push(code);
  saveState();
  renderWatchlist();
  updateStatus(`${code} added to your watchlist.`, "success");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amountValue = Number(amountInput.value);

  if (Number.isNaN(amountValue) || amountValue < 0) {
    updateStatus("Please enter a valid amount.", "error");
    resultBox.textContent = "Enter a correct value first.";
    return;
  }

  state.amount = amountValue;
  saveState();

  state.selectedCurrency = currencySelect.value;
  saveState();

  renderResult();
  renderWatchlist();
  updateStatus("Conversion complete.", "success");
});

currencySelect.addEventListener("change", (event) => {
  state.selectedCurrency = event.target.value;
  saveState();
  renderResult();
});

addWatchlistButton.addEventListener("click", addCurrencyToWatchlist);

watchlistList.addEventListener("click", (event) => {
  const button = event.target.closest(".remove-btn");

  if (!button) {
    return;
  }

  const code = button.dataset.code;
  state.watchlist = state.watchlist.filter((item) => item !== code);
  saveState();
  renderWatchlist();
  updateStatus(`${code} removed from your watchlist.`, "success");
});

amountInput.addEventListener("input", () => {
  state.amount = Number(amountInput.value) || 0;
  saveState();
  renderResult();
  renderWatchlist();
});

loadSavedState();
amountInput.value = state.amount;
state.selectedCurrency = state.selectedCurrency || "USD";
renderResult();
fetchRates();
renderWatchlist();
