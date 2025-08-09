const url = import.meta.env.VITE_BACKEND_URL;

const listServices = {};

const fetchWithAuth = async (endpoint, options = {}) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) headers["Authorization"] = "Bearer " + token;

  const resp = await fetch(url + endpoint, { ...options, headers });

  if (resp.status === 401 || resp.status === 422) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/";
    return null;
  }

  return resp;
};

// GET all lists of the user
listServices.getAllLists = async () => {
  try {
    const resp = await fetchWithAuth("/api/user/lists", { method: "GET" });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch lists" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GET one list of the user
listServices.getOneList = async (listId) => {
  try {
    const resp = await fetchWithAuth("/api/user/list/" + listId, {
      method: "GET",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch list" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// POST a new list
listServices.addList = async (formData) => {
  try {
    const resp = await fetchWithAuth("/api/user/lists", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not create list" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// PUT to update list details
listServices.updateList = async (listId, listData) => {
  try {
    const resp = await fetchWithAuth("/api/user/list/" + listId, {
      method: "PUT",
      body: JSON.stringify(listData),
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not update list" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// DELETE one list
listServices.deleteList = async (listId) => {
  try {
    const resp = await fetchWithAuth("/api/user/list/" + listId, {
      method: "DELETE",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not delete list" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// DELETE all lists of the user
listServices.deleteAllLists = async () => {
  try {
    const resp = await fetchWithAuth("/api/user/lists", { method: "DELETE" });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not delete all lists" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default listServices;
