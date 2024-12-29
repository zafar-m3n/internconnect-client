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

const privateAPI = {
  getUserData,
  updateUser,
  getCV,
};

export default privateAPI;
