import { useNavigate } from "react-router-dom";

//css file
import '../../CSS_files/tasks.css';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import listServices from "../../services/TaskList_API/listServices.js";
import { showError, showSuccess } from "../../services/toastService.js";

export const DeleteListBtn = ({ id }) => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    // Will close the modal once we click on submit button
    const closeModal = () => {
        document.activeElement?.blur();

        const modalEl = document.getElementById("deleteAllListsModal");
        if (modalEl) {
            let modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (!modalInstance) modalInstance = new bootstrap.Modal(modalEl);
            modalInstance.hide();
        }

        // clean any backdrop if left
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.parentNode.removeChild(backdrop);

        // removed class that prevents to scroll
        document.body.classList.remove('modal-open');
    };


    const handleDelete = async () => {

        if (store.token) {

            const data = await listServices.deleteList(id);

            if (data.success) {
                //will delete from store after deling from backend
                dispatch({ type: "delete_list", payload: id });
                showSuccess("List deleted successfully.");
                closeModal();
                navigate("/my-lists", { replace: true })

            } else {
                showError(data.error || "Could not delete the list, please try again.");
            }
        } else {
            dispatch({ type: "delete_list", payload: id });
            showSuccess("List deleted successfully.");
            closeModal();
            navigate("/my-lists", { replace: true })
        }

    }


    return (<>
        <button
            type="button"
            className="btn btn-danger rounded-pill delete_list_btn border-2 me-3"
            data-bs-toggle="modal"
            data-bs-target="#deleteListModal">
            Delete List
        </button>

        <div className="modal fade" id="deleteListModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                        Would you like to delete this list?
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
                                handleDelete();
                            }}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}