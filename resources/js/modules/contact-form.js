/**
 * Dependencies
 */
import {ajaxRequest} from '../utilities/ajax';
import {parseHTML} from '../utilities/parsehtml';

/**
 * Module settings
 */
const defaults = {
    selectors: {
        direct_link: 'js-contact--link',
        confirm_input: 'js-contact--confirm',
        submit_button: 'js-contact--submit',
        contact_section: 'js-contact--section'
    },
    email: {
        first: 'bower.patrick',
        last: 'gmail.com'
    }
}

/**
 * Enhance the contact form.
 *
 * @module Contact Form
 * @class ContactForm
 */
export class ContactForm {

    /**
     * Launches full page model.
     *
     * @constructor
     * @param {object} the origin module that launches the model
     */
    constructor(context) {
        this.context = context;

        // settings
        this.formAction = this.context.action;
    }

    /**
     * Initalise and setup at runtime.
     *
     * @function init
     */
    init () {
        // setup
        this.addEmail();
        this.hiddenInput();
        this.bindEvents();
    }

    /**
     * Add direct email address button to limit spaming bots.
     *
     * @function addEmail
     */
    addEmail () {

        // construct button
        const anchor = document.createElement('a');
        anchor.setAttribute('class', 'button button--mineshaft-lighten');
        anchor.setAttribute('href', `mailto:${defaults.email.first}@${defaults.email.last}`);
        anchor.innerText = `${defaults.email.first}@${defaults.email.last}`;

        // append button
        const direct_link = document.querySelector('.' + defaults.selectors.direct_link);
        direct_link.appendChild(anchor);
    }

    /**
     * Add event listners where requiried.
     *
     * @function bindEvents
     */
    bindEvents () {
        let instance = this;

        // submit button to send form
        let submit_form_event = {
            handleEvent: function(event) {
                event.preventDefault();
                instance.submitForm();
            }
        }

        let submit_button = this.context.querySelector('.' + defaults.selectors.submit_button);
        submit_button.addEventListener('click', submit_form_event);
    }

    /**
     * Prevent tabbing into hidden input placed to encourage spam bots.
     *
     * @function hiddenInput
     * @param contactForm - The module html.
     */
    hiddenInput () {
        let confirm = this.context.querySelector('.' + defaults.selectors.confirm_input);
        confirm.tabIndex = -1;
    }

    /**
    * Get content via Ajax.
    *
    * @function submitForm
    * @requires {function} ajaxRequest
    * @requires {function} parseHTML
    */
    submitForm () {
        // get parts from href string
        const [page_url, fragment_selector] = this.formAction.split('#');

        // ajax (util function)
        ajaxRequest(page_url, data => {

            // parse (util function), and append
            let html = parseHTML(data);
            this.htmlFragment = html.querySelector('.' + fragment_selector);

            this.confirmSubmit();
            this.confirmHeading();

        });
    }

    /**
     * Replace contact form with confermation message.
     *
     */
    confirmSubmit () {

        let contact_section = document.querySelector('.' + defaults.selectors.contact_section);
        contact_section.insertAdjacentHTML('beforebegin', this.htmlFragment.innerHTML);
        contact_section.remove();
    }

    /**
     * Replace heading string with witty retort.
     *
     */
    confirmHeading () {

        document.querySelector('h1').innerText = 'Said hello';
    }
}
