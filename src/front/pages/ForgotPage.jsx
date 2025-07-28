
//Components
import { ForgotPasswd } from "../components/ForgotPasswd";
import { ContactButton } from "../components/Contact_Page/contactButton";


export const ForgotPage = () => {

    return(
        <div className="container-fluid py-4">
            <ForgotPasswd />
            <p className="text-center fs-3 fw-bold fst-italic mt-5">Need our help?</p>
            <ContactButton />
        </div>
    );
}