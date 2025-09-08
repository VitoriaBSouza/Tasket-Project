import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import pinnedListServices from "../../services/TaskList_API/pinnedListServices.js";
import { showError, showSuccess } from "../../services/toastService.js";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { faThumbtackSlash } from '@fortawesome/free-solid-svg-icons';
import { PopOver } from "../PopOver.jsx";

export const PinListBtn = () => {

    const { store, dispatch } = useGlobalReducer();
    const { id } = useParams();

    const [pin, setPin] = useState(false);
    const list_id = Number(id);

    const checkIfPinned = (listId) => {
        const pinned = store.pinned.some(p => p.list_id === listId);
        setPin(pinned);
        return pinned;
    };

    useEffect(() => {
        checkIfPinned(list_id);
    }, [store.pinned, id]);


    const pinList = async () => {

        const isPinned = checkIfPinned(list_id)

        if (store.token) {
            if (!isPinned) {
                const data = await pinnedListServices.pinList(list_id);

                if (data.success) {
                    dispatch({ type: "pin_list", payload: data.pinned });
                    setPin(true);
                    showSuccess("Added to pinned lists successfully");

                } else {
                    showError(data.error || "List could not be pinned, please try again.");
                }
            } else {
                const data = await pinnedListServices.unpinList(list_id);

                if (data.success) {
                    dispatch({ type: "unpin_list", payload: id });
                    setPin(false);
                    showSuccess("Removed from pinned lists successfully");

                } else {
                    showError(data.error ||
                        "List could not be removed from pinned lists, please try again.");
                }
            }
        } else {

            if (!isPinned) {
                dispatch({ type: "pin_list", payload: { list_id: list_id } });
                setPin(true);
                showSuccess("Added to pinned lists successfully");
            } else {
                dispatch({ type: "unpin_list", payload: list_id });
                setPin(false);
                showSuccess("Removed from pinned lists successfully");
            }

        }
    };

    return (
        <>
            {pin || store.pinned?.length < 1 ?
                <button
                    type="button"
                    className="btn border-0"
                    onClick={pinList}>
                    {pin ?
                        <FontAwesomeIcon icon={faThumbtack}
                            className="pinned_btn border-0 rounded-circle" />
                        :
                        <FontAwesomeIcon icon={faThumbtackSlash}
                            className="unpinned_btn border-0 rounded-circle" />}
                </button>
                :
                <PopOver
                    content={"Maximum of 10 lists already pinned. Unpin a list to pin another one."}>
                    <button
                        type="button"
                        className="btn border-0">
                        {pin ?
                            <FontAwesomeIcon icon={faThumbtack}
                                className="pinned_btn border-0 rounded-circle" />
                            :
                            <FontAwesomeIcon icon={faThumbtackSlash}
                                className="unpinned_btn border-0 rounded-circle" />}
                    </button>
                </PopOver>}
        </>
    );
}