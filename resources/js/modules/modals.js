import * as utility from "../utilities/_utilities";

const defaults = {
  element: undefined,
  selectors: {
    template: "js-modal-template",
    open_button: "js-modal-open",
    close_button: "js-modal-close",
    fragment_selector: "js-ajax",
    modal: "js-modal-window",
    modal_content: "js-modal-content",
    modal_active: "modal-active"
  },
  isOpen: false
};

/**
 * Default modal
 *
 * @module Modal
 * @class Modal
 */
export class Modals {
  /**
   * @constructor
   * @param {object}
   */
  constructor(properties = {}) {
    let members = Object.assign({}, defaults, properties);
    this.element = members.element;
    this.selectors = members.selectors;
  }

  /**
   * Initalise functions
   *
   * @function init
   */
  init() {
    this.getTemplate();
    this.setTemplate();
    this.defineElements();
    this.bindEvents();
    this.testLocation();
  }

  testLocation() {
    if (window.location.hash) {
      this.launchModal();
    }
  }

  /**
   * Find and store the template from the template element.
   *
   * @function getTemplate
   */
  getTemplate() {
    this.modalTemplate = document.querySelector(
      "#" + this.selectors.template
    ).innerHTML;
  }

  /**
   * Add modal template into the HTML ready to used.
   *
   * @function setTemplate
   */
  setTemplate() {
    document.body.insertAdjacentHTML("afterbegin", this.modalTemplate);
  }

  /**
   * Get and store basic elements to instance
   *
   * @function defineElements
   */
  defineElements() {
    this.modal = document.querySelector("." + this.selectors.modal);
    this.modalContent = this.modal.querySelector(
      "." + this.selectors.modal_content
    );
  }

  /**
   * Add the events to start the modal up
   *
   * @function bindEvents
   */
  bindEvents() {
    let instance = this;

    /**
     * Handle any changes to the url hash
     * which will manipulate modal states.
     *
     * @event hash_change
     */
    let hash_change = {
      handleEvent(event) {
        if (window.location.hash) {
          instance.launchModal();
        } else {
          instance.closeModal();
        }
      }
    };

    window.addEventListener("hashchange", hash_change);

    /**
     * Close the model if open via
     * the Escape key.
     *
     * @event close_key
     */
    let close_key = {
      handleEvent(event) {
        if (instance.isOpen === true && event.keyCode === 27) {
          window.location.hash = "#";
        }
      }
    };

    window.addEventListener("keydown", close_key);
  }

  /**
   * Functions to perform when opening a modal
   *
   * @function launchModal
   */
  launchModal() {
    this.displayModal();
    this.getScrollPosition();
    this.hideInitialScroll();
    this.fetch(this.findURL(window.location.hash));
    this.isOpen = true;
  }

  /**
   * Functions to perform when closing a modal
   *
   * @function closeModal
   */
  closeModal() {
    this.hideModal();
    this.displayInitialScroll();
    this.setScrollPosition();
    this.removeModalContents();
    this.isOpen = false;
  }

  /**
   * Shows modal via css
   *
   * @function displayModal
   */
  displayModal() {
    this.modal.classList.add("active");
  }

  /**
   * Hides modal via css
   *
   * @function hideModal
   */
  hideModal() {
    this.modal.classList.remove("active");
  }

  /**
   * Store scroll Y position ready for hiding modal
   *
   * @function getScrollPosition
   */
  getScrollPosition() {
    this.scrollPosition = window.pageYOffset || document.body.scrollTop;
  }

  /**
   * Move scrollbar back to where it was before modal opened
   *
   * @function setScrollPosition
   */
  setScrollPosition() {
    document.documentElement.scrollTop = document.body.scrollTop = this.scrollPosition;
  }

  /**
   * Prevent scrolling on background page and double scroll bars
   *
   * @function hideInitialScroll
   */
  hideInitialScroll() {
    document.body.classList.add(this.selectors.modal_active);
  }

  /**
   * Bring back scroll bar on background page
   *
   * @function displayInitialScroll
   */
  displayInitialScroll() {
    document.body.classList.remove(this.selectors.modal_active);
  }

  /**
   * Find button with hash string and return href
   *
   * @function displayInitialScroll
   * @return {string} - href for non-js users
   */
  findURL(hash) {
    let modal_name = hash.substring(1);
    let launch_button = document.querySelector(`[data-modal="${modal_name}"]`);

    return launch_button.getAttribute("href");
  }

  /**
   * Ajax to get modal content
   *
   * @function fetch
   */
  fetch(href) {
    utility.ajax(href, data => {
      let html = data.querySelector("#" + this.selectors.fragment_selector);
      this.addContent(html);
    });
  }

  /**
   * Add content to modal
   *
   * @function addContent
   */
  addContent(html) {
    this.modalContent.appendChild(html);
    utility.init(html);
  }

  /**
   * Clear content from modal and make blank
   *
   * @function removeModalContents
   */
  removeModalContents() {
    this.modalContent.innerHTML = "";
  }
}
