// Dependencies
import "./../sass/main.scss";
import $ from "jquery";
import slick from "slick-carousel";

// Components
import Shelf from "./components/shelf";
import Cart from "./components/cart";
import Newsletter from "./components/newsletter";

/**
 * Home page class
 */
class Home {
  /**
   * Construction of home page class
   */
  constructor() {
    this.pageLoad();
    this._cart = new Cart();
    this._productsShelf = new Shelf();
    this._newsletter = new Newsletter();
  }

  /**
   * Init page carousel sliders
   */
  initSliders() {
    const banners = $(".js-main-banners");

    banners.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
    });
  }

  /**
   * On page load method
   */
  pageLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initSliders();
      this.componentBuilder();
    });
  }

  /**
   * Load components used in page
   */
  async componentBuilder() {
    await this._productsShelf.load();
    this._cart.load();
    this._newsletter.load();
  }
}

new Home();
