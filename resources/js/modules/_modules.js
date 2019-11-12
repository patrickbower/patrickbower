import { ContactForm } from "./contact-form";
import { BackButton } from "./back-button";
import { InView } from "./in-view";
import { Modals } from "./modals";
import { Modal } from "./modal";

let modules = {
  ["in-view"]: InView,
  ["back-button"]: BackButton,
  modals: Modals,
  modal: Modal,
  contact: ContactForm
};

export { modules };
