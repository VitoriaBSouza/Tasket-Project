export const initialStore = () => {
  return {
    token:
      localStorage.getItem("token") || sessionStorage.getItem("token") || null,

    // Will check if user is store in localStorage or sessionStorage
    // will parse or return an empty object if not found or undefined
    user: (() => {
      const user =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      return user && user !== "undefined" ? JSON.parse(user) : {};
    })(),
    lists: [],
    list: [],
    tasks: [],
    urgent: [],
    pinned: [],
    status: [],
    status_by_list: [],

    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "logIn":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "logout":
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      return {
        ...store,
        user: {}, // reset user to empty object
        token: null, // reset token to null
      };

    case "forgotPasswd":
      return {
        ...store,
        user: action.payload,
      };

    case "edit_profile":
      return {
        ...store,
        user: action.payload,
      };

    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...store,
        user: {}, // reset user to empty object
        token: null, // reset token to null
      };

    case "get_all_lists":
      return {
        ...store,
        lists: action.payload,
      };

    case "get_one_list":
      return {
        ...store,
        list: action.payload,
      };

    case "add_list":
      return {
        ...store,
        lists: [...store.lists, action.payload],
      };

    case "edit_list":
      return {
        ...store,
        lists: store.lists.map((list) =>
          list.id === action.payload.id ? action.payload : list
        ),
      };

    case "delete_list":
      return {
        ...store,
        lists: store.lists.filter((list) => list.id !== action.payload),
      };

    case "delete_all_lists":
      return {
        ...store,
        lists: [],
      };

    case "get_urgent_tasks":
      return {
        ...store,
        urgent: action.payload,
      };

    case "update_task_status":
      return {
        ...store,
        lists: store.lists.map((list) =>
          list.id === action.payload.id ? action.payload : list
        ),
      };

    case "update_urgent_tag":
      return {
        ...store,
        lists: store.lists.map((list) =>
          list.id === action.payload.list_id
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === action.payload.task_id
                    ? { ...task, urgent: action.payload.urgent }
                    : task
                ),
              }
            : list
        ),
      };

    case "delete_all_tasks":
      return {
        ...store,
        tasks: store.tasks.filter((task) => task.listId !== action.payload),
      };

    case "get_pinned_lists":
      return {
        ...store,
        pinned: action.payload,
      };

    case "pin_list":
      return {
        ...store,
        pinned: [...store.pinned, action.payload],
      };

    case "unpin_list":
      return {
        ...store,
        pinned: store.pinned.filter(
          (list) => list.list_id !== Number(action.payload)
        ),
      };

    case "get_tasks_status":
      return {
        ...store,
        status: action.payload || { completed: 0, pending: 0 },
      };

    case "get_tasks_status_by_list":
      return {
        ...store,
        status_by_list: action.payload || { completed: 0, pending: 0 },
      };

    case "edit_task":
      return {
        ...store,
        lists: store.lists.map((list) =>
          list.id === action.payload.list_id
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === action.payload.id ? action.payload : task
                ),
              }
            : list
        ),
      };
    
    case "delete_one_task":
      return {
        ...store,
        lists: store.lists.filter((list) => 
          list.id === action.payload.list_id ? {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== action.payload.task_id)
          } : list ),
      };
    
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      return {
        ...store,
        lists: store.lists.map((list) =>
          list.id === action.payload.list_id
            ? { ...list, tasks: [...list.tasks, action.payload] }
            : list
        ),
      };

    default:
      throw Error("Unknown action.");
  }
}
