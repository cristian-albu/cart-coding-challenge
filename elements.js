export function buildCardListElement() {
  const list = document.createElement("div");
  list.classList.add("list");

  return list;
}

export function buildCardElement(product) {
  const card = document.createElement("div");

  const contents = ["title", "description", "category"];

  for (let i = 0; i < contents.length; i++) {
    const item = document.createElement("p");
    item.textContent = product[contents[i]];
    card.appendChild(item);
  }

  card.classList.add("card");

  return card;
}

export function buildButtonElement(eventCallback) {
  const button = document.createElement("button");
  button.textContent = "Add to cart";
  button.classList.add("btn");

  if (eventCallback) {
    button.addEventListener("click", eventCallback);
  }

  return button;
}
