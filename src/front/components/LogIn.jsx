import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import userServices from "../services/TaskList_API/userServices.js"

export const LogIn = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await userServices.login(formData, rememberMe);

            if (data.success) {

                // Dispatch user data including token if needed
                dispatch({ type: "logIn", payload: { token: data.token, user: data.user } });

                //Will keep on home page but for users
                navigate("/")

            } else {
                //we can set another page here or change to a banner
                window.alert(data.error)
            }

        } catch (error) {
            console.log("Login error:", error);
            window.alert(error)
        }
    }

    return (
        <div className="row">
            <div className="col-11 col-sm-9 col-md-6 col-lg-4 border border-2 rounded p-4 my-1 mx-auto">
                <form onSubmit={handleSubmit} className="p-4">
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
                    <div className="mb-3 form-check">
                        <input type="checkbox"
                            className="form-check-input my-2 fs-5 border-2 form_checkbox"
                            id="check1"
                            onChange={(e) => setRememberMe(e.target.checked)} />
                        <label className="form-check-label fs-5" htmlFor="check1">Remember me</label>
                    </div>

                    <div className="d-grid gap-2 mb-4">
                        <button className="btn fs-5 logIn_btn border-0 py-3" type="submit">Log In</button>
                    </div>
                    <Link className="fs-5 text-dark fw-bold" 
                    to={"/forgot-password"}>
                        <p className="text-end">Forgot your password?</p>
                    </Link>
                </form>
            </div>
        </div>
    );
}