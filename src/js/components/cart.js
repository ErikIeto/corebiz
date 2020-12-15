/**
 * Cart component class
 */
export default class Cart {
  /**
   * Constructor of cart component
   */
  constructor() {
    this.localStorageKey = "corebiz@cart";
    this.cartQuantitySelector = ".js-cart-counter";

    this.allowMultipleProducts = false; // Allow multiple products with same id into the cart?
  }

  /**
   * Get data from local storage
   */
  localStorageData() {
    try {
      const data = JSON.parse(localStorage.getItem(this.localStorageKey));

      if (data && data.hasOwnProperty("products")) {
        return data;
      }

      return null;
    } catch (_) {
      return null;
    }
  }

  /**
   * Renders header cart quantity counter
   */
  renderQuantityCounter() {
    const cartQuantityElement = document.querySelector(
      this.cartQuantitySelector
    );

    if (cartQuantityElement) {
      const cartData = this.localStorageData();

      if (cartData !== null) {
        cartQuantityElement.innerHTML = cartData.products.length;
      } else {
        cartQuantityElement.innerHTML = "0";
      }
    }
  }

  /**
   * Add and store a product on cart
   */
  addToCart(productId) {
    const cartData = this.localStorageData();

    if (cartData !== null) {
      if (!this.allowMultipleProducts) {
        const productAlreadyInCart =
          cartData.products.filter((value) => value === productId).length > 0;

        if (productAlreadyInCart) return;
      }

      let newCartData = cartData.products;
      newCartData.push(productId);

      this.updateCartItems(newCartData);
    } else {
      const newCartData = [productId];
      this.updateCartItems(newCartData);
    }
  }

  /**
   * Update local storage products with new data
   */
  updateCartItems(data) {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify({
        products: data,
      })
    );

    this.renderQuantityCounter();
  }

  /**
   * Check if we need to add shelf buttons events
   */
  eventHandleBinders() {
    const shelves = document.querySelectorAll(".productCard");

    for (const shelf of shelves) {
      const shelfProductId = shelf.getAttribute("data-product-id");

      const buyButton = shelf.querySelector(".productCard__buyBox--btn");

      buyButton.addEventListener("click", () => {
        this.addToCart(shelfProductId);
      });
    }
  }

  /**
   * Loads cart component
   */
  load() {
    this.renderQuantityCounter();
    this.eventHandleBinders();
  }
}
