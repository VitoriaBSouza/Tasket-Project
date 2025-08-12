//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

export const AddTaskBtn = () => {

    const setStatus = async () => {
        const newStatus = taskStatus === "pending" ? "completed" : "pending";
        setTaskStatus(newStatus);

        if (store.token) {
            const data = await taskServices.updateStatus(list_id, id, newStatus);

            if (data.success) {
                dispatch({ type: "update_task_status", payload: data.list });
            } else {
                showError(data.error || "Could not change the status of the task, please try again.");
                // revertir estado si error
                setTaskStatus(taskStatus);
            }
        } else {
            const list = store.lists.find(l => String(l.id) === String(id));
            dispatch({ type: "update_task_status", payload: list });
        }
    };

    return (
        <div className="col-12 col-md-4 col-lg-3 d-flex 
        justify-content-center mt-3 mt-lg-0 order-3 order-lg-2">
            <button type="button" className="btn border-0">
                <FontAwesomeIcon icon={faSquarePlus} className="add_task_btn" />
            </button>
            <button type="button" className="btn border-0">
                <FontAwesomeIcon icon={faThumbtack} className="pin_btn border-0 rounded-circle" />
            </button>
        </div>
    );
}