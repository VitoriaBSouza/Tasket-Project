
//Components
import { ResetPasswd } from "../components/ResetPasswd";
import { ContactButton } from "../components/Contact_Page/contactButton";
import { FaqButton } from "../components/Contact_Page/faqButton";


export const ResetPage = () => {

    return (
        <div className="container-fluid py-4">
            <ResetPasswd />
            <div className='d-flex flex-column align-items-center mx-auto mb-5'>
                <p className="text-center fs-3 fw-bold fst-italic mt-3  p-2 pt-5">
                    Need our help?
                </p>
                <ContactButton />
            </div>
            <div className='mt-5 w-75 mx-auto'>
                <FaqButton />
            </div>
        </div>
    );
}