import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

function Feed({ posts }) {
  const { userId } = useParams();
  const { user } = useSelector((state) => state.user);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {!(userId || userId === user._id) && <Share />}
        {posts
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Post key={post._id} post={post} />
          ))}
      </div>
    </div>
  );
}

export default Feed;
