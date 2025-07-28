import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import userServices from "../services/TaskList_API/userServices.js"

export const ResetPasswd = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { token } = useParams();

    const [passwordData, setPasswordData] = useState({
        password: "",
    })

    const [repeatPasswd, setRepeatPasswd] = useState("")

    const handleChange = e => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        })
    }

    const handlePassword = async (e) => {
        e.preventDefault();

        try {
            if (passwordData.password == repeatPasswd) {
                const data = await userServices.resetPassword(token, passwordData.password);

                if (data.success) {

                    // Dispatch user data including token if needed
                    dispatch({ type: "resetPasswd" });
                    navigate("/login");

                } else {
                    //we can set another page here or change to a banner
                    window.alert(data.error)
                }

            } else {
                window.alert("Your passwords do not match.")
            }

        } catch (error) {
            window.alert(error)
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-9 ms-auto">
                <h1 className="ms-4 my-5 forgot_title">Reset Password</h1>
            </div>
            <div className="col-11 col-sm-9 col-md-7 col-lg-5 border border-2 rounded p-2 my-2 mx-auto">
                <p className="m-4 mb-1 fw-bold fs-5 lh-1">
                    Add your new password. You will be redirected to Log In page after.
                </p>
                <form onSubmit={handlePassword} className="p-5">
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
                            onChange={(e) => setRepeatPasswd(e.target.value)} />
                    </div>

                    <div class="d-grid gap-2 d-md-flex justify-content-center mt-4">
                        <button class="btn btn-danger fs-4 border-0 p-3 m-2" type="submit">
                            Update Password
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}