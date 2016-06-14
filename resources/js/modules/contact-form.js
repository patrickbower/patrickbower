import * as utility from '../utilities/_utilities';

const defaults = {
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
    constructor(context) {
        this.context = context;
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
    * @requires {function} ajax utility
    */
    submitForm () {

        let form = this.context.querySelector('.' + defaults.selectors.contact_form);
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

        let contact_section = this.context.querySelector('.' + defaults.selectors.contact_section);
        contact_section.classList.add('fade--out');

        const contact_confirm = document.createElement('div');
        contact_confirm.classList.add('animate--in');
        contact_confirm.appendChild(this.htmlFragment);
        this.context.appendChild(contact_confirm);

        setTimeout(function(){
            contact_section.classList.add('display--none');
            contact_confirm.classList.add('fade--in');
        }, utility.settings.animation.default_timimg);
    }
}
