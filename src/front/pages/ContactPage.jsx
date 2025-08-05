
//components
import { ContactForm } from "../components/Contact_Page/ContactForm";
import { FaqButton } from "../components/Contact_Page/faqButton";

export const ContactPage = () => {

    return (
        <div className="container-fluid">
    
            <div className="row mt-5 mb-3">
                <div className="col-7 col-md-9 col-lg-6 ps-md-5 text-center text-md-start p-2 mx-auto">
                    <h1 className="ms-md-5 contact_form_title">Contact Us!</h1>
                </div>
                 <div className="col-5 col-md-3  col-lg-6 ps-md-5 text-center text-md-start p-2 mx-auto">
                    <h4 className="ms-md-5">Button here</h4>
                </div>
            </div>

            <div className="row mt-3 mb-5">
                <div className="col-12 col-md-7 mx-auto mt-5">
                    <FaqButton />
                </div>
            </div>

            <p className="text-center fs-5 mt-3">
                If the contact form doesn’t work use the <span className="fw-bold">Report</span> button
            </p>
            <ContactForm />
        </div>
    );
}