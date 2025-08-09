import React, { useEffect } from "react"

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import taskServices from "../services/TaskList_API/taskServices.js";
import pinnedListServices from "../services/TaskList_API/pinnedListServices.js";

//components
import { UrgentCards } from "../components/Home_Page/UrgentCards.jsx";
import { PinnedCards } from "../components/Home_Page/PinnedCards.jsx";
import { StatusList } from "../components/Home_Page/StatusList.jsx";
import { PieChart } from "../components/Home_Page/PieChart.jsx";

export const UserPage = () => {

    const { store, dispatch } = useGlobalReducer();

    const getUrgent = async () => {
        taskServices.getUrgentLists().then(data => {
            if (!data.error) {
                dispatch({ type: 'get_urgent_tasks', payload: data.urgent });
            }
        });
    };

    const getPinned = async () => {
        pinnedListServices.getAllPinned().then(data => {
            if (!data.error) {
                dispatch({ type: 'get_pinned_lists', payload: data.pinned });
            }
        });
    };

    const getStatus = async () => {
        taskServices.getTaskStatus().then(data => {
            if (!data.error) {
                dispatch({ type: 'get_tasks_status', payload: data.stats });
            }
        });
    };

    //will make random number so we can sort urgent tasks and shows some of them to the user
    const getRandomItems = (array, count) => {
        if (!Array.isArray(array)) return [];
        return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
    };


    useEffect(() => {
        getUrgent();
        getPinned();
        getStatus();
    }, [store.user?.id]);

    return (
        <div className="container-fluid">
            <h1 className="text-center my-5 user_page_title">
                Welcome <span className="text-capitalize">{store.user?.username}</span> !
            </h1>

            <div className="row m-2">
                <div className="col-12 col-lg-6 my-2 mb-4">
                    <PieChart
                        completed={store.status?.completed || 0}
                        pending={store.status?.pending || 0}
                    />
                </div>
                <div className="col-12 col-lg-6 mt-2">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="fs-5 user_page_subtitles m-0">Total tasks completed</p>
                            <p className="fs-5">{store.status?.completed || 0}</p>
                        </div>
                        <div className="col-12 col-md-6">
                            <p className="fs-5 user_page_subtitles m-0">Total tasks pending</p>
                            <p className="fs-5">{store.status?.pending || 0}</p>
                        </div>
                    </div>
                    <StatusList />
                </div>
            </div>

            <div className="row my-5">
                <h2 className="m-4 title_rows_user_page w-75">Urgent Tasks</h2>
                <div className="col-12 rows_user_page py-4">
                    <div className="scroll-container d-flex p-3">
                        {/* maping over urgent tasks to create cards based on the data */}
                        {(!store.urgent || store.urgent.length === 0) ? (
                            <p className="fs-4">No urgent tasks. Add one now!</p>
                        ) : (
                            getRandomItems(store.urgent, 10).map((list) =>
                                list.urgent_tasks?.map((task) => (
                                    <UrgentCards
                                        key={task.id}
                                        id={task.id}
                                        title={list.title}
                                        task={task.task}
                                    />
                                ))
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="row my-5">
                <h2 className="m-4 title_rows_user_page w-75">Lists Pinned</h2>
                <div className="col-12 rows_user_page py-4">
                    <div className="scroll-container d-flex p-3">
                        {/* maping over pinned lists to create cards based on the data */}
                        {(!store.pinned || store.pinned.length === 0) ? (
                            <p className="fs-4">No pinned lists yet. Add one!</p>
                        ) : (
                            getRandomItems(store.pinned, 10).map((el) => (
                                <PinnedCards
                                    key={el.list_id}
                                    id={el.list_id}
                                    title={el.title}
                                    description={el.description}
                                />
                            ))
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}