
//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import taskServices from "../../services/TaskList_API/taskServices.js";
import { showError, showSuccess } from "../../services/toastService.js";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const PinListBtn = (props) => {

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

    const { store, dispatch } = useGlobalReducer();

    // Will close the modal once we click on submit button
    const closeModal = () => {
        document.activeElement?.blur();

        const modalEl = document.getElementById("crateBtnModal"); // tu id exacto
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    };

    const addTask = async () => {

        if (store.token) {
            const data = await taskServices.addTask(props.list_id, props.id, taskData);

            if (data.success) {
                dispatch({ type: "add_task", payload: data.task });
                closeModal();
                showSuccess("Task added successfully");
                setTaskData({
                    id: "",
                    list_id: "",
                    comment: "",
                    due_at: "",
                    schedule_at: "",
                    reminder_at: "",
                    location: "",
                    task: "",
                })
            } else {
                showError(data.error || "Task could not be added, please try again.");
            }
        } else {
            const newTask = {
                //this will generate an id based on the time was created
                id: Date.now(),
                ...taskData,
                status: "Pending",
            };

            const createTask = store.lists.map((list) =>
                //will check if list exists before updating task details
                list.id === newTask.list_id
                    ? {
                        ...list,
                        newTask
                    }
                    : list
            );

            dispatch({ type: "add_task", payload: createTask });
        }
    };

    return (
        <button type="button" className="btn border-0">
            <FontAwesomeIcon icon={faThumbtack} className="pin_btn border-0 rounded-circle" />
        </button>
    );
}