import axios from "axios";

const apiEd = "/api/v1/task";

export const fetchTasks = async () => {
  try {
    const { data } = await axios.get(apiEd);
    // console.log(response);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTask = async (obj) => {
  try {
    const { data } = await axios.post(apiEd, obj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const switchServerTask = async (obj) => {
  try {
    const { data } = await axios.patch(apiEd, obj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const deleteServerTask = async (ids) => {
  try {
    const { data } = await axios.delete(apiEd, { data: ids });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
