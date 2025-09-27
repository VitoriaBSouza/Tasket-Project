import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

//hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//services
import listServices from "../services/TaskList_API/listServices.js";

//components
import { CreateListBtn } from "../components/MyLists_Components/CreateListBtn.jsx";
import { ListsCards } from "../components/MyLists_Components/ListsCards.jsx";
import { SearchBar } from "../components/MyLists_Components/SearchBar";
import { Pagination } from "../components/Pagination.jsx";

const itemsPerPage = 10;

export const MyLists = () => {
    const { store, dispatch } = useGlobalReducer();

    //Pagination variables
    const lists = store.lists || [];
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageParam = parseInt(queryParams.get("page")) || 1;

    const currentPage = pageParam;
    const totalPages = Math.ceil(lists.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = lists.slice(startIndex, startIndex + itemsPerPage);

    const getLists = async () => {
        listServices.getAllLists().then((data) => {
            if (!data.error) {
                dispatch({ type: "get_all_lists", payload: data.lists });
            }
        });
    };

    useEffect(() => {
        if (!store.token) {
            const savedLists = sessionStorage.getItem("lists");
            if (savedLists) {
                dispatch({ type: "get_all_lists", payload: JSON.parse(savedLists) });
            }
        } else {
            getLists();
        }
    }, [store.user?.id]);

    return (
        <div className="container-fluid bg_page pt-5">
            {store.token ? null : (
                <div className="alert alert-warning lh-sm fs-6" role="alert">
                    This is a demo. Any lists or tasks you create will be lost when the
                    tabs is closed. Please{" "}
                    <Link to={"/login"} className="link-danger fw-bold">
                        Log In
                    </Link>{" "}
                    or{" "}
                    <Link to={"/signup"} className="link-danger fw-bold">
                        Register
                    </Link>{" "}
                    to save your lists.
                </div>
            )}

            <div className="row pt-4 pb-5">
                <SearchBar />
                <CreateListBtn />
            </div>

            <h1 className="text-center mb-4 title_myLists">My Lists</h1>

            <div className="row pb-5 px-3">
                {!store.lists || store.lists.length === 0 ? (
                    <p className="fs-4 ms-4">No lists, create one now!</p>
                ) : (
                    currentItems.map((el) => (
                        <ListsCards
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            description={el.description}
                            status={el.status}
                        />
                    ))
                )}
            </div>

            {/* <Pagination /> */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={currentPage} />
        </div>
    );
};
