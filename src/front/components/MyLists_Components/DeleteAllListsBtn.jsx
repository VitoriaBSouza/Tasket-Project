//css file
import '../../CSS_files/myLists.css';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import listServices from "../../services/TaskList_API/listServices.js";
import { showError, showSuccess } from "../../services/toastService.js";

export const DeleteAllListsBtn = () => {

    const { store, dispatch } = useGlobalReducer();

    // Will close the modal once we click on submit button
    const closeModal = () => {
        // Forzar blur del elemento enfocado
        document.activeElement?.blur();

        const modalEl = document.getElementById("deleteAllListsModal"); // tu id exacto
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    };

    const handleDeleteAll = async () => {
        if (store.token) {
            const data = await listServices.deleteAllLists();

            if (data.success) {
                //will delete from store after deling from backend
                dispatch({ type: "delete_all_lists"});
                showSuccess("All lists deleted successfully.");
                closeModal();

            } else {
                showError(data.error || "Could not delete the lists, please try again.");
            }
        } else {
            dispatch({ type: "delete_all_lists"});
            showSuccess("All lists deleted successfully.");
            closeModal();
        }
    }

    return (

        <>
            <button
                type="button"
                className="btn btn-outline-dark border-2 rounded-pill m-2 delete_all_lists_btn"
                data-bs-toggle="modal"
                data-bs-target="#deleteAllListsModal"
                disabled={!store.lists || store.lists.length === 0}>
                Delete All
            </button>

            <div className="modal fade" id="deleteAllListsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold fs-2" id="staticBackdropLabel">Delete All lists</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => { document.activeElement?.blur() }}></button>
                        </div>
                        <div className="modal-body fs-5 p-4 lh-sm">
                            Would you like to delete all the lists you have created?
                            <br />
                            <br />
                            Kindly note once deleted cannot be undone.
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-dark border-2 fw-bold fs-5"
                                data-bs-dismiss="modal"
                                onClick={() => { document.activeElement?.blur() }}>
                                Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-danger fs-5"
                                onClick={() => {
                                    document.activeElement?.blur();
                                    handleDeleteAll();
                                }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}