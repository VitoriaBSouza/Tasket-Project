
//css file
import '../../CSS_files/tasks.css';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import listServices from '../../services/TaskList_API/listServices.js';

//services
import taskServices from '../../services/TaskList_API/taskServices.js';
import { showError, showSuccess } from "../../services/toastService.js";

export const ClearAllTasksBtn = (props) => {

    const { store, dispatch } = useGlobalReducer();
    const list_id = Number(props.id);

    // Will close the modal once we click on submit button
    const closeModal = () => {
        document.activeElement?.blur();

        const modalEl = document.getElementById("deleteAllTasksModal"); // tu id exacto
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    };

    const handleClearList = async () => {
        if (store.token) {
            const data = await taskServices.deleteAllTasks(list_id);

            if (data.success) {

                const updateList = await listServices.updateList(list_id, {
                    status: "Pending"
                });

                if (updateList.success) {
                    dispatch({
                        type: "delete_all_tasks",
                        payload: { listId: list_id, status: "Pending" }
                    });
                    closeModal();
                    showSuccess("All tasks were deleted successfully.");
                } else {
                    showError(updateList.error || "Could not update the list status, please try again.");
                }
            } else {
                showError(data.error || "Could not delete the tasks, please try again.");
            }
        } else {
           
            dispatch({
                type: "delete_all_tasks",
                payload: { listId: list_id, status: "Pending" }
            });
            closeModal();
            showSuccess("All tasks were deleted successfully.");
        }
    };


    return (

        <>
            <button
                type="button"
                className="btn btn-outline-dark rounded-pill clear_btn border-2 me-3"
                data-bs-toggle="modal"
                data-bs-target="#deleteAllTasksModal"
                disabled={
                    !store.lists?.find((list) => list.id === list_id)?.tasks?.length > 0
                }>
                Clear List
            </button>

            <div
                className="modal fade"
                id="deleteAllTasksModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticClearTasksBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold fs-2"
                                id="staticClearTasksBackdropLabel">
                                Delete All lists
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => { document.activeElement?.blur() }}></button>
                        </div>
                        <div className="modal-body fs-5 p-4 lh-sm">
                            Would you like to delete all the task of this list?
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
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-danger fs-5"
                                onClick={() => {
                                    document.activeElement?.blur();
                                    handleClearList();
                                }}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}