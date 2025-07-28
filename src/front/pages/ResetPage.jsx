
//Components
import { ResetPasswd } from "../components/ResetPasswd";
import { ContactButton } from "../components/Contact_Page/contactButton";


export const ResetPage = () => {

    return(
        <div className="container-fluid py-4">
            <ResetPasswd />
            <p className="text-center fs-3 fw-bold fst-italic mt-5">Need our help?</p>
            <ContactButton />
        </div>
    );
}