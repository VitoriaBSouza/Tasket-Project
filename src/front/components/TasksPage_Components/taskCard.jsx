import { useState } from "react";

//css file
import "../../CSS_files/tasks.css";

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

//services
import taskServices from "../../services/TaskList_API/taskServices";
import { showError } from "../../services/toastService.js";

//components
import { UrgentTag } from "./urgentTag";
import { EditTaskBtn } from "./editTaskBtn.jsx";

export const TaskCard = (props) => {
    const [taskStatus, setTaskStatus] = useState(props.status);
    const { store, dispatch } = useGlobalReducer();

    const formatForInput = (isoString) => isoString ? isoString.slice(0, 22) : "";

    const setStatus = async () => {
        //save current status in case it fails to udpate will go back to original
        const oldStatus = taskStatus;

        //will check current status and updated based on how we change on toggle
        const newStatus = taskStatus === "pending" ? "completed" : "pending";
        setTaskStatus(newStatus);

        if (store.token) {
            //if user is logged will update the task status on database
            const data = await taskServices.updateStatus(
                props.list_id,
                props.id,
                newStatus
            );

            //if success will change urgent tag to false if any so we do ont show on urgent tasks scroll
            if (data.success) {
                if (newStatus === "completed") {
                    const urgent = await taskServices.updateUrgency(
                        props.list_id,
                        props.id,
                        false
                    );

                    if (urgent.success) {
                        dispatch({
                            type: "update_task_status",
                            payload: data.list,
                        });

                        dispatch({
                            type: "update_urgent_tag",
                            payload: {
                                list_id: props.list_id,
                                id: props.id,
                                urgent: false,
                            },
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
                showError(
                    data.error ||
                    "Could not change the status of the task, please try again."
                );
                setTaskStatus(oldStatus);
            }
        } else {
            const list = store.lists.find(
                (l) => String(l.id) === String(props.list_id)
            );
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
        <div className="accordion-item mb-3">
            <h2 className="accordion-header d-flex" id={"flush-heading" + props.id}>
                <div
                    className="accordion-button collapsed d-flex align-items-center 
                    me-4 task_details_btn"
                    data-bs-toggle="collapse"
                    data-bs-target={"#flush-collapse" + props.id}
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                >
                    <div className="form-check form-switch align-self-center w-75">
                        <input
                            className="form-check-input fs-5 check_input border-0 mt-3 mt-md-2"
                            type="checkbox"
                            id={"flexSwitchCheckDefault_" + props.id}
                            checked={taskStatus === "completed"}
                            onChange={setStatus}
                        />
                        <p className="form-check-label p-1 fs-6 lh-sm m-1">
                            {props.task}
                        </p>

                    </div>

                </div>

                <UrgentTag
                    task_id={props.id}
                    list_id={props.list_id}
                    tag_urgent={props.urgent}
                    status={props.status}
                />

                <button
                    type="button"
                    className="btn delete_task_btn mt-2 ms-2">
                    <FontAwesomeIcon icon={faDeleteLeft} />
                </button>

            </h2>

            <div
                id={"flush-collapse" + props.id}
                className="accordion-collapse collapse"
                aria-labelledby={"flush-heading" + props.id}
                data-bs-parent="#accordionTask"
            >
                <div className="accordion-body">
                    <div className="row">
                        <EditTaskBtn
                            key={props.id}
                            id={props.id}
                            list_id={store.list?.id}
                            task={props.task}
                            status={props.status}
                            urgent={props.urgent}
                            comment={props.comment}
                            due_at={props.due_at}
                            location={props.location}
                            reminder_at={props.reminder_at}
                            schedule_at={props.schedule_at}
                            updated_at={props.updated_at}
                        />

                        <div className="col-12 col-md-4 col-xl-4">
                            <p className="fw-bold m-0">Scheduled:</p>
                            <p className="fs-6 lh-sm">{formatForInput(props.schedule_at)}</p>
                        </div>
                        <div className="col-12 col-md-4">
                            <p className="fw-bold m-0">Due date:</p>
                            <p className="fs-6 lh-sm">{formatForInput(props.due_at)}</p>
                        </div>
                        <div className="col-12 col-md-4">
                            <p className="fw-bold m-0">Set reminder:</p>
                            <p className="fs-6 lh-sm">{formatForInput(props.reminder_at)}</p>
                        </div>
                        <div className="col-12 col-md-4">
                            <p className="fw-bold m-0">Location:</p>
                            <p p className="fs-6 lh-sm">{props.location}</p>
                        </div>

                        <div className="col-12">
                            <p className="fw-bold m-0">Comments:</p>
                            <p p className="fs-6 lh-sm">{props.comment}</p>
                        </div>

                        <p className="text-end fs-6 text-secondary fst-italic">
                            Last update: {formatForInput(props.updated_at)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
