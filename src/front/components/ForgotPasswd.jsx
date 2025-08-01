import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import userServices from "../services/TaskList_API/userServices.js"

export const ForgotPasswd = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const data = await userServices.forgotPassword(formData.email);

            if (data.success) {
                // Dispatch user data including token if needed
                dispatch({ type: "forgotPasswd", payload: data.user });

                alert(data.message)
                navigate("/")

            } else {
                //we can set another page here or change to a banner
                window.alert(data.error)
            }

        } catch (error) {
            window.alert(error)
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-9 ms-auto">
                <h1 className="ms-4 my-5 forgot_title">Forgot Your Password?</h1>
            </div>
            <div className="col-11 col-sm-9 col-md-7 col-lg-5 border border-2 rounded p-2 my-2 mx-auto">
                <p className="m-4 mb-1 fw-bold fs-5 lh-1">
                    Enter your email address and we’ll send you a link to reset your password.
                </p>
                <form onSubmit={handleReset} className="p-5">
                    <div className="mb-3">
                        <label htmlFor="Email1" className="form-label fs-4">Email</label>
                        <input type="email"
                            name="email"
                            className="form-control border-2 py-2 fs-4" id="Email1"
                            onChange={handleChange} />
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-center mt-4">
                        <button className="btn fs-4 border-0 py-3 m-2" type="button">
                            <Link to={"/"} className="text-decoration-none fw-bold text-dark">Cancel</Link>
                        </button>
                        <button className="btn btn-danger fs-4 border-0 py-2 m-2" type="sumit">Reset Password</button>
                    </div>

                </form>
            </div>
        </div>
    );
}