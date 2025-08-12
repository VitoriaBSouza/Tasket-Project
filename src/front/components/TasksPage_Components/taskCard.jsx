import { useState } from "react";

//css file
import '../../CSS_files/tasks.css';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import taskServices from "../../services/TaskList_API/taskServices";
import { showError } from "../../services/toastService.js";

//components
import { UrgentTag } from "./urgentTag";


export const TaskCard = ({ id, task, status, list_id, urgent }) => {

    const [taskStatus, setTaskStatus] = useState(status);
    const { store, dispatch } = useGlobalReducer();

    const setStatus = async () => {

        //save current status in case it fails to udpate will go back to original
        const oldStatus = taskStatus;

        //will check current status and updated based on how we change on toggle
        const newStatus = taskStatus === "pending" ? "completed" : "pending";
        setTaskStatus(newStatus);

        if (store.token) {

            //if user is logged will update the task status on database
            const data = await taskServices.updateStatus(list_id, id, newStatus);

            //if success will change urgent tag to false if any so we do ont show on urgent tasks scroll
            if (data.success) {
                if (newStatus === "completed") {

                    const urgent = await taskServices.updateUrgency(list_id, id, false);

                    if (urgent.success) {
                        dispatch({
                            type: "update_task_status",
                            payload: data.list,
                        });

                        dispatch({
                            type: "update_urgent_tag",
                            payload: {
                                list_id,
                                id,
                                urgent: false
                            }
                        });
                    } else {
                        showError(urgent.error || "Could not remove urgent tag.");
                        setTaskStatus(oldStatus);
                    }
                } else {
                    dispatch({
                        type: "update_task_status",
                        payload: data.list,
                    });
                }
            } else {
                showError(data.error || "Could not change the status of the task, please try again.");
                setTaskStatus(oldStatus);
            }
        } else {
            const list = store.lists.find(l => String(l.id) === String(list_id));
            dispatch({
                type: "update_task_status",
                payload: list,
            });
            if (list) {
                dispatch({ type: "update_urgent_tag", payload: list });
            }
        }
    };


    return (
        <div class="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    <div className="form-check form-switch d-flex align-items-center mt-1 custom-switch">

                        <div className="form-check form-switch align-self-center">
                            <input
                                className="form-check-input fs-5 check_input border-0 mt-3 mt-md-2"
                                type="checkbox"
                                id={"flexSwitchCheckDefault_" + id}
                                checked={taskStatus === "completed"}
                                onChange={setStatus} />
                            <label
                                className="form-check-label p-1 fs-6 lh-sm m-1"
                                htmlFor={"flexSwitchCheckDefault_" + id}>{task}</label>
                        </div>
                        <UrgentTag
                            task_id={id}
                            list_id={list_id}
                            tag_urgent={urgent}
                            status={status}
                        />
                        <button
                            type="button"
                            className="btn-close align-self-center m-3 fs-6"
                            aria-label="Close"></button>

                    </div>
                </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionTask">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
            </div>
        </div>

    );
}