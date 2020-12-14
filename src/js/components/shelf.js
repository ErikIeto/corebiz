import $ from "jquery";
import API_URL from "../config/api";

/**
 * Shelf component class
 */
export default class Shelf {
  /**
   * constructor of shelf component class
   */
  constructor() {
    this.shelfElementSelector = ".js-products-shelf";
  }

  /**
   * Retrieves the shelf element
   */
  getShelfElement() {
    return $(this.shelfElementSelector);
  }

  /**
   * Get rating stars product card HTML
   */
  getStarsHTML(starsCount) {
    let html = '<ul class="productCard__stars">';

    for (let starIndex = 1; starIndex <= starsCount; starIndex++) {
      html += `<li class="productCard__stars--star-filled"></li>`;
    }

    if (starsCount < 5) {
      for (let starIndex = starsCount; starIndex < 5; starIndex++) {
        html += `<li class="productCard__stars--star"></li>`;
      }
    }

    html += "</ul>";
    return html;
  }

  /**
   * Render product cards
   */
  render(products) {
    const shelfElement = this.getShelfElement();

    products.forEach((product) => {
      const hasListPrice = product.listPrice !== null;
      const hasInstallments = product.installments.length > 0;
      const starsHTML = this.getStarsHTML(product.stars);
      console.log(starsHTML);
      shelfElement.append(
        `
            <article class="productCard" data-product-id="${product.productId}">
                <div class="productCard__flags">
                    ${
                      hasListPrice
                        ? '<i class="productCard__flags--off"></i>'
                        : ""
                    }
                </div>
                <a class="productCard__link" href="#">
                    <img class="productCard__image" src="${product.imageUrl}" />
                </a>
                <div class="productCard__info">
                    <h3 class="productCard__name">
                        ${product.productName}
                    </h3>
                    ${starsHTML}
                    <span class="productCard__price--list">${
                      hasListPrice ? `de ${product.listPrice}` : ""
                    } 
                </div>
                <div class="productCard__price">
                    <span class="productCard__price--best">por ${
                      product.price
                    }</span>
                    <span class="productCard__price--installments">${
                      hasInstallments
                        ? `ou em ${product.installments[0].quantity}x de ${product.installments[0].value}`
                        : ""
                    }</span>
                </div>
                <div class="productCard__buyBox">
                    <button class="productCard__buyBox--btn">Comprar</button>
                </div>
            </article>
        `
      );
    });
  }

  /**
   * Init shelf slider
   */
  initSlider() {
    const slidesToShow = 4;
    const slideCount = $(".productCard").length;

    /* Clone the cards if we have just a little bit */
    if (slideCount <= slidesToShow) {
      this.getShelfElement()
        .children()
        .clone(true, true)
        .appendTo(`${this.shelfElementSelector}`);
    }

    this.getShelfElement().slick({
      slidesToShow: slidesToShow,
      slidesToScroll: 4,
      arrows: true,
      dots: false,
    });
  }

  /**
   * Request api products
   */
  async fetchProducts() {
    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
    });
    const products = await response.json();
    this.render(products);
  }

  /**
   * Load shelf component
   */
  async load() {
    await this.fetchProducts();
    this.initSlider();
  }
}
