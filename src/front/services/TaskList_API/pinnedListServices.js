const url = import.meta.env.VITE_BACKEND_URL;

const pinnedListServices = {};

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

// GET all pinned lists of the user
pinnedListServices.getAllPinned = async () => {
  try {
    const resp = await fetchWithAuth("/api/user/lists/pinned", {
      method: "GET",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch pinned lists" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GET one pinned list
pinnedListServices.getOnePinned = async (listId) => {
  try {
    const resp = await fetchWithAuth("/api/user/list/" + listId + "/pinned", {
      method: "GET",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not fetch pinned list" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// POST to pin a list
pinnedListServices.pinList = async (listId) => {
  try {
    const resp = await fetchWithAuth("/api/user/list/" + listId + "/pinned", {
      method: "POST",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not pin list" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// DELETE a pinned list
pinnedListServices.unpinList = async (listId) => {
  try {
    const resp = await fetchWithAuth("/api/user/list/" + listId + "/pinned", {
      method: "DELETE",
    });
    if (!resp) return;

    const data = await resp.json();

    if (!resp.ok) {
      return { error: data.error || "Could not unpin list" };
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default pinnedListServices;
