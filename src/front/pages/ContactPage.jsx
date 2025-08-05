
//components
import { ContactForm } from "../components/Contact_Page/Contactform";
import { FaqButton } from "../components/Contact_Page/faqButton";

export const ContactPage = () => {

    return (
        <div className="container-fluid">
            <FaqButton />
            <ContactForm />
        </div>
    );
}