import "./../sass/main.scss";
import $ from "jquery";
import slick from "slick-carousel";
/**
 * Home page class
 */
class Home {
  /**
   * Construction of home page class
   */
  constructor() {
    this.pageLoad();
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
    });
  }
}

new Home();
