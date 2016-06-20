import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    selectors: {
        direct_link: 'js-contact--link',
        contact_form: 'js-contact--form',
        submit_button: 'js-contact--submit',
        confirm_input: 'js-contact--confirm',
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
    init () {
        // this.addEmail();
        this.hiddenInput();
        this.bindEvents();
    }

    /**
     * Add direct email address button to limit spaming bots.
     *
     * @function addEmail
     */
    // addEmail () {
    //
    //     // construct button
    //     const anchor = document.createElement('a');
    //     anchor.setAttribute('class', 'button button--mineshaft-lighten');
    //     anchor.setAttribute('href', `mailto:${this.email.first}@${this.email.last}`);
    //     anchor.innerText = `${this.email.first}@${this.email.last}`;
    //
    //     // append button
    //     const direct_link = document.querySelector('.' + this.selectors.direct_link);
    //     direct_link.appendChild(anchor);
    // }

    /**
     * Add event listners where requiried.
     *
     * @function bindEvents
     */
    bindEvents () {
        let instance = this;

        // form submit button
        let submit_form_event = {
            handleEvent: function(event) {
                event.preventDefault();
                instance.submitForm();
            }
        }

        let submit_button = this.element.querySelector('.' + this.selectors.submit_button);
        submit_button.addEventListener('click', submit_form_event);
    }

    /**
     * Prevent tabbing into hidden input placed to encourage spam bots.
     *
     * @function hiddenInput
     * @param contactForm - The module html.
     */
    hiddenInput () {
        let confirm = this.element.querySelector('.' + this.selectors.confirm_input);
        confirm.tabIndex = -1;
    }

    /**
    * Get content via Ajax.
    *
    * @function submitForm
    * @requires {function} ajax utility
    */
    submitForm () {

        let form = this.element.querySelector('.' + this.selectors.contact_form);
        let formAction = form.action;

        const [page_url, fragment_selector] = formAction.split('#');

        utility.ajax(page_url, data => {
            this.htmlFragment = data.querySelector('.' + fragment_selector);

            this.confirmSubmit();
        });
    }

    /**
     * Replace contact form with confermation message.
     *
     */
    confirmSubmit () {

        // fade out content
        let contact_section = this.element.querySelector('.' + this.selectors.contact_section);
        contact_section.classList.add('fade--out');

        // build confirm element
        const contact_confirm = document.createElement('div');
        contact_confirm.classList.add('animate--in');
        contact_confirm.appendChild(this.htmlFragment);
        this.element.appendChild(contact_confirm);

        // add and fade in when content faded out
        setTimeout(function(){
            contact_section.classList.add('display--none');
            contact_confirm.classList.add('fade--in');
        }, utility.settings.animation.default_timimg);
    }
}
