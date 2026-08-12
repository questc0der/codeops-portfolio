let items = [];

const form = document.querySelector("#add-form");
const input = document.querySelector("#name");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

function render() {
  list.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("li");
    row.dataset.id = item.id;
    row.classList.toggle("done", item.done);
    row.textContent = item.name;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "del";
    removeBtn.textContent = "Remove";

    row.appendChild(removeBtn);
    list.appendChild(row);
  });

  count.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value.trim();
  if (!value) return;

  items.push({
    id: Date.now() + Math.random(),
    name: value,
    done: false,
  });

  input.value = "";
  render();
});

list.addEventListener("click", (event) => {
  const row = event.target.closest("li");
  if (!row) return;

  const id = Number(row.dataset.id);

  if (event.target.closest(".del")) {
    items = items.filter((item) => item.id !== id);
    render();
    return;
  }

  const item = items.find((entry) => entry.id === id);
  if (!item) return;

  item.done = !item.done;
  render();
});

render();
