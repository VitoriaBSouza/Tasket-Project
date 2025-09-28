import { useState, useEffect } from "react";

//css file
import "../../../CSS_files/tasks.css";

//hooks
import useGlobalReducer from "../../../hooks/useGlobalReducer.jsx";

//services
import taskServices from "../../../services/TaskList_API/taskServices.js";
import { showError } from "../../../services/toastService.js";

export const UrgentTag = ({ list_id, task_id, tag_urgent, status }) => {

    const { store, dispatch } = useGlobalReducer();
    const [urgent, setUrgent] = useState(tag_urgent);

    useEffect(() => {
        setUrgent(tag_urgent);
    }, [tag_urgent]);

    const handleUrgent = async () => {

        const newUrgent = !urgent;
        setUrgent(newUrgent);

        if (store.token) {
            const data = await taskServices.updateUrgency(list_id, task_id, newUrgent);

            if (data.success) {
                dispatch({
                    type: "update_urgent_tag",
                    payload: {
                        list_id,
                        task_id,
                        urgent: data.task.urgent
                    }
                });
            } else {
                showError(data.error || "Could not add urgent tag to task, please try again.");
                setUrgent(urgent);
            }
        } else {
            //Check session storage for list
            const listsFromLocal = JSON.parse(sessionStorage.getItem("lists")) || [];

            // Will update task status and set urgent to false if completed
            const updatedLists = listsFromLocal.map(list => {
                if (String(list.id) === String(list_id)) {
                    const updatedTasks = (list.tasks || []).map(task => {
                        if (task.id === task_id) {
                            return {
                                ...task,
                                urgent: newUrgent,
                                updated_at: new Date().toUTCString()
                            };
                        }
                        return task;
                    });

                    return { ...list, 
                        tasks: updatedTasks, 
                        updated_at: new Date().toUTCString()
                    };
                }
                return list;
            });

            sessionStorage.setItem("lists", JSON.stringify(updatedLists));

            if (listsFromLocal) {
                dispatch({ type: "update_urgent_tag", payload: updatedLists });
            }
        }
    };


    return (
        <button
            type="button"
            className={`btn ms-auto border-2 urgent_btn btn-outline-danger 
                ${urgent ? 'btn-danger text-white' : 'btn-outline-danger'}`}
            onClick={handleUrgent}
            disabled={status === "completed"}>
            Urgent
        </button>
    );
}