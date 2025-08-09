import { useNavigate } from "react-router-dom";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import userServices from "../services/TaskList_API/userServices.js"
import { showError, showSuccess } from "../services/toastService.js";

//components
import { EditProfile } from "../components/EditProfile.jsx";

export const ProfilePage = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        try {
            const resultado = await userServices.deleteUser();
            if (resultado.success) {
                dispatch({ type: "logout" });
                showSuccess("Your account has been deleted");
                navigate("/");
            } else {
                showError("Failed to delete account: " + (result.error || "Unknown error"));
            }
        } catch (error) {
           showError("An error occurred: " + (error.message || error));
        }
    };

    return (
        <div className="container-fluid">
            <h1 className="text-center mt-5 mb-2 user_page_title mx-auto">
                Welcome <span className="text-capitalize">{store.user?.username}</span> !
            </h1>

            <div className="d-flex justify-content-end mb-3">
                <button
                type="button"
                className="btn btn-outline-danger rounded-pill border-2 fw-bold mb-5 me-4"
                onClick={handleDeleteAccount}
                >
                    Delete Account
                </button>
            </div>

            <EditProfile />
        </div>
    );
}