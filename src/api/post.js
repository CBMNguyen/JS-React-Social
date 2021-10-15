const { default: axiosClient } = require("./axiosClient");

const postApi = {
  getByUserId: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },

  getTimeLine: (id) => {
    const url = `/posts/timeline/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = "/posts";
    return axiosClient.post(url, data);
  },

  update: (data) => {
    const url = `/posts/${id}`;
    return axiosClient.put(url, data);
  },

  likeAndDislike: (id) => {
    const url = `/post/${id}/like`;
    return axiosClient.put(url);
  },
};

export default postApi;
