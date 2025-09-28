import { useNavigate } from "react-router-dom";

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import listServices from "../../services/TaskList_API/listServices.js";
import { showError, showSuccess } from "../../services/toastService.js";

//components
import { EditListButton } from "./EditListButton.jsx";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const ListsCards = ({ id, title, status, description }) => {
    const { store, dispatch } = useGlobalReducer();
    const list = { id, title, description, status };
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (store.token) {
            const data = await listServices.deleteList(list.id);

            if (data.success) {
                //will delete from store after deling from backend
                dispatch({ type: "delete_list", payload: list.id });
                showSuccess("List deleted successfully.");
            } else {
                showError(data.error || "Could not delete the list, please try again.");
            }
        } else {
            dispatch({ type: "delete_list", payload: list.id });
            showSuccess("List deleted successfully.");
        }
    };

    return (
        <div className="col-12 col-lg-6 col-xxl-4 my-3 d-flex">
            <div className="card flex-fill d-flex flex-column p-2">
                <div className="card-body">
                    <div className="d-flex my-2 align-items-center">
                        <div className="card-title fw-bold card_lists_title">
                            <h5 className="card-title fw-bold card_lists_title">
                                {title
                                    ? title
                                        .toLowerCase()
                                        .replace(/(^\s*\w|\. \s*\w)/g, (match) => match.toUpperCase())
                                    : ""}
                            </h5>

                        </div>
                        <div
                            className="btn-group ms-auto me-2"
                            role="group"
                            aria-label="Basic outlined example"
                        >
                            <button type="button" className="btn border-0">
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="trash_btn"
                                    onClick={handleDelete}
                                />
                            </button>
                            <EditListButton list={list} />
                        </div>
                        <h4>
                            <span className="badge bg-success text-capitalize">{status}</span>
                        </h4>
                    </div>

                    {/* Will capitalize the first letter and after period. */}
                    <div
                        className="card-text lh-sm card_lists_text"
                        onClick={() => navigate(`/list/${id}/tasks`)}
                    >
                        <h5 className="card-title fw-bold card_lists_title">
                            {description
                                ? description
                                    .toLowerCase()
                                    .replace(/(^\s*\w|\. \s*\w)/g, (match) => match.toUpperCase())
                                : ""}
                        </h5>

                    </div>
                </div>
            </div>
        </div>
    );
};
