const url = import.meta.env.VITE_BACKEND_URL;

const taskServices = {};

const authHeaders = () => ({
  'Authorization': 'Bearer ' + localStorage.getItem('token'),
  'Content-Type': 'application/json'
});

// GET all tasks of a list
taskServices.getAllTasks = async (list_id) => {
  try {
    const resp = await fetch(url + "/api/user/list/" + list_id + "/tasks", {
      method: "GET",
      headers: authHeaders()
    });

    const data = await resp.json();

    if (!resp.ok){
      return { error: data.error || "Could not fetch tasks" };
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

// GET one task of a list
taskServices.getOneTask = async (list_id, task_id) => {
  try {
    const resp = await fetch(url + "/api/user/list/" + list_id + "/task/" + task_id, {
      method: "GET",
      headers: authHeaders()
    });

    const data = await resp.json();

    if (!resp.ok){
      return { error: data.error || "Could not fetch task" };
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

// POST a new task
taskServices.addTask = async (list_id, taskData) => {
  try {
    const resp = await fetch(url + "/api/user/list/" + list_id + "/task", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(taskData)
    });

    const data = await resp.json();

    if (!resp.ok){
      return { error: data.error || "Could not create task" };
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

// PUT to update task details
taskServices.updateTask = async (list_id, task_id, taskData) => {
  try {
    const resp = await fetch(url + "/api/user/list/" + list_id + "/task/" + task_id, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(taskData)
    });

    const data = await resp.json();

    if (!resp.ok){
      return { error: data.error || "Could not update task" };
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

// PUT to update task urgency
taskServices.updateUrgency = async (list_id, task_id, urgent) => {
  try {
    const resp = await fetch(url + "/api/user/list/" + list_id + "/task/" + task_id + "/urgent", {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ urgent })
    });

    const data = await resp.json();

    if (!resp.ok){
      return { error: data.error || "Could not update urgency" };
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

// PUT to update task status
taskServices.updateStatus = async (list_id, task_id, status) => {
  try {
    const resp = await fetch(url + "/api/user/list/" + list_id + "/task/" + task_id + "/status", {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ status })
    });

    const data = await resp.json();

    if (!resp.ok){
      return { error: data.error || "Could not update status" };
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

// DELETE one task
taskServices.deleteOneTask = async (list_id, task_id) => {
  try {
    const resp = await fetch(url + "/api/user/list/" + list_id + "/task/" + task_id, {
      method: "DELETE",
      headers: authHeaders()
    });

    const data = await resp.json();

    if (!resp.ok){
      return { error: data.error || "Could not delete task" };
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

// DELETE all tasks of a list
taskServices.deleteAllTasks = async (list_id) => {
  try {
    const resp = await fetch(url + "/api/user/list/" + list_id + "/tasks", {
      method: "DELETE",
      headers: authHeaders()
    });

    const data = await resp.json();

    if (!resp.ok){
      return { error: data.error || "Could not delete all tasks" };
    }

    return data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

export default taskServices;
