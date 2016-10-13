(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _init = require('./utilities/init');

/**
* Run time script initalising when document ready.
*
* @function self invoking
*/
window.onload = function () {
  (0, _init.init)(document);
}; /**
    * Dependencies
    */

},{"./utilities/init":14}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modules = undefined;

var _modules;

var _contactForm = require('./contact-form');

var _email = require('./email');

var _backButton = require('./back-button');

var _inView = require('./in-view');

var _modals = require('./modals');

var _modal = require('./modal');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modules = (_modules = {}, _defineProperty(_modules, 'in-view', _inView.InView), _defineProperty(_modules, 'back-button', _backButton.BackButton), _defineProperty(_modules, 'modals', _modals.Modals), _defineProperty(_modules, 'modal', _modal.Modal), _defineProperty(_modules, 'contact', _contactForm.ContactForm), _defineProperty(_modules, 'email', _email.Email), _modules);

exports.modules = modules;

},{"./back-button":3,"./contact-form":4,"./email":5,"./in-view":6,"./modal":7,"./modals":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BackButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('../utilities/_utilities');

var utility = _interopRequireWildcard(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
    element: undefined,
    selectors: {
        button: 'js-back-button'
    }
};

/**
 * Replicate native back button functionality
 *
 * @module BackButton
 * @class BackButton
 */

var BackButton = exports.BackButton = function () {

    /**
     * @constructor
     * @param {object} properties
     */

    function BackButton() {
        var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, BackButton);

        var members = Object.assign({}, defaults, properties);

        this.element = members.element;
        this.selectors = members.selectors;
    }

    /**
     * Initalise and setup at runtime.
     *
     * @function initilise function
     */


    _createClass(BackButton, [{
        key: 'init',
        value: function init() {
            this.bindEvents();
        }

        /**
         * Add event handlers.
         *
         * @function bindEvents
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var instance = this;

            var go_back_one_event = {
                handleEvent: function handleEvent(event) {
                    event.preventDefault();
                    instance.goBackOnePage();
                }
            };

            var button = document.querySelector('.' + this.selectors.button);
            button.addEventListener('click', go_back_one_event);
        }

        /**
         * Go back in history and use previous page position
         *
         * @function goBackOnePage
         */

    }, {
        key: 'goBackOnePage',
        value: function goBackOnePage() {
            window.history.back();
        }
    }]);

    return BackButton;
}();

},{"../utilities/_utilities":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContactForm = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('../utilities/_utilities');

var utility = _interopRequireWildcard(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
    element: undefined,
    selectors: {
        contact_form: 'js-contact--form',
        submit_button: 'js-contact--submit',
        confirm_input: 'js-contact--confirm',
        contact_section: 'js-contact--section'
    }
};

/**
 * Enhance the contact form.
 *

 * @module Contact Form
 * @class ContactForm
 */

var ContactForm = exports.ContactForm = function () {

    /**
     * Launches full page modal.
     *
     * @constructor
     * @param {object} the origin module that launches the modal
     */

    function ContactForm() {
        var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, ContactForm);

        var members = Object.assign({}, defaults, properties);

        this.element = members.element;
        this.selectors = members.selectors;
        this.email = members.email;
    }

    /**
     * Initalise and setup at runtime.
     *
     * @function init
     */


    _createClass(ContactForm, [{
        key: 'init',
        value: function init() {
            this.hiddenInput();
            this.bindEvents();
        }

        /**
         * Add event listners where requiried.
         *
         * @function bindEvents
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var instance = this;

            // form submit button
            var submit_form_event = {
                handleEvent: function handleEvent(event) {
                    event.preventDefault();
                    instance.submitForm();
                }
            };

            var submit_button = this.element.querySelector('.' + this.selectors.submit_button);
            submit_button.addEventListener('click', submit_form_event);
        }

        /**
         * Prevent tabbing into hidden input placed to encourage spam bots.
         *
         * @function hiddenInput
         * @param contactForm - The module html.
         */

    }, {
        key: 'hiddenInput',
        value: function hiddenInput() {
            var confirm = this.element.querySelector('.' + this.selectors.confirm_input);
            confirm.tabIndex = -1;
        }

        /**
        * Get content via Ajax.
        *
        * @function submitForm
        * @requires {function} ajax utility
        */

    }, {
        key: 'submitForm',
        value: function submitForm() {
            var _this = this;

            var form = this.element.querySelector('.' + this.selectors.contact_form);
            var formAction = form.action;

            var _formAction$split = formAction.split('#');

            var _formAction$split2 = _slicedToArray(_formAction$split, 2);

            var page_url = _formAction$split2[0];
            var fragment_selector = _formAction$split2[1];


            utility.ajax(page_url, function (data) {
                _this.htmlFragment = data.querySelector('.' + fragment_selector);

                _this.confirmSubmit();
            });
        }

        /**
         * Replace contact form with confermation message.
         *
         */

    }, {
        key: 'confirmSubmit',
        value: function confirmSubmit() {

            // fade out content
            var contact_section = this.element.querySelector('.' + this.selectors.contact_section);
            contact_section.classList.add('fade--out');

            // build confirm element
            var contact_confirm = document.createElement('div');
            contact_confirm.classList.add('animate--in');
            contact_confirm.appendChild(this.htmlFragment);
            this.element.appendChild(contact_confirm);

            // add and fade in when content faded out
            setTimeout(function () {
                contact_section.classList.add('display--none');
                contact_confirm.classList.add('fade--in');
            }, utility.settings.animation.default_timimg);
        }
    }]);

    return ContactForm;
}();

},{"../utilities/_utilities":10}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Email = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('../utilities/_utilities');

