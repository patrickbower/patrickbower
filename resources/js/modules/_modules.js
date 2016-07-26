import {ModelLaunch} from './model-launch';
import {ContactForm} from './contact-form';
import {Email} from './email';
import {BackButton} from './back-button';
import {InView} from './in-view';

let modules = {
    ['in-view']: InView,
    model: ModelLaunch,
    ['back-button']: BackButton,
    contact: ContactForm,
    email: Email
}

export {modules};
