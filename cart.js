export default function buildCart() {
  const cartElement = document.createElement("div");
  cartElement.classList.add("cart");
  cartElement.textContent = "Cart";

  return {
    element: cartElement,
    items: [],
    addToCart: function (product) {
      this.items.push(product);
      console.log("Added to cart", this.items);
    },
  };
}
