import { Box } from "@mui/system";
import { createPostSocket } from "app/postSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Post from "../post/Post";
import Share from "../share/Share";

function Feed({ posts, socket }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    socket?.on("getPost", ({ post }) => {
      if (user._id !== post.userId) {
        dispatch(createPostSocket({ post }));
      }
    });
  }, [socket, user._id, dispatch]);

  return (
    <Box sx={{ flex: 5.5 }}>
      <Box sx={{ padding: "0 20px" }}>
        {(!userId || userId === user._id) && <Share socket={socket} />}
        {posts
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Post
              key={post._id}
              post={post}
              socket={socket}
              currentUser={user}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Feed;
