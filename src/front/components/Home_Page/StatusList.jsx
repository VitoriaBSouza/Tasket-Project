import React, { useEffect, useState } from "react"

//hooks
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

//services
import taskServices from "../../services/TaskList_API/taskServices.js";
import listServices from "../../services/TaskList_API/listServices.js";

export const StatusList = () => {

    const { store, dispatch } = useGlobalReducer();

    const [input, setInput] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const getLists = async () => {
        listServices.getAllLists().then((data) => {
            if (!data.error) {
                dispatch({ type: "get_all_lists", payload: data.lists });
            }
        });
    };

    useEffect(() => {
        getLists();
    }, [store.user?.id]);

    const filteredLists = store.lists
        ? store.lists.filter((list) =>
            list.title.toLowerCase().includes(input.toLowerCase())
        )
        : [];

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setShowDropdown(true);
    };

    const handleSelect = (title) => {
        setInput(title);
        setShowDropdown(false);

        const foundList = store.lists.find((l) => l.title === title);
        if (foundList) {
            taskServices.getTaskStatusByList(foundList.id).then((data) => {
                if (!data.error) {
                    dispatch({ type: "get_tasks_status_by_list", payload: data.stats });
                }
            });
        }
    };

    return (
        <div className="row">
            <p className="check_list_title">Check list status</p>
            <div className="col-12 mb-4">
                <input
                    type="text"
                    className="form-control search fs-5"
                    placeholder="Search list..."
                    value={input}
                    onChange={handleInputChange}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    onFocus={() => setShowDropdown(true)}
                />
                {showDropdown && filteredLists.length > 0 && (
                    <ul
                        className="list-group position-absolute search search_result"
                    >
                        {filteredLists.map((list) => (
                            <li
                                key={list.id}
                                className="list-group-item list-group-item-action search_item"
                                onMouseDown={() => handleSelect(list.title)}
                            >
                                {list.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="col-12 col-md-6">
                <p className="fs-5 user_page_subtitles m-0">Total tasks completed</p>
                <p className="fs-5">{store.status_by_list?.completed || 0}</p>
            </div>
            <div className="col-12 col-md-6">
                <p className="fs-5 user_page_subtitles m-0">Total tasks pending</p>
                <p className="fs-5">{store.status_by_list?.pending || 0}</p>
            </div>
        </div>
    );
}