import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        element: 'js-inview',
        ready: 'inview--ready',
        play: 'inview--play'
    }
}

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
    init () {

        this.elementsArray = this.getItems();
        this.windowPosition = this.getCurrentPosition();

        this.bindEvents();
        this.setClasses();
    }

    /**
     * Get and store all elements that can be animated
     *
     * @function getItems
     * @return {Array} Elements on page with animated class
     */
    getItems() {
        return document.querySelectorAll('.' + this.selectors.element);
    }

    /**
     * Get the page position
     *
     * @function getItems
     * @return {interger} Page position
     */
    getCurrentPosition () {
        return window.pageYOffset + window.innerHeight;
    }

    /**
     * Add event handlers
     *
     * @function bindEvents
     */
    bindEvents () {
        const instance = this;

        // scroll event
        let scroll_event = {
            handleEvent: function(event) {
                instance.scrollIntoViewPort('.' + instance.selectors.ready);
            }
        }

        window.addEventListener('scroll', scroll_event);
    }

    /**
     * Set classes to any elements below the viewport
     *
     * @function setClasses
     */
    setClasses () {
        let instance = this;

        Array.from(this.elementsArray).forEach(element => {

            if (instance.testBelowViewPort(element)) {
                element.classList.add(instance.selectors.ready);
            }

        });
    }

    /**
     * Find next ready elemnt, when it comes into
     * viewport remove ready and append play to animate.
     *
     * @function testInViewPort
     */
    scrollIntoViewPort (nextReadyElement) {
        let nextElement = document.querySelector(nextReadyElement);

        if (this.testInViewPort(nextElement)) {
            nextElement.classList.remove(this.selectors.ready);
            nextElement.classList.add(this.selectors.play);
        }
    }

    /**
     * check for element and if it's in viewport
     *
     * @function testInViewPort
     */
    testInViewPort (element) {

        if (element && element.getBoundingClientRect().top <= window.innerHeight) {
            return true;
        }
    }

    /**
     * Check for elements above the viewport
     *
     * @function testAboveViewPort
     */
    testBelowViewPort (element) {

        if (element.getBoundingClientRect().top > this.windowPosition) {
            return true;
        }
    }
}
