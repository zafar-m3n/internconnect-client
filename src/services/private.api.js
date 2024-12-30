import instance from "../lib/axios";

const getUserData = async (params = {}) => {
  return await instance.client.post("api/v1/user/getUserData", params, {
    headers: instance.defaultHeaders(),
  });
};

const updateUser = async (params = {}) => {
  return await instance.client.patch("api/v1/user/update", params, {
    headers: instance.defaultHeaders(),
  });
};

const getCV = async () => {
  return await instance.client.get("api/v1/cv/cv", {
    headers: instance.defaultHeaders(),
  });
};

const markAllAsRead = async () => {
  return await instance.client.put(
    "/api/v1/user/notifications/read",
    {},
    {
      headers: instance.defaultHeaders(),
    }
  );
};

const deleteAllRead = async () => {
  return await instance.client.delete("/api/v1/user/notifications/delete", {
    headers: instance.defaultHeaders(),
  });
};

const privateAPI = {
  getUserData,
  updateUser,
  getCV,
  markAllAsRead,
  deleteAllRead,
};

export default privateAPI;
