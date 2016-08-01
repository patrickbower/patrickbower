import {ContactForm} from './contact-form';
import {Email} from './email';
import {BackButton} from './back-button';
import {InView} from './in-view';
import {Modal} from './modal';

let modules = {
    ['in-view']: InView,
    ['back-button']: BackButton,
    modal: Modal,
    contact: ContactForm,
    email: Email
}

export {modules};
