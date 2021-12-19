import axiosClient from "./axiosClient";

const userApi = {
  getMe: () => {
    const url = `/users/get/me`;
    return axiosClient.get(url);
  },

  getUserById: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  getUserByName: (name) => {
    const url = `/users/search/${name}`;
    return axiosClient.get(url);
  },

  getFriends: (id) => {
    const url = `/users/friends/${id}`;
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

  addfriend: (id) => {
    const url = `/users/${id}/addfriend`;
    axiosClient.put(url);
  },

  unfriend: (id) => {
    const url = `/users/${id}/unfriend`;
    axiosClient.put(url);
  },

  follow: (id) => {
    const url = `/users/${id}/follow`;
    axiosClient.put(url);
  },

  unfollow: (id) => {
    const url = `/users/${id}/unfollow`;
    axiosClient.put(url);
  },

  addnotification: (id) => {
    const url = `/users/${id}/addnotification`;
    axiosClient.put(url);
  },

  removenotification: (id) => {
    const url = `/users/${id}/removenotification`;
    axiosClient.put(url);
  },
};

export default userApi;
