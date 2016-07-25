import {ModelLaunch} from './model-launch';
import {ContactForm} from './contact-form';
import {Email} from './email';
import {BackButton} from './back-button';

let modules = {
    model: ModelLaunch,
    ['back-button']: BackButton,
    contact: ContactForm,
    email: Email
}

export {modules};
