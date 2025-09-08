import { useState } from "react";

//css file
import "../../../CSS_files/tasks.css";

//hooks
import useGlobalReducer from "../../../hooks/useGlobalReducer.jsx";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

//services
import taskServices from "../../../services/TaskList_API/taskServices.js";
import { showError, showSuccess } from "../../../services/toastService.js";

export const DeleteTaskBtn = (props) => {

    const { store, dispatch } = useGlobalReducer();

    const handleDelete = async () => {

        if (store.token) {

            const data = await taskServices.deleteOneTask(props.list_id, props.id);

            if (data.success) {
                //will delete from store after deling from backend
                dispatch({ type: "delete_one_task", payload: { id: props.list_id, task_id: props.id } });
                showSuccess("Task deleted successfully.");

            } else {
                showError(data.error || "Task could not be deleted, please try again.");
            }
        } else {
            dispatch({ type: "delete_one_task", payload: { id: props.list_id, task_id: props.id } });
            showSuccess("Task deleted successfully.");
        }

    }

    return (
        <button
            type="button"
            className="btn delete_task_btn pb-5 ms-2"
            onClick={handleDelete}>
            <FontAwesomeIcon icon={faDeleteLeft} />
        </button>
    );
}