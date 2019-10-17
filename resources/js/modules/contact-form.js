import * as utility from "../utilities/_utilities";

const defaults = {
  element: undefined,
  selectors: {
    contact_form: "js-contact--form",
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
   * Initialise and setup at runtime.
   *
   * @function init
   */
  init() {
    this.setFormAction();
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
}
