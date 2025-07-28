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

    case "forgotPasswd":
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

    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    default:
      throw Error("Unknown action.");
  }
}
