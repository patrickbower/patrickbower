import * as utility from "../utilities/_utilities";

const defaults = {
  element: undefined,
  selectors: {
    contact_form: "js-contact--form",
    submit_button: "js-contact--submit",
    confirm_input: "js-contact--confirm",
    contact_section: "js-contact--section"
  },
  email: {
    first: "patrickbowercom",
    last: "gmail.com"
  }
};

/**
 * Enhance the contact form.
 *

 * @module Contact Form
 * @class ContactForm
 */
export class ContactForm {
  /**
   * Launches full page modal.
   *
   * @constructor
   * @param {object} the origin module that launches the modal
   */
  constructor(properties = {}) {
    let members = Object.assign({}, defaults, properties);

    this.element = members.element;
    this.selectors = members.selectors;
    this.email = members.email;
  }

  /**
   * Initalise and setup at runtime.
   *
   * @function init
   */
  init() {
    this.setFormAction();
    this.hiddenInput();
    this.bindEvents();
  }

  /**
   * Build form action with email address
   *
   * @function setFormAction
   */
  setFormAction() {
    let form = this.element.querySelector("." + this.selectors.contact_form);
    const action = `https://formspree.io/${this.email.first}@${this.email.last}`;
    form.setAttribute("action", action);
  }

  /**
   * Add event listners where requiried.
   *
   * @function bindEvents
   */
  bindEvents() {
    let instance = this;

    // form submit button
    let submit_form_event = {
      handleEvent: function(event) {
        event.preventDefault();
        instance.submitForm();
      }
    };

    let submit_button = this.element.querySelector(
      "." + this.selectors.submit_button
    );
    submit_button.addEventListener("click", submit_form_event);
  }

  /**
   * Prevent tabbing into hidden input placed to encourage spam bots.
   *
   * @function hiddenInput
   * @param contactForm - The module html.
   */
  hiddenInput() {
    let confirm = this.element.querySelector(
      "." + this.selectors.confirm_input
    );
    confirm.tabIndex = -1;
  }

  /**
   * Get content via Ajax.
   *
   * @function submitForm
   * @requires {function} ajax utility
   */
  submitForm() {
    let form = this.element.querySelector("." + this.selectors.contact_form);
    utility.postJson(form.action, new FormData(form), data => {
      this.confirmSubmit();
    });
  }

  /**
   * Replace contact form with confermation message.
   *
   */
  confirmSubmit() {
    let contact_section = this.element.querySelector(
      "." + this.selectors.contact_section
    );
    contact_section.innerHTML =
      "<h2 class='h2'><span class='strike contact-section--strike'>Thanks</span></h2>";
  }
}
