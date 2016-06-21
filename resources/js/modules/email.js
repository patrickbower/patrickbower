import * as utility from '../utilities/_utilities';

const defaults = {
    element: undefined,
    email: {
        first: 'bower.patrick',
        last: 'gmail.com'
    }
}

/**
 * Create direct email link instead of linking
 * to contact form model.
 *
 * @module Email
 * @class Email
 */
export class Email {

    /**
     * @constructor
     * @param {object} element to add email button into.
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
        this.addEmail();
    }

    /**
     * Add direct email address button to limit spaming bots.
     *
     * @function addEmail
     */
    addEmail () {

        // construct button
        const anchor = document.createElement('a');
        anchor.setAttribute('class', 'button button--white');
        anchor.setAttribute('href', `mailto:${this.email.first}@${this.email.last}`);
        anchor.innerText = `${this.email.first}@${this.email.last}`;

        // append button
        this.element.appendChild(anchor);
    }
}
