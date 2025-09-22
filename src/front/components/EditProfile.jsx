import { useState, useEffect } from "react";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import userServices from "../services/TaskList_API/userServices.js"
import { showError, showSuccess } from "../services/toastService.js";

export const EditProfile = () => {

    const { store, dispatch } = useGlobalReducer();
    const formatForInput = (isoString) => isoString ? isoString.slice(0, 22) : "";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        photo_url:""
    })

    const [repeatPassword, setRepeatPassword] = useState("");

    useEffect(() => {
        if (store.user) {
            setFormData({
                email: store.user.email || "",
                username: store.user.username || "",
                password: "",
            });
        }
    }, [store.user]);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result;
            setFormData({...formData, photo_url: base64Image})
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password === repeatPassword) {

                //Makes copy of the formData
                const dataToSend = { ...formData };

                //If password field is blank will not send it
                if (!dataToSend.password.trim()) {
                    delete dataToSend.password;
                }
                const data = await userServices.editUser(dataToSend);

                if (data.success) {
                    dispatch({ type: "edit_profile", payload: data.user });
                    showSuccess("Your profile has been updated.")
                    setRepeatPassword("");
                } else {
                    showError(data.error || "Could not update profile, try again.");
                }
            } else {
                showError("Passwords do not match. Please try again.");
            }

        } catch (error) {
            showError("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <div className="row">
            <div className="col-12 ps-md-5 text-center text-md-start">
                <h1 className="mb-5 ms-md-5 forgot_title">My Profile</h1>
            </div>
            <div className="col-11 col-sm-9 col-md-6 col-lg-5 border border-2 rounded p-4 mt-2 mb-5 mx-auto">
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-3 text-center">
                        <label htmlFor="user_img_profile_form" className="form-label">
                            <img
                                src={store.user?.photo_url}
                                alt="User"
                                className="user_img_profile_page"
                            />
                        </label>
                        <input 
                        className="form-control w-50 mx-auto mt-3 d-none" 
                        type="file" 
                        name="photo_url"
                        onChange={handleFileChange}
                        id="user_img_profile_form"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Username1" className="form-label fs-5">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            className="form-control border-2 py-2 fs-5" id="Username1"
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email1" className="form-label fs-5">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="form-control border-2 py-2 fs-5" id="Email1"
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password1" className="form-label fs-5">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            className="form-control border-2 py-2 fs-5"
                            id="password1"
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label fs-5">Repeat password</label>
                        <input
                            type="password"
                            name="repeatPassword"
                            value={repeatPassword}
                            className="form-control border-2 py-2 fs-5"
                            id="password2"
                            onChange={(e) => setRepeatPassword(e.target.value)} />
                    </div>

                    <div className="d-grid gap-2">
                        <button className="btn fs-5 border-0 signUp_btn py-3" type="submit">Update</button>
                    </div>

                    <p className="text-end m-3 fs-5">{formatForInput(store.user?.updated_at)}</p>
                </form>
            </div>
        </div>
    );
}