// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.
import { useEffect } from "react";

//services
import listServices from "../services/TaskList_API/listServices.js";
import pinnedListServices from "../services/TaskList_API/pinnedListServices.js";
import taskServices from "../services/TaskList_API/taskServices.js";

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    // Provide the store and dispatch method to all child components.

    const getLists = async () => {
        listServices.getAllLists().then((data) => {
            if (!data.error) {
                dispatch({ type: "get_all_lists", payload: data.lists });
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

    const getUrgent = async () => {
        taskServices.getUrgentLists().then(data => {
            if (!data.error) {
                dispatch({ type: 'get_urgent_tasks', payload: data.urgent });
            }
        });
    };

    // Load the lists once only and save on the store
    useEffect(() => {
        if (store.token) {
            getLists();
            getPinned();
            getUrgent();
        }
    }, [store.user, store.token]);


    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}