var utility = _interopRequireWildcard(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
    element: undefined,
    email: {
        first: 'bower.patrick',
        last: 'gmail.com'
    }
};

/**
 * Create direct email link instead of linking
 * to contact form modal.
 *
 * @module Email
 * @class Email
 */

var Email = exports.Email = function () {

    /**
     * @constructor
     * @param {object} element to add email button into.
     */

    function Email() {
        var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Email);

        var members = Object.assign({}, defaults, properties);

        this.element = members.element;
        this.selectors = members.selectors;
        this.email = members.email;
    }

    /**
     * Initalise and setup at runtime.
     *
     * @function init
     */


    _createClass(Email, [{
        key: 'init',
        value: function init() {
            this.addEmail();
        }

        /**
         * Add direct email address button to limit spaming bots.
         *
         * @function addEmail
         */

    }, {
        key: 'addEmail',
        value: function addEmail() {

            // construct button
            var anchor = document.createElement('a');
            anchor.setAttribute('class', 'button button--white');
            anchor.setAttribute('href', 'mailto:' + this.email.first + '@' + this.email.last);
            anchor.innerText = this.email.first + '@' + this.email.last;

            // append button
            this.element.appendChild(anchor);
        }
    }]);

    return Email;
}();

},{"../utilities/_utilities":10}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('../utilities/_utilities');

var utility = _interopRequireWildcard(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
    element: undefined,
    selectors: {
        element: 'js-inview',
        ready: 'inview--ready',
        play: 'inview--play'
    }
};

/**
 * Test for elements coming into view
 *
 * @module InView
 * @class InView
 */

