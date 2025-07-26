const url = import.meta.env.VITE_BACKEND_URL;

const listServices = {};

// Utility: Add JWT token
const authHeaders = () => ({
  'Authorization': 'Bearer ' + localStorage.getItem('token'),
  'Content-Type': 'application/json'
});

// GET all lists of the user
listServices.getAllLists = async () => {
  try {
    const resp = await fetch(url + "/api/user/lists", {
      method: "GET",
      headers: authHeaders()
    });

    const data = await resp.json();

    if (!resp.ok){
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
    const resp = await fetch(url + "/api/user/list/" + listId, {
      method: "GET",
      headers: authHeaders()
    });

    const data = await resp.json();

    if (!resp.ok){
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
    const resp = await fetch(url + "/api/user/lists", {
      method: "POST",
      headers: authHeaders(),
      // title and description required, handled in backend
      body: JSON.stringify(formData)
    });

    const data = await resp.json();

    if (!resp.ok){
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
    const resp = await fetch(url + "/api/user/list/" + listId, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(listData)
    });

    const data = await resp.json();

    if (!resp.ok){
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
    const resp = await fetch(url + "/api/user/list/" + listId, {
      method: "DELETE",
      headers: authHeaders()
    });

    const data = await resp.json();

    if (!resp.ok){
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
    const resp = await fetch(url + "/api/user/lists", {
      method: "DELETE",
      headers: authHeaders()
    });

    const data = await resp.json();

    if (!resp.ok){
      return { error: data.error || "Could not delete all lists" };
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

export default listServices;
