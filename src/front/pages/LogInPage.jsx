import { Link } from "react-router-dom";

//Components
import { LogIn } from "../components/LogIn";
import { ContactButton } from "../components/Contact_Page/contactButton";


export const LogInPage = () => {

    return (
        <div className="container-fluid py-4">
            <h1 className="text-center welcome_logIn my-3"> Welcome to <span className="me-3">Tasket</span>!</h1>
            <h1 className="text-center my-4 logIn_title">Log In</h1>
            <LogIn />
            <p className="text-center logInPage_signUp fs-5 my-3">
                First time here?
                <Link to={"/signup"} className="text-decoration-none">
                    <span className="ms-2">Sign Up now!</span>
                </Link></p>
            <div className='d-flex flex-column align-items-center mx-auto mb-5'>
                <p className="text-center fs-3 fw-bold fst-italic mt-3  p-2 pt-5">
                    Need our help?
                </p>
                <ContactButton />
            </div>
        </div>
    );
}