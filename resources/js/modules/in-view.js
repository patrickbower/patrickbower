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
        this.pageReturnTest();
        this.bindEvents();
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

        if (this.testViewPort(element)) {
            element.classList.add(this.selectors.play);
            element.classList.remove(this.selectors.item);
        }
    }

    /**
     * check for element and if it's in viewport
     *
     * @function testViewPort
     */
    testViewPort (element) {
        if (element && element.getBoundingClientRect().top <= window.innerHeight) {
            return true;
        }
    }

    /**
     * For items above viewport on page reload
     *
     * @function pageReturnTest
     */
    pageReturnTest () {
        let instance = this;
        let allItems = document.querySelectorAll('.' + this.selectors.item);

        [].forEach.call(allItems, function(item) {
            if (instance.testViewPort(item)) {
                item.classList.remove(instance.selectors.ready);
            }
        });
    }
}
