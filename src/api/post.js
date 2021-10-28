const { default: axiosClient } = require("./axiosClient");

const postApi = {
  getByUserId: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },

  getPostOfMe: (id) => {
    const url = `/posts/profile/${id}`;
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

  update: (id, data) => {
    const url = `/posts/${id}`;
    return axiosClient.put(url, data);
  },

  likeAndDislike: (postId) => {
    const url = `/posts/${postId}/like`;
    return axiosClient.put(url);
  },

  likeAndDislikeComment: (postId, state, commentId) => {
    const url = `/posts/${postId}/comment/like`;
    return axiosClient.put(url, { state, commentId });
  },

  createComment: (postId, text) => {
    const url = `/posts/${postId}/comment`;
    return axiosClient.put(url, { text });
  },
};

export default postApi;
