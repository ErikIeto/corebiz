import $ from "jquery";
import API_URL from "../config/api";
import formatPrice from "../utils/helper";

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
                      hasListPrice
                        ? `de R$ ${formatPrice(product.listPrice)}`
                        : ""
                    } 
                </div>
                <div class="productCard__price">
                    <span class="productCard__price--best">por R$ ${formatPrice(
                      product.price
                    )}</span>
                    <span class="productCard__price--installments">${
                      hasInstallments
                        ? `ou em ${
                            product.installments[0].quantity
                          }x de R$ ${formatPrice(
                            product.installments[0].value
                          )}`
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
    const mobileSlidesToShow = 2;
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
      slidesToScroll: slidesToShow,
      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 890,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 625,
          settings: {
            slidesToShow: mobileSlidesToShow,
            slidesToScroll: mobileSlidesToShow,
            arrows: false,
            dots: true,
          },
        },
      ],
    });
  }

  /**
   * Request api products
   */
  async fetchProducts() {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "GET",
      });
      const products = await response.json();
      this.render(products);
    } catch (err) {
      console.warn("Error fetching api products.");
    }
  }

  /**
   * Load shelf component
   */
  async load() {
    await this.fetchProducts();
    this.initSlider();
  }
}
