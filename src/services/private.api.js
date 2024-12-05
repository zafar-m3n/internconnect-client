import instance from "../lib/axios";

const getUserData = async (params = {}) => {
  return await instance.client.post("api/v1/user/getUserData", params, {
    headers: instance.defaultHeaders(),
  });
};

const privateAPI = {
  getUserData,
};

export default privateAPI;
