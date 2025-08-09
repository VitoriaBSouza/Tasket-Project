import { useState, useRef } from "react";

//css file
import '../../CSS_files/myLists.css';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import listServices from "../../services/TaskList_API/listServices";
import { showError, showSuccess } from "../../services/toastService.js";
import storeReducer from "../../store.js";

export const CreateBtn = () => {

    const { store, dispatch } = useGlobalReducer();
    const modalRef = useRef(null);
    const openBtnRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const closeModal = () => {
        const modalEl = document.getElementById("crateBtnModal"); // tu id exacto
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.title) {
                showError("You must add at least a title to your list.");
                return;
            }

            if (store.token) {
                const data = await listServices.addList(formData);

                if (data.success) {
                    dispatch({ type: "add_list", payload: data.list });
                    showSuccess("List created successfully.");
                    closeModal();

                } else {
                    showError(data.error || "Could not create the list, please try again.");
                }
            } else {
                //if user is not logged or does not have account will add locally
                const newList = {
                    //this will generate an id based on the time was created
                    //we do not add an id because once they close tab, the session will be lost
                    //so ID cannot be duplicated by the same user and session.
                    id: Date.now(),
                    ...formData,
                };
                dispatch({ type: "add_list", payload: newList });
                showSuccess("List created successfully.");
                closeModal();
            }

        } catch (error) {
            showError("An unexpected error occurred. Please try again later.");
        }
    };

    console.log(store.lists);



    return (
        <div className="col-12 col-md-3 d-flex justify-content-end me-3">

            <button type="button"
                className="btn btn-warning rounded-pill create_btn p-3"
                data-bs-toggle="modal"
                data-bs-target="#crateBtnModal"
                data-bs-whatever="@mdo"
                ref={openBtnRef}>
                Create List
            </button>

            <div className="modal fade" id="crateBtnModal" tabIndex="-1" aria-labelledby="createBtnModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold fs-3 title_modal" id="createBtnModalLabel">New List</h5>
                            <button type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                            onClick={() => {document.activeElement?.blur(); setPrinted(false)}}></button>
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
                                    <button type="button" className="btn btn-outline-danger border-2 fs-5 fw-bold" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn_create fs-5">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}