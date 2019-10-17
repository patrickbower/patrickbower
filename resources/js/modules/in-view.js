import * as utility from "../utilities/_utilities";

const defaults = {
  element: undefined,
  selectors: {
    element: "js-inview",
    ready: "inview--ready",
    play: "inview--play"
  }
};

/**
 * Test for elements coming into view
 *
 * @module InView
 * @class InView
 */
export class InView {
  /**
   * @constructor
   * @param {object} element to add email button into.
   */
  constructor(properties = {}) {
    let members = Object.assign({}, defaults, properties);

    this.element = members.element;
    this.selectors = members.selectors;
  }

  /**
   * Runtime setup
   *
   * @function init
   */
  init() {
    this.elementsArray = this.getItems();
    this.windowHeight = this.getWindowHeight();
    this.windowPosition = this.getScrollPosition();

    this.setUp();
    this.bindEvents();
  }

  /**
   * Get and store all elements that can be animated
   *
   * @function getItems
   * @return {Array} Elements on page with animated class
   */
  getItems() {
    return document.querySelectorAll("." + this.selectors.element);
  }

  /**
   * Get and store all elements that can be animated
   *
   * @function getWindowHeight
   * @return {Interger} Window height
   */
  getWindowHeight() {
    return window.innerHeight;
  }

  /**
   * Get the page position
   *
   * @function getItems
   * @return {interger} Page position
   */
  getScrollPosition() {
    return this.windowHeight + window.pageYOffset;
  }

  /**
   * Add event handlers
   *
   * @function bindEvents
   */
  bindEvents() {
    const instance = this;

    // scroll event
    let scroll_event = {
      handleEvent: function(event) {
        instance.scrollIntoViewPort();
      }
    };

    window.addEventListener("scroll", scroll_event);
  }

  /**
   * Set classes to any elements below the viewport
   *
   * @function setUp
   */
  setUp() {
    let instance = this;

    Array.from(this.elementsArray).forEach((element, index) => {
      if (utility.breakpoint() !== "desktop") return;

      // set ready state to elements that can animate (ie: below the viewport)
      if (instance.testBelowViewPort(element)) {
        element.classList.add(instance.selectors.ready);

        // store the first found ready element
        if (typeof this.nextReadyElement === "undefined") {
          this.nextReadyElement = element;
        }
      }
    });
  }

  /**
   * Find next ready elemnt, when it comes into
   * viewport remove ready and append play to animate.
   *
   * @function testInViewPort
   */
  scrollIntoViewPort() {
    if (this.testInViewPort(this.nextReadyElement)) {
      this.nextReadyElement.classList.remove(this.selectors.ready);
      this.nextReadyElement.classList.add(this.selectors.play);

      this.nextReadyElement = document.querySelector(
        "." + this.selectors.ready
      );
    }
  }

  /**
   * check for element and if it's in viewport
   *
   * @function testInViewPort
   */
  testInViewPort(element) {
    if (element && element.getBoundingClientRect().top < this.windowHeight) {
      return true;
    }
  }

  /**
   * Check for elements above the viewport
   *
   * @function testAboveViewPort
   */
  testBelowViewPort(element) {
    if (element.getBoundingClientRect().top > this.windowHeight) {
      return true;
    }
  }
}
