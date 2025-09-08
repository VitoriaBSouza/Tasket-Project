import { useState, useEffect } from "react";

//css file
import "../../../CSS_files/tasks.css";

//hooks
import useGlobalReducer from "../../../hooks/useGlobalReducer.jsx";

//services
import taskServices from "../../../services/TaskList_API/taskServices.js";
import { showError, showSuccess } from "../../../services/toastService.js";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export const EditTaskBtn = (props) => {
    const { store, dispatch } = useGlobalReducer();

    const [taskData, setTaskData] = useState({
        id: "",
        list_id: "",
        comment: "",
        due_at: "",
        schedule_at: "",
        reminder_at: "",
        location: "",
        task: "",
    });

    useEffect(() => {
        if (props.list_id && props.id) {
            setTaskData({
                id: props.id,
                list_id: props.list_id,
                comment: props.comment,
                due_at: props.due_at,
                schedule_at: props.schedule_at,
                reminder_at: props.reminder_at,
                location: props.location || "",
                task: props.task || "",
            });
        }
    }, [props.id, props.list_id]);

    //this will limit the words for the task name
    //On the backend we also have limited but in case it is a guest we had to limit it here again.
    const handleChange = (e) => {
        const { name, value } = e.target;

        //apply word limit to task name only
        if (name === "task") {
            const wordLimit = 5;
            const words = value.trim().split(/\s+/);
            if (words.length > wordLimit) return;
        }

        setTaskData(prev => ({
            ...prev,
            [name]: value === "" ? "" : value,
        }));

    };

    //Will close the modal once we click o submit button
    const closeModal = () => {
        const modalEl = document.getElementById(`editTaskBtnModal-${props.id}`);
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!taskData.task) {
                showError("Please enter a task name.");
                return;
            }

            if (store.token) {
                const data = await taskServices.updateTask(
                    props.list_id,
                    props.id,
                    taskData
                );

                if (data.success) {
                    dispatch({ type: "edit_task", payload: data.task });
                    showSuccess("Task updated successfully.");
                    closeModal();
                } else {
                    showError(
                        data.error || "Task could not be updated, please try again."
                    );
                }
            } else {
                //will update on the session storage so it's saved
                const updatedTask = store.lists.map((list) =>
                    //will check if list exists before updating task details
                    list.id === taskData.list_id
                        ? {
                            ...list,
                            tasks: list.tasks.map((task) =>
                                task.id === taskData.id ? taskData : task
                            ),
                        }
                        : list
                );

                sessionStorage.setItem("lists", JSON.stringify(updatedTask));

                dispatch({ type: "edit_task", payload: updatedTask });
                showSuccess("List updated successfully.");
                closeModal();
            }
        } catch (error) {
            showError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="col-12 d-flex justify-content-end">
            <button
                type="button"
                className="btn border-0 m-2"
                data-bs-toggle="modal"
                data-bs-target={`#editTaskBtnModal-${props.id}`}
                data-bs-whatever="@mdo"
            >
                <FontAwesomeIcon icon={faPenToSquare} className="edit_btn" />
            </button>

            <div
                className="modal fade"
                id={`editTaskBtnModal-${props.id}`}
                tabIndex="-1"
                aria-labelledby={`editTaskBtnModalLabel-${props.id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5
                                className="modal-title fw-bold fs-3 title_modal"
                                id={`editTaskBtnModalLabel-${props.id}`}
                            >
                                Edit Task
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    document.activeElement?.blur();
                                }}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="task-title" className="col-form-label fs-5">
                                        Task:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control fs-5"
                                        id="task-title"
                                        name="task"
                                        required
                                        value={taskData.task || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="task-schedule"
                                        className="col-form-label fs-5"
                                    >
                                        Schedule:
                                    </label>

                                    <input
                                        type="datetime-local"
                                        className="form-control fs-5"
                                        id="task-schedule"
                                        name="schedule_at"
                                        value={taskData.schedule_at || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="task-due" className="col-form-label fs-5">
                                        Due date:
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="form-control fs-5"
                                        id="task-due"
                                        name="due_at"
                                        value={taskData.due_at || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="task-reminder"
                                        className="col-form-label fs-5"
                                    >
                                        Set reminder:
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="form-control fs-5"
                                        id="task-reminder"
                                        name="reminder_at"
                                        value={taskData.reminder_at || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="textareaTaskLocation">Location:</label>
                                    <textarea
                                        className="form-control fs-5"
                                        id="task-location"
                                        name="location"
                                        value={taskData.location || ""}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="textareaTaskComment">Comments:</label>
                                    <textarea
                                        className="form-control fs-5"
                                        id="task-comment"
                                        name="comment"
                                        value={taskData.comment || ""}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger border-2 fs-5 fw-bold"
                                        data-bs-dismiss="modal"
                                        onClick={() => {
                                            document.activeElement?.blur();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn_create fs-5"
                                        onClick={() => {
                                            document.activeElement?.blur();
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
