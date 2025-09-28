import { useParams } from "react-router-dom";
import { useState } from 'react';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import taskServices from "../../services/TaskList_API/taskServices.js";
import { showError, showSuccess } from "../../services/toastService.js";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

//components
import { PopOver } from "../PopOver.jsx";

export const AddTaskBtn = () => {

    const { id } = useParams();
    const list_id = Number(id)

    const [taskData, setTaskData] = useState({
        list_id: list_id || "",
        comment: "",
        due_at: "",
        schedule_at: "",
        reminder_at: "",
        location: "",
        task: "",
    });

    const { store, dispatch } = useGlobalReducer();

    const currentList = store.lists?.find(l => l.id === list_id);
    const tasksCount = currentList?.tasks?.length || 0;

    // Will close the modal once we click on submit button
    const closeModal = () => {
        document.activeElement?.blur();

        const modalEl = document.getElementById("addTaskBtnModal"); // tu id exacto
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    };

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

    const addTask = async (e) => {
        e.preventDefault();

        if (store.token) {
            const data = await taskServices.addTask(id, taskData);

            if (data.success) {
                dispatch({ type: "add_task", payload: data.task });
                closeModal();
                showSuccess("Task added successfully");
                setTaskData({
                    comment: "",
                    due_at: "",
                    schedule_at: "",
                    reminder_at: "",
                    location: "",
                    task: "",
                });
            } else {
                showError(data.error || "Task could not be added, please try again.");
            }
        } else {

            const newTask = {
                id: Date.now(),
                list_id: list_id,
                ...taskData,
                status: "Pending",
                updated_at: new Date().toUTCString(),
                urgent: false,
            };

            // Will get sessionStorage lists or show empty array
            const listsFromLocal = JSON.parse(sessionStorage.getItem("lists")) || [];

            // Check if the list exists in local storage
            const listExists = listsFromLocal.some(list => list.id === newTask.list_id);

            let updatedLists = [];

            if (listExists) {
                // If exists will add the task to the list
                updatedLists = listsFromLocal.map(list => {
                    if (list.id === newTask.list_id) {
                        const taskWithDates = {
                            ...newTask,
                            // Need to convert to UTC string so we render date correcly
                            schedule_at: newTask.schedule_at ? new Date(newTask.schedule_at).toUTCString() : "",
                            due_at: newTask.due_at ? new Date(newTask.due_at).toUTCString() : "",
                            reminder_at: newTask.reminder_at ? new Date(newTask.reminder_at).toUTCString() : "",
                        };
                        return {
                            ...list,
                            tasks: [...(list.tasks || []), taskWithDates],
                            updated_at: new Date().toUTCString()
                        };
                    }
                    return list;
                });
            }

            //Will save updated list to session storage
            sessionStorage.setItem("lists", JSON.stringify(updatedLists));

            // Update store so UI reflects immediately
            dispatch({ type: "get_all_lists", payload: updatedLists });
            closeModal();
            showSuccess("Task added successfully");
            setTaskData({
                comment: "",
                due_at: "",
                schedule_at: "",
                reminder_at: "",
                location: "",
                task: "",
            });
        };
    }

    return (
        <>
            {tasksCount >= 14 ?
                <PopOver
                    content={"You have reached the maximum number of tasks. Please delete some tasks or create a new list."}>
                    <button
                        type="button"
                        className="btn border-0">
                        <FontAwesomeIcon icon={faCirclePlus} className="add_task_btn" />
                    </button>
                </PopOver>
                :
                <button
                    type="button"
                    className="btn border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#addTaskBtnModal"
                    data-bs-whatever="@mdo">
                    <FontAwesomeIcon icon={faCirclePlus} className="add_task_btn" />
                </button>}

            <div
                className="modal fade"
                id="addTaskBtnModal"
                tabIndex="-1"
                aria-labelledby="addTaskBtnModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5
                                className="modal-title fw-bold fs-3 title_modal"
                                id="addTaskBtnModalLabel"
                            >
                                Create Task
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
                            <form onSubmit={addTask}>
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
                                        value={taskData.task}
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
                                        value={taskData.schedule_at}
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
                                        value={taskData.due_at}
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
                                        value={taskData.reminder_at}
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
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}