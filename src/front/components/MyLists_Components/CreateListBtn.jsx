import { useState } from "react";

//css file
import '../../CSS_files/myLists.css';

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import listServices from "../../services/TaskList_API/listServices.js";
import { showError, showSuccess } from "../../services/toastService.js";

//components
import { DeleteAllListsBtn } from "./DeleteAllListsBtn.jsx";
import { PopOver } from "../PopOver.jsx";

export const CreateListBtn = () => {

    const { store, dispatch } = useGlobalReducer();

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    const demoListsLimit = () => store.token ? 50 : 2;

    //This will limit the words for the title and description
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

    // Will close the modal once we click on submit button
    const closeModal = () => {
        // Forzar blur del elemento enfocado
        document.activeElement?.blur();

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
                    setFormData({ title: "", description: "" });

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
                    status: "Pending",
                };
                dispatch({ type: "add_list", payload: newList });

                //will save the list on the session so guest can have access until they close the tab
                const updatedLists = [...store.lists, newList];
                sessionStorage.setItem('lists', JSON.stringify(updatedLists));

                showSuccess("List created successfully.");
                closeModal();
                setFormData({ title: "", description: "" });
            }

        } catch (error) {
            showError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="col-12 col-sm-4 d-flex justify-content-end mt-2 ms-auto">

            {store.lists?.length === demoListsLimit() ?
                <PopOver
                    content={"You have reached the maximum number of lists. Please delete some lists to create new ones."}>
                    <button type="button"
                        className="btn create_list_btn_disabled rounded-pill mt-2 me-3">
                        Create List
                    </button>
                </PopOver>
                :
                <button type="button"
                    className="btn rounded-pill create_list_btn mt-2 me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#crateBtnModal"
                    data-bs-whatever="@mdo">
                    Create List
                </button>
            }

            <DeleteAllListsBtn />

            <div
                className="modal fade"
                id="crateBtnModal"
                tabIndex="-1"
                aria-labelledby="createBtnModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content modal_bg">
                        <div className="modal-header">
                            <h5
                                className="modal-title fw-bold fs-3 title_modal"
                                id="createBtnModalLabel">
                                New List
                            </h5>
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
                                        onClick={() => { document.activeElement?.blur() }}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}