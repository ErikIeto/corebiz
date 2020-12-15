// Dependencies
import "./../sass/main.scss";
import $ from "jquery";
import slick from "slick-carousel";

// Components
import Shelf from "./components/shelf";
import Cart from "./components/cart";

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
    document.addEventListener("DOMContentLoaded", async () => {
      this.initSliders();
      await this._productsShelf.load();
      this._cart.load();
    });
  }
}

new Home();
