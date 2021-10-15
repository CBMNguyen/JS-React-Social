import axiosClient from "./axiosClient";

const userApi = {
  getUserById: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  update: (id, data) => {
    const url = `/users/${id}`;
    axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/users/${id}`;
    axiosClient.delete(url);
  },

  follow: (id) => {
    const url = `/users/${id}/follow`;
    axiosClient.put(url);
  },

  unfollow: (id) => {
    const url = `/users/${id}/unfollow`;
    axiosClient.put(url);
  },
};

export default userApi;
