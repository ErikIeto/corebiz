// Dependencies
import "./../sass/main.scss";
import $ from "jquery";
import slick from "slick-carousel";

// Components
import Shelf from "./components/shelf";

/**
 * Home page class
 */
class Home {
  /**
   * Construction of home page class
   */
  constructor() {
    this.pageLoad();
    this.productsShelf = new Shelf();
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
      this.productsShelf.load();
    });
  }
}

new Home();
