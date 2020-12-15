import API_URL from "../config/api";

/**
 * Newsletter component class
 */
export default class Newsletter {
  /**
   * Constructor of newsletter component
   */
  constructor() {
    this.newsletterSectionSelector = ".js-newsletter-section";
    this.newsletterFormSection = this.newsletterSectionSelector + "--form";
    this.newsletterSuccessSection =
      this.newsletterSectionSelector + "--success";
    this.newsletterFormSelector = ".js-newsletter-form";
  }

  /**
   * Renders newsletter success section
   */
  renderSuccess() {
    const sectionElement = document.querySelector(
      this.newsletterSectionSelector
    );

    const formSection = document.querySelector(this.newsletterFormSection);
    formSection.classList.add("hide");

    sectionElement.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="newsletter__success ${this.newsletterSuccessSection.replace(
          ".",
          ""
        )}">
            <span class="success__title">Seu e-mail foi cadastrado com sucesso!</span>
            <span class="success__text">A partir de agora você receberá as novidades e ofertas exclusivas.</span>
            <button class="success__button js-newsletter-success-button">Cadastrar novo e-mail</button>
        </div>
        `
    );

    const successSection = document.querySelector(
      this.newsletterSuccessSection
    );

    document
      .querySelector(".js-newsletter-success-button")
      .addEventListener("click", (e) => {
        successSection.remove();
        formSection.classList.remove("hide");
      });
  }

  /**
   * Render newsletter input error messages
   */
  renderError({ name = false, email = false }) {
    const formElement = document.querySelector(this.newsletterFormSelector);

    const inputName = formElement.name;
    const inputEmail = formElement.email;

    const toggleNameError = (activate) => {
      activate
        ? inputName.classList.add("error")
        : inputName.classList.remove("error");
    };

    const toggleEmailError = (activate) => {
      activate
        ? inputEmail.classList.add("error")
        : inputEmail.classList.remove("error");
    };

    name ? toggleNameError(true) : toggleNameError(false);
    email ? toggleEmailError(true) : toggleEmailError(false);
  }

  /**
   * Clear newsletter form inputs
   */
  clearFormInputs() {
    const formElement = document.querySelector(this.newsletterFormSelector);

    formElement.name.value = "";
    formElement.email.value = "";
  }

  /**
   * Validate form inputs
   */
  formValidation(name, email) {
    const error = {
      name: false,
      email: false,
    };

    if (!name || name.length <= 3) error.name = true;

    const validateEmail = () => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    if (!email || !validateEmail(email)) error.email = true;

    this.renderError(error);

    if (error.name || error.email) return false;

    return true;
  }

  /**
   * Loads newsletter component
   */
  async load() {
    const formElement = document.querySelector(this.newsletterFormSelector);

    const inputName = formElement.name;
    const inputEmail = formElement.email;

    formElement.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = inputName.value;
      const email = inputEmail.value;

      if (inputName && inputEmail) {
        const validateInputs = this.formValidation(name, email);

        if (validateInputs) {
          try {
            const response = await fetch(`${API_URL}/newsletter`, {
              method: "POST",
              body: {
                email,
                name,
              },
            });

            const result = await response.json();
            this.clearFormInputs();
            this.renderSuccess();

            if (result.status === "error") return console.error(result.message);
          } catch (err) {
            console.warn(err);
          }
        }
      }
    });
  }
}
