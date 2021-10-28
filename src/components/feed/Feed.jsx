import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Post from "../post/Post";
import Share from "../share/Share";

function Feed({ posts }) {
  const { userId } = useParams();
  const { user } = useSelector((state) => state.user);

  return (
    <Box sx={{ flex: 6 }}>
      <Box sx={{ padding: "0 20px" }}>
        {!(userId || userId === user._id) && <Share />}
        {posts
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Post key={post._id} post={post} currentUser={user} />
          ))}
      </Box>
    </Box>
  );
}

export default Feed;
