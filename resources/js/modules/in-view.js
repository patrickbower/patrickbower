import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        item: 'js-inview',
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

        this.items = this.getItems();
        this.windowPosition = this.getCurrentPosition();

        this.setClasses();
        this.pageReturnTest();
        this.bindEvents();
    }

    /**
     * Get and store all elements that can be animated
     *
     * @function getItems
     * @return {Array} Elements on page with animated class
     */
    getItems() {
        return document.querySelectorAll('.' + this.selectors.item);
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
     * Set classes to any elements below the viewport
     *
     * @function setClasses
     */
    setClasses () {
        let instance = this;

        Array.from(this.items).forEach(item => {

            if (instance.testBelowViewPort(item)) {
                item.classList.add(instance.selectors.ready);
            }

        });
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
                instance.scrollIntoViewPort('.' + instance.selectors.item);
            }
        }

        window.addEventListener('scroll', scroll_event);
    }

    scrollIntoViewPort (nextElement) {
        let element = document.querySelector(nextElement);

        if (this.testInViewPort(element)) {
            element.classList.add(this.selectors.play);
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

    /**
     * For items above viewport on page reload
     *
     * @function pageReturnTest
     */
    pageReturnTest () {
        // let instance = this;
        // let allItems = document.querySelectorAll('.' + this.selectors.item);
        //
        // [].forEach.call(allItems, function(item) {
        //     if (instance.testInViewPort(item)) {
        //         item.classList.remove(instance.selectors.ready);
        //     }
        // });
    }
}
