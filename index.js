import buildCart from "./cart.js";
import { buildButtonElement, buildCardElement, buildCardListElement } from "./elements.js";
import getProducts from "./requests.js";

async function main() {
  const root = document.querySelector("#root");
  const products = await getProducts();
  const cart = buildCart();
  const list = buildCardListElement();

  for (let i = 0; i < products.length; i++) {
    const card = buildCardElement(products[i]);

    const btnCallback = () => cart.addToCart(products[i]);
    const button = buildButtonElement(btnCallback);

    card.appendChild(button);
    list.appendChild(card);
  }

  root.appendChild(list);
  root.appendChild(cart.element);
}

main();
