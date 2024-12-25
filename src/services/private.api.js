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

const privateAPI = {
  getUserData,
  updateUser,
};

export default privateAPI;