var InView = exports.InView = function () {

    /**
     * @constructor
     * @param {object} element to add email button into.
     */

    function InView() {
        var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, InView);

        var members = Object.assign({}, defaults, properties);

        this.element = members.element;
        this.selectors = members.selectors;
    }

    /**
     * Runtime setup
     *
     * @function init
     */


    _createClass(InView, [{
        key: 'init',
        value: function init() {

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

    }, {
        key: 'getItems',
        value: function getItems() {
            return document.querySelectorAll('.' + this.selectors.element);
        }

        /**
         * Get and store all elements that can be animated
         *
         * @function getWindowHeight
         * @return {Interger} Window height
         */

    }, {
        key: 'getWindowHeight',
        value: function getWindowHeight() {
            return window.innerHeight;
        }

        /**
         * Get the page position
         *
         * @function getItems
         * @return {interger} Page position
         */

    }, {
        key: 'getScrollPosition',
        value: function getScrollPosition() {
            return this.windowHeight + window.pageYOffset;
        }

        /**
         * Add event handlers
         *
         * @function bindEvents
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var instance = this;

            // scroll event
            var scroll_event = {
                handleEvent: function handleEvent(event) {
                    instance.scrollIntoViewPort();
                }
            };

            window.addEventListener('scroll', scroll_event);
        }

        /**
         * Set classes to any elements below the viewport
         *
         * @function setUp
         */

    }, {
        key: 'setUp',
        value: function setUp() {
            var _this = this;

            var instance = this;

            Array.from(this.elementsArray).forEach(function (element, index) {

                if (utility.breakpoint() !== 'desktop') return;

                // set ready state to elements that can animate (ie: below the viewport)
                if (instance.testBelowViewPort(element)) {
                    element.classList.add(instance.selectors.ready);

                    // store the first found ready element
                    if (typeof _this.nextReadyElement === 'undefined') {
                        _this.nextReadyElement = element;
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

    }, {
        key: 'scrollIntoViewPort',
        value: function scrollIntoViewPort() {

            if (this.testInViewPort(this.nextReadyElement)) {

                this.nextReadyElement.classList.remove(this.selectors.ready);
                this.nextReadyElement.classList.add(this.selectors.play);

                this.nextReadyElement = document.querySelector('.' + this.selectors.ready);
            }
        }

        /**
         * check for element and if it's in viewport
         *
         * @function testInViewPort
         */

    }, {
        key: 'testInViewPort',
        value: function testInViewPort(element) {

            if (element && element.getBoundingClientRect().top < this.windowHeight) {
                return true;
            }
        }

        /**
         * Check for elements above the viewport
         *
         * @function testAboveViewPort
         */

    }, {
        key: 'testBelowViewPort',
        value: function testBelowViewPort(element) {

            if (element.getBoundingClientRect().top > this.windowHeight) {
                return true;
            }
        }
    }]);

    return InView;
}();

},{"../utilities/_utilities":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Modal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('../utilities/_utilities');

var utility = _interopRequireWildcard(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
    element: undefined,
    selectors: {
        open_button: 'js-modal-open'
    }
};

/**
 * Default modal
 *
 * @module Modal
 * @class Modal
 */

var Modal = exports.Modal = function () {

    /**
     * @constructor
     * @param {object}
     */

    function Modal() {
        var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Modal);

        var members = Object.assign({}, defaults, properties);
        this.element = members.element;
        this.selectors = members.selectors;
    }

    /**
     * Initalise functions
     *
     * @function init
     */


    _createClass(Modal, [{
        key: 'init',
        value: function init() {
            this.bindEvents();
        }

        /**
         * Add the events to start the modal up
         *
         * @function bindEvents
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var instance = this;

            /**
             * Handle button clicks to launch modal
             *
             * @event open_modal_event
             */
            var open_modal_event = {
                handleEvent: function handleEvent(event) {

                    if (utility.breakpoint() !== 'desktop') return;

                    // Check click's from modal launch button and we're on desktop.
                    // If mobile breakpoint then default back to page visit.
                    if (event.target.classList.contains(instance.selectors.open_button)) {

                        event.preventDefault();
                        window.location.hash = event.target.getAttribute('data-modal');
                    }
                }
            };

            this.element.addEventListener('click', open_modal_event);
        }
    }]);

    return Modal;
}();

},{"../utilities/_utilities":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Modals = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('../utilities/_utilities');

var utility = _interopRequireWildcard(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
    element: undefined,
    selectors: {
        template: 'js-modal-template',
        open_button: 'js-modal-open',
        close_button: 'js-modal-close',
        fragment_selector: 'js-ajax',
        modal: 'js-modal-window',
        modal_content: 'js-modal-content',
        modal_active: 'modal-active'
    }
};

/**
 * Default modal
 *
 * @module Modal
 * @class Modal
 */

var Modals = exports.Modals = function () {

    /**
     * @constructor
     * @param {object}
     */

    function Modals() {
        var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Modals);

        var members = Object.assign({}, defaults, properties);
        this.element = members.element;
        this.selectors = members.selectors;
    }

    /**
     * Initalise functions
     *
     * @function init
     */


    _createClass(Modals, [{
        key: 'init',
        value: function init() {
            this.getTemplate();
            this.setTemplate();
            this.defineElements();
            this.bindEvents();
        }

        /**
         * Find and store the template from the template element.
         *
         * @function getTemplate
         */

    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            this.modalTemplate = document.querySelector('#' + this.selectors.template).innerHTML;
        }

        /**
         * Add modal template into the HTML ready to used.
         *
         * @function setTemplate
         */

    }, {
        key: 'setTemplate',
        value: function setTemplate() {
            document.body.insertAdjacentHTML('afterbegin', this.modalTemplate);
        }

        /**
         * Get and store basic elements to instance
         *
         * @function defineElements
         */

    }, {
        key: 'defineElements',
        value: function defineElements() {
            this.modal = document.querySelector('.' + this.selectors.modal);
            this.modalContent = this.modal.querySelector('.' + this.selectors.modal_content);
        }

        /**
         * Add the events to start the modal up
         *
         * @function bindEvents
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var instance = this;

            /**
             * Handle any changes to the url hash
             * which will manipulate modal states
             *
             * @event hash_change
             */
            var hash_change = {
                handleEvent: function handleEvent(event) {

                    // add hash
                    if (window.location.hash) {

                        instance.launchModal();

                        // remove hash
                    } else {

                            instance.closeModal();
                        }
                }
            };

            window.addEventListener('hashchange', hash_change);
        }

        /**
         * Functions to perform when opening a modal
         *
         * @function launchModal
         */

    }, {
        key: 'launchModal',
        value: function launchModal() {
            this.displayModal();
            this.getScrollPosition();
            this.hideInitialScroll();
            this.fetch(this.findURL(window.location.hash));
        }

        /**
         * Functions to perform when closing a modal
         *
         * @function closeModal
         */

    }, {
        key: 'closeModal',
        value: function closeModal() {
            this.hideModal();
            this.displayInitialScroll();
            this.setScrollPosition();
            this.removeModalContents();
        }

        /**
         * Shows modal via css
         *
         * @function displayModal
         */

    }, {
        key: 'displayModal',
        value: function displayModal() {
            this.modal.classList.add('active');
        }

        /**
         * Hides modal via css
         *
         * @function hideModal
         */

    }, {
        key: 'hideModal',
        value: function hideModal() {
            this.modal.classList.remove('active');
        }

        /**
         * Store scroll Y position ready for hiding modal
         *
         * @function getScrollPosition
         */

    }, {
        key: 'getScrollPosition',
        value: function getScrollPosition() {
            this.scrollPosition = window.pageYOffset || document.body.scrollTop;
        }

        /**
         * Move scrollbar back to where it was before modal opened
         *
         * @function setScrollPosition
         */

    }, {
        key: 'setScrollPosition',
        value: function setScrollPosition() {
            document.documentElement.scrollTop = document.body.scrollTop = this.scrollPosition;
        }

        /**
         * Prevent scrolling on background page and double scroll bars
         *
         * @function hideInitialScroll
         */

    }, {
        key: 'hideInitialScroll',
        value: function hideInitialScroll() {
            document.body.classList.add(this.selectors.modal_active);
        }

        /**
         * Bring back scroll bar on background page
         *
         * @function displayInitialScroll
         */

    }, {
        key: 'displayInitialScroll',
        value: function displayInitialScroll() {
            document.body.classList.remove(this.selectors.modal_active);
        }

        /**
         * Find button with hash string and return href
         *
         * @function displayInitialScroll
         * @return {string} - href for non-js users
         */

    }, {
        key: 'findURL',
        value: function findURL(hash) {
            var modal_name = hash.substring(1);
            var launch_button = document.querySelector('[data-modal="' + modal_name + '"]');

            return launch_button.getAttribute('href');
        }

        /**
         * Ajax to get modal content
         *
         * @function fetch
         */

    }, {
        key: 'fetch',
        value: function fetch(href) {
            var _this = this;

            utility.ajax(href, function (data) {
                var html = data.querySelector('#' + _this.selectors.fragment_selector);
                _this.addContent(html);
            });
        }

        /**
         * Add content to modal
         *
         * @function addContent
         */

    }, {
        key: 'addContent',
        value: function addContent(html) {
            this.modalContent.appendChild(html);
            utility.init(html);
        }

        /**
         * Clear content from modal and make blank
         *
         * @function removeModalContents
         */

    }, {
        key: 'removeModalContents',
        value: function removeModalContents() {
            this.modalContent.innerHTML = "";
        }
    }]);

    return Modals;
}();

},{"../utilities/_utilities":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var settings = exports.settings = {
    animation: {
        default_timimg: 300
    }
};

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseHTML = exports.capitalise = exports.breakpoint = exports.ajax = exports.init = exports.settings = undefined;

var _settings = require('./_settings');

var _init = require('./init');

var _ajax = require('./ajax');

var _breakpoint = require('./breakpoint');

var _capitalise = require('./capitalise');

var _parsehtml = require('./parsehtml');

exports.settings = _settings.settings;
exports.init = _init.init;
exports.ajax = _ajax.ajax;
exports.breakpoint = _breakpoint.breakpoint;
exports.capitalise = _capitalise.capitalise;
exports.parseHTML = _parsehtml.parseHTML;

},{"./_settings":9,"./ajax":11,"./breakpoint":12,"./capitalise":13,"./init":14,"./parsehtml":15}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ajax = ajax;

