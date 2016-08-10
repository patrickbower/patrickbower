import {ContactForm} from './contact-form';
import {Email} from './email';
import {BackButton} from './back-button';
import {InView} from './in-view';
import {Modal} from './modal';
import {ModalEvents} from './modal-events';

let modules = {
    ['in-view']: InView,
    ['back-button']: BackButton,
    modal: Modal,
    contact: ContactForm,
    ['modal-events']: ModalEvents,
    email: Email
}

export {modules};
