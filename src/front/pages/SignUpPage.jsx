import { Link } from "react-router-dom";

//Components
import { ContactButton } from "../components/Contact_Page/contactButton";
import { SignUp } from "../components/SignUp";


export const SignUpPage = () => {

    return(
        <div className="container-fluid py-5">
            <h1 className="text-center welcome_logIn my-3"> Welcome to <span className="me-3">Tasket</span>!</h1>
            <h1 className="text-center my-4 logIn_title">Sign Up</h1>
            <p className="text-center fs-4 my-3 fw-bold lh-sm my-5">
                Already have an account?
                <br />
                <Link className="text-decoration-none" to={"/forgot-password"}>
                    <span className="mx-2 signUpPage_reset text-decoration-none">Reset your password</span>
                </Link> 
                or 
                <Link to={"/login"} className="text-decoration-none">
                    <span className="ms-2 signUpPage_logIn">Log In</span>
                </Link>.
            </p>
            <SignUp />
            <div className='d-flex flex-column align-items-center mx-auto mb-5'>
                <p className="text-center fs-3 fw-bold fst-italic mt-3  p-2 pt-5">
                    Need our help?
                </p>
                <ContactButton />
            </div>
        </div>
    );
}