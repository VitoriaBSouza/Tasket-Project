import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import userServices from "../services/TaskList_API/userServices.js"

export const SignUp = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [repeatPassword, setRepeatPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password === repeatPassword && termsAccepted && privacyAccepted) {
                const data = await userServices.signup(formData);

                if (data.success) {
                    dispatch({ type: "signUp" });
                    navigate("/login");
                } else {
                    window.alert(data.error || "Could not sign up, try again.");
                }

            } 
            else if (!termsAccepted || !privacyAccepted) {
                window.alert("You must accept the Terms of Service and Privacy Policy to sign up.");
            } else {
                window.alert("Passwords do not match. Please try again.");
            }
        } catch (error) {
            window.alert("An unexpected error occurred. Please try again later.");
        }
    }


    return (
        <div className="row">
            <div className="col-11 col-sm-9 col-md-6 col-lg-4 border border-2 rounded p-4 my-2 mx-auto">
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-3">
                        <label htmlFor="Username1" className="form-label fs-5">Username</label>
                        <input type="text"
                            name="username"
                            className="form-control border-2 py-2 fs-5" id="Username1"
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email1" className="form-label fs-5">Email</label>
                        <input type="email"
                            name="email"
                            className="form-control border-2 py-2 fs-5" id="Email1"
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password1" className="form-label fs-5">Password</label>
                        <input type="password"
                            name="password"
                            className="form-control border-2 py-2 fs-5"
                            id="password1"
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label fs-5">Repeat password</label>
                        <input type="password"
                            name="repeatPassword"
                            className="form-control border-2 py-2 fs-5"
                            id="password2"
                            onChange={(e) => setRepeatPassword(e.target.value)} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox"
                            className="form-check-input my-2 fs-5 border-2 form_checkbox my-3"
                            id="check1"
                            onChange={(e) => setTermsAccepted(e.target.checked)} />
                        <label className="form-check-label fs-5 my-2" htmlFor="check1">
                            Accept Terms of Service
                        </label>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox"
                            className="form-check-input my-2 fs-5 border-2 form_checkbox my-3"
                            id="check2"
                            onChange={(e) => setPrivacyAccepted(e.target.checked)} />
                        <label className="form-check-label fs-5 my-2" htmlFor="check2">
                            Accept Privacy Policy
                        </label>
                    </div>

                    <div className="d-grid gap-2">
                        <button className="btn fs-5 border-0 signUp_btn py-3" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}