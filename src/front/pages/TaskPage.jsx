import { useParams } from "react-router-dom";
import { useEffect } from "react";

//css file
import '../CSS_files/tasks.css';

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import listServices from "../services/TaskList_API/listServices.js";
import { showError } from "../services/toastService.js";

//components
import { SearchBar } from "../components/MyLists_Components/SearchBar";
import { ClearBtn } from '../components/TasksPage_Components/clearBtn';
import { DeleteListBtn } from '../components/TasksPage_Components/deleteListBtn';
import { EditListBtn } from "../components/TasksPage_Components/editListBtn";
import { TaskCard } from "../components/TasksPage_Components/taskCard.jsx";
import { AddTaskBtn } from "../components/TasksPage_Components/addTaskBtn.jsx";

export const TaskPage = () => {

    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer();

    const getList = async () => {

        if (store.token) {

            const data = await listServices.getOneList(id);

            if (data.success) {
                //will delete from store after deling from backend
                dispatch({ type: "get_one_list", payload: data.list });

            } else {
                showError(data.error || "List not found, please try again.");
            }
        } else {
            const list = store.lists.find(l => String(l.id) === String(id));
            dispatch({ type: "get_one_list", payload: list });
        }

    }

    useEffect(() => {
        if (store.token) {
            getList();
        } else {
            const listsFromSession = sessionStorage.getItem('lists');
            if (listsFromSession) {
                const lists = JSON.parse(listsFromSession);
                const list = lists.find(l => String(l.id) === String(id));
                if (list) {
                    dispatch({ type: 'get_one_list', payload: list });
                } else {
                    showError(`List ${id} not found in session storage`);
                }
            } else {
                showError('No lists found in session storage');
            }
        }
    }, [id, store.lists]);


    return (
        <div className="container-fluid justify-content-center p-5">
            <div className="row py-5">
                <SearchBar />
                <div className="col-12 col-md-5 d-flex justify-content-end mt-2 ms-auto ps-4">
                    <EditListBtn id={id} title={store.list?.title} description={store.list?.description} />
                    <DeleteListBtn id={id} />
                    <ClearBtn id={id} />
                </div>
            </div>

            <h1 className="my-5 text-center title_tasks_page">To-do List</h1>

            <div className="row rounded-top-3 p-5 d-flex justify-content-center bg_tasks_page">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="title_list p-1 lh-sm rounded-3 mx-auto">
                        {store.list?.title
                            ? store.list.title
                                .toLowerCase()
                                .replace(/(^\s*\w|\. \s*\w)/g, match => match.toUpperCase())
                            : ""}
                    </div>
                </div>
                <AddTaskBtn />
                <div className="col-12 col-lg-3 d-flex justify-content-center
                 mt-3 mt-md-5 mt-lg-0 order-2 order-lg-3">
                    <div className="d-flex flex-column align-items-center mx-3">
                        <div className="counter_tasks_status_completed fw-bold d-flex align-items-center 
                        justify-content-center">
                            {store.list?.tasks?.filter(t => t.status === "completed").length || 0}
                        </div>
                        <div className="fs-6 fw-normal mt-1 text-center">Completed</div>
                    </div>

                    <div className="d-flex flex-column align-items-center mx-3">
                        <div className="counter_tasks_status_pending fw-bold d-flex align-items-center 
                        justify-content-center">
                            {store.list?.tasks?.filter(t => t.status === "pending").length || 0}
                        </div>
                        <div className="fs-6 fw-normal mt-1 text-center">Pending</div>
                    </div>

                    <div className="d-flex flex-column align-items-center mx-3">
                        <div className="counter_tasks_status_urgent fw-bold d-flex align-items-center 
                        justify-content-center">
                            {store.list?.tasks?.filter(t => t.urgent).length || 0}
                        </div>
                        <div className="fs-6 fw-normal mt-1 text-center">Urgent</div>
                    </div>
                </div>
            </div>
            <div className="row mb-3 pb-4 bg_tasks_page rounded-bottom-3">

                <div className="col-12 col-lg-6">
                    <div className="accordion accordion-flush" id="accordionTask">
                        {!store.list?.tasks || store.list?.tasks.length === 0 ? (
                            <p className="fs-4 p-4">No tasks on your list, add one now!</p>
                        ) : (
                            store.list.tasks
                                .slice() // clones array to avoid changing state
                                .sort((a, b) => {
                                    // will send completed to the bottom
                                    if (a.status === 'completed' && b.status !== 'completed') return 1;
                                    if (a.status !== 'completed' && b.status === 'completed') return -1;
                                    // will move pending tagged urgent to the top
                                    if (a.urgent && !b.urgent) return -1;
                                    if (!a.urgent && b.urgent) return 1;
                                    return 0;
                                })
                                .slice(0, 14)
                                .map((el) => (
                                    <TaskCard
                                        key={el.id}
                                        id={el.id}
                                        list_id={store.list?.id}
                                        task={el.task}
                                        status={el.status}
                                        urgent={el.urgent}
                                    />
                                ))
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}