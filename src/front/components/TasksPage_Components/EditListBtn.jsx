import { useState, useEffect } from "react";

//css file
import '../../CSS_files/tasks.css';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import listServices from "../../services/TaskList_API/listServices.js";
import { showError, showSuccess } from "../../services/toastService.js";

export const EditListBtn = ({ id, title, description }) => {

    const { store, dispatch } = useGlobalReducer();

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: ""
    })

    useEffect(() => {
        if (id) {
            setFormData({
                id: id,
                title: title || "",
                description: description || "",
            });
        }
    }, [id, title, description]);

    //this will limit the words for the title and description
    //On the backend we also have limited but in case it is a guest we had to limit on the frontend again.
    const handleChange = (e) => {
        const { name, value } = e.target;

        const wordLimit = name === "title" ? 5 : 20;
        const words = value.trim().split(/\s+/);

        if (words.length <= wordLimit) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    //Will close the modal once we click o submit button
    const closeModal = () => {
        const modalEl = document.getElementById(`editBtnModal-${id}`); // tu id exacto
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    };

    //Change the status of the list, this is already present on backend
    //This function will only apply if the person is a guets or not logged
    const updateListStatus = (listId, store) => {
        // Filter the tasks which are part of the list by id
        const tasksOfList = store.tasks.filter(task => task.listId === listId);

        // if no tasks we leave as pending
        if (tasksOfList.length === 0) return "Pending";

        // If all tasks are completed, then will change to completed
        const allCompleted = tasksOfList.every(task => task.status === "Completed");

        return allCompleted ? "Completed" : "Pending";
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.title) {
                showError("You must add at least a title to your list.");
                return;
            }

            if (store.token) {
                const data = await listServices.updateList(id, formData);

                if (data.success) {
                    dispatch({ type: "edit_list", payload: data.list });
                    showSuccess("List updated successfully.");
                    closeModal();

                } else {
                    showError(data.error || "Could not updated the list, please try again.");
                }
            } else {
                //if user is not logged or does not have account will edit locally
                const status = updateListStatus(formData.id, store);

                const newList = {
                    ...formData,
                    status,
                };

                //will update on the session storage so it's saved
                const updatedLists = store.lists.map(list =>
                    list.id === newList.id ? newList : list
                );
                dispatch({ type: "edit_list", payload: newList });
                sessionStorage.setItem('lists', JSON.stringify(updatedLists));

                showSuccess("List updated successfully.");
                closeModal();
            }

        } catch (error) {
            showError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="d-flex justify-content-end me-3">

            <button type="button"
                className="btn border-0 edit_list_btn rounded-pill"
                data-bs-toggle="modal"
                data-bs-target={`#editBtnModal-${id}`}
                data-bs-whatever="@mdo">
                Edit List
            </button>

            <div className="modal fade" id={`editBtnModal-${id}`} tabIndex="-1" aria-labelledby="createBtnModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold fs-3 title_modal" id="createBtnModalLabel">New List</h5>
                            <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => { document.activeElement?.blur() }}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label fs-5">Title:</label>
                                    <input
                                        type="text"
                                        className="form-control fs-5"
                                        id="recipient-name"
                                        name='title'
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label fs-5">Description:</label>
                                    <input
                                        type="text"
                                        className="form-control fs-5"
                                        id="recipient-name"
                                        name='description'
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger border-2 fs-5 fw-bold"
                                        data-bs-dismiss="modal"
                                        onClick={() => { document.activeElement?.blur() }}>Close</button>
                                    <button
                                        type="submit"
                                        className="btn btn_create fs-5"
                                        onClick={() => { document.activeElement?.blur() }}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}