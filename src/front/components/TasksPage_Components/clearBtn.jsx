
//css file
import '../../CSS_files/tasks.css';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import taskServices from '../../services/TaskList_API/taskServices.js';
import { showError, showSuccess } from "../../services/toastService.js";

export const ClearBtn = ({id}) => {

    const { store, dispatch } = useGlobalReducer();

    const handleDelete = async () => {

        if (store.token) {
            const data = await taskServices.deleteAllTasks(id);

            if (data.success) {
                //will delete from store after deling from backend
                dispatch({ type: "delete_all_tasks", payload: id });
                showSuccess("All tasks were deleted successfully.");

            } else {
                showError(data.error || "Could not delete the tasks, please try again.");
            }
        } else {
            dispatch({ type: "delete_all_tasks", payload: id });
            showSuccess("All tasks were deleted successfully.");
        }

    }

    return (

        <>
            <button
                type="button"
                className="btn btn-outline-dark rounded-pill clear_btn border-2 me-3"
                data-bs-toggle="modal"
                data-bs-target="#deleteAllListsModal"
                disabled={!store.tasks || store.tasks.length === 0}>
                Clear List
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
                                    handleDelete();
                                }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}