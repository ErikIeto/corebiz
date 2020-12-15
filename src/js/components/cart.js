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

    this.allowMultipleProducts = true; // Allow multiple products with same id into the cart?
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
        const quantity = cartData.products.reduce((a, b) => {
          const val = a.quantity ? a.quantity + b.quantity : a + b.quantity;
          return val;
        });
        cartQuantityElement.innerHTML = quantity.toString();
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
      const productAlreadyInCart =
        cartData.products.filter((value) => value.productId === productId)
          .length > 0;

      if (!this.allowMultipleProducts) {
        if (productAlreadyInCart) return;
      }

      let newCartData = cartData.products;

      if (productAlreadyInCart) {
        const productInCartIndex = newCartData.findIndex(
          (v) => v.productId === productId
        );

        newCartData[productInCartIndex].quantity =
          newCartData[productInCartIndex].quantity + 1;
      } else {
        newCartData.push({ productId, quantity: 1 });
      }

      this.updateCartItems(newCartData);
    } else {
      const newCartData = [{ productId, quantity: 1 }];
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