var _parsehtml = require('./parsehtml');

/**
* Simple XHR utility.
*
* @param {string} url - The request source.
* @param {callback} callback - The callback of data recieved.
*/
function ajax(url, callback) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {

            var data = (0, _parsehtml.parseHTML)(request.responseText);
            callback(data);
        }
    };

    request.send();
}

},{"./parsehtml":15}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.breakpoint = breakpoint;
/**
* Get the breakpoint set on :before of <body> by CSS.
*
* @return {string} Breakpoint value.
*/
function breakpoint() {
    return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.capitalise = capitalise;
function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

var _modules = require('../modules/_modules');

/**
* Initalising via data attributes.
*
* @function init
* @param {object} context - HTML Fragment to initalise.
*/
function init(context) {

    // find all data js
    var js_modules = context.querySelectorAll('[data-init]');

    // for each occurance
    Array.from(js_modules).forEach(function (element) {

        // get class name
        var js_class = element.getAttribute('data-init');

        var properties = {};
        properties.element = element;

        // instantiate
        var module_instance = new _modules.modules[js_class](properties);
        module_instance.init();
    });
} /**
   * Dependencies
   */

},{"../modules/_modules":2}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseHTML = parseHTML;
/**
* Simple HTML parser utility.
*
* @param {string} url - The request source.
* @param {callback} callback - The callback of data recieved.
*/
function parseHTML(htmlString) {

    var html = document.implementation.createHTMLDocument("example");

    html.documentElement.innerHTML = htmlString;
    return html.body;
}

},{}]},{},[1]);
