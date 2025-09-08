import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Masonry from "react-masonry-css";

//css file
import "../CSS_files/tasks.css";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import listServices from "../services/TaskList_API/listServices.js";
import { showError } from "../services/toastService.js";

//components
import { SearchBar } from "../components/MyLists_Components/SearchBar";
import { ClearAllTasksBtn } from "../components/TasksPage_Components/ClearAllTasksBtn";
import { DeleteListBtn } from "../components/TasksPage_Components/DeleteListBtn";
import { EditListBtn } from "../components/TasksPage_Components/EditListBtn";
import { TaskCard } from "../components/TasksPage_Components/TaskCard_Components/TaskCard.jsx";
import { AddTaskBtn } from "../components/TasksPage_Components/AddTaskBtn.jsx";
import { PinListBtn } from "../components/TasksPage_Components/PinListBtn.jsx";

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
      const list = store.lists.find((l) => String(l.id) === String(id));
      dispatch({ type: "get_one_list", payload: list });
    }
  };

  useEffect(() => {
    if (store.token) {
      getList();
    } else {
      const listsFromStorage = sessionStorage.getItem("lists"); // match your storage
      if (listsFromStorage) {
        const lists = JSON.parse(listsFromStorage);
        const list = lists.find((l) => l.id === Number(id));
        if (list) {
          dispatch({ type: "get_one_list", payload: list });
        } else {
          showError(`List ${id} not found.`);
        }
      } else {
        showError("No lists found.");
      }
    }
  }, [id]);


  return (
    <div className="container-fluid justify-content-center p-5">
      <div className="row py-5">
        <SearchBar />
        <div className="col-12 col-md-5 d-flex justify-content-end mt-2 ms-auto ps-4">
          <EditListBtn
            id={id}
            title={store.list?.title}
            description={store.list?.description}
          />
          <DeleteListBtn id={id} />
          <ClearAllTasksBtn id={id} />
        </div>
      </div>

      <h1 className="my-5 text-center title_tasks_page">To-do List</h1>

      <div className="row rounded-top-3 p-5 d-flex justify-content-center bg_tasks_page">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="title_list p-1 lh-sm rounded-3 mx-auto">
            {store.list?.title
              ? store.list.title
                .toLowerCase()
                .replace(/(^\s*\w|\. \s*\w)/g, (match) => match.toUpperCase())
              : ""}
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3 d-flex 
        justify-content-center mt-3 mt-lg-0 order-3 order-lg-2">
          <AddTaskBtn />
          <PinListBtn />
        </div>

        <div
          className="col-12 col-lg-3 d-flex justify-content-center
            mt-3 mt-md-5 mt-lg-0 order-2 order-lg-3 mt-2"
        >
          <div className="d-flex flex-column align-items-center mx-3">
            <div
              className="counter_tasks_status_completed fw-bold d-flex 
                align-items-center justify-content-center"
            >
              {store.list?.tasks?.filter((t) => t.status === "completed")
                .length || 0}
            </div>
            <div className="fs-6 fw-normal mt-1 text-center">Completed</div>
          </div>

          <div className="d-flex flex-column align-items-center mx-3">
            <div
              className="counter_tasks_status_pending fw-bold d-flex 
                align-items-center justify-content-center"
            >
              {store.list?.tasks?.filter((t) => t.status === "pending")
                .length || 0}
            </div>
            <div className="fs-6 fw-normal mt-1 text-center">Pending</div>
          </div>

          <div className="d-flex flex-column align-items-center mx-3">
            <div
              className="counter_tasks_status_urgent fw-bold d-flex 
                align-items-center justify-content-center"
            >
              {store.list?.tasks?.filter((t) => t.urgent).length || 0}
            </div>
            <div className="fs-6 fw-normal mt-1 text-center">Urgent</div>
          </div>
        </div>
      </div>

      <div className="row bg_tasks_page">
        <div className="col-12 m-2 d-flex justify-content-center">
          <p className="fs-5">{store.list?.description}</p>
        </div>
      </div>

      <div className="row mb-3 pb-4 bg_tasks_list rounded-bottom-3">
        <Masonry
          breakpointCols={{ default: 2, 950: 1 }}
          className="tasks_columns_masonry"
          columnClassName="tasks_column_masonry"
        >
          {!store.list?.tasks || store.list?.tasks.length === 0 ? (
            <p className="fs-4 p-4">No tasks on your list, add one now!</p>
          ) : (
            store.list.tasks
              .slice()
              .sort((a, b) => {
                if (a.status === "completed" && b.status !== "completed") return 1;
                if (a.status !== "completed" && b.status === "completed") return -1;
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
                  comment={el.comment}
                  due_at={el.due_at}
                  location={el.location}
                  reminder_at={el.reminder_at}
                  schedule_at={el.schedule_at}
                  updated_at={el.updated_at}
                />
              ))
          )}
        </Masonry>
      </div>

    </div>
  );
};
