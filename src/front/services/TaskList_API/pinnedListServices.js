const url = import.meta.env.VITE_BACKEND_URL;

const pinnedListServices = {};

const authHeaders = () => ({
  'Authorization': 'Bearer ' + localStorage.getItem('token'),
  'Content-Type': 'application/json'
});

// GET all pinned lists of the user
pinnedListServices.getAllPinned = async () => {
  try {
    const resp = await fetch(url + "/api/user/lists/pinned", {
      method: "GET",
      headers: authHeaders()
    });

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
    const resp = await fetch(url + "/api/user/list/" + listId + "/pinned", {
      method: "GET",
      headers: authHeaders()
    });

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
    const resp = await fetch(url + "/api/user/list/" + listId + "/pinned", {
      method: "POST",
      headers: authHeaders()
    });

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
    const resp = await fetch(url + "/api/user/list/" + listId + "/pinned", {
      method: "DELETE",
      headers: authHeaders()
    });

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
