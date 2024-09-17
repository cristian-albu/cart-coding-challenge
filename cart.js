export default class Cart {
  #errors = {
    wrongShape: "Product shape does not satisfy requirements",
    doesNotExist: "Product does not exist",
  };

  #productShape = [
    { key: "id", type: "string" },
    { key: "title", type: "string" },
    { key: "description", type: "string" },
    { key: "price", type: "number" },
    { key: "category", type: "string" },
  ];

  actions = {
    addToCart: "ADD",
    removeFromCart: "REMOVE",
    increment: "INCREMENT",
    decrement: "DECREMENT",
    removeAll: "REMOVE ALL",
    submit: "SUBMIT",
  };

  constructor(items) {
    this.items = [];

    if (Array.isArray(items)) {
      items.forEach((curr) => {
        const validError = this.#validateProductShape(curr);
        if (validError) throw new Error(validError);

        if (curr.quantity && typeof curr.quantity === "number") {
          this.items.push(curr);
        } else {
          this.items.push({ ...curr, quantity: 1 });
        }
      });
    }
  }

  #validateProductShape(product) {
    if (!product) return this.#errors.wrongShape;

    const validKeys = this.#productShape;

    for (let i = 0; i < validKeys.length; i++)
      if (!product[validKeys[i].key] || typeof product[validKeys[i].key] !== validKeys[i].type)
        return this.#errors.wrongShape;

    return null;
  }

  #findItem(product) {
    const idx = this.items.findIndex((it) => it.id === product.id);
    return idx !== -1 ? { item: this.items[idx], index: idx } : { item: null, index: -1 };
  }

  #incrementQuantity(product) {
    const { item } = this.#findItem(product);

    if (item) {
      item.quantity += 1;
    } else {
      this.#addItem(product);
    }

    return null;
  }

  #decrementQuantity(product) {
    const { item } = this.#findItem(product);

    if (item) {
      if (item.quantity <= 1) {
        this.#removeItem(product);
      } else {
        item.quantity -= 1;
      }
    }

    return null;
  }

  #addItem(product) {
    const { item } = this.#findItem(product);
    if (item) {
      item.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    return null;
  }

  #removeItem(product) {
    const { index } = this.#findItem(product);

    if (index !== -1) {
      this.items.splice(index, 1);
    } else {
      return this.#errors.doesNotExist;
    }

    return null;
  }

  #removeAll() {
    this.items = [];

    return null;
  }

  #submit() {
    console.log(this.items);
  }

  // Public methods

  action(product, action) {
    const validError = this.#validateProductShape(product);
    if (validError) return validError;

    if (!Object.values(this.actions).includes(action)) {
      return `Invalid action: ${action}`;
    }

    switch (action) {
      case this.actions.addToCart:
        this.#addItem(product);
        break;
      case this.actions.removeFromCart:
        this.#removeItem(product);
        break;
      case this.actions.increment:
        this.#incrementQuantity(product);
        break;
      case this.actions.decrement:
        this.#decrementQuantity(product);
        break;
      case this.actions.removeAll:
        this.#removeAll();
        break;
      case this.actions.submit:
        this.#submit();
        break;
    }
  }

  buildCartElement() {
    const cartElement = document.createElement("div");
    cartElement.classList.add("cart");
    cartElement.textContent = "Cart";

    return cartElement;
  }

  getItems() {
    return [...this.items];
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
