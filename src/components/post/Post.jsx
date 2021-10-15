import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import { Users } from "../../dummyData";
import "./post.css";
import person1Img from "../../assets/person/1.jpeg";
import likeIcon from "../../assets/like.png";
import heartIcon from "../../assets/heart.png";
import feedImg from "../../assets/post/3.jpeg";

function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isliked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              // src={
              //   Users.filter((user) => user.id === post.userId)[0]
              //     .profilePicture
              // }
              src={person1Img}
              alt=""
            />

            <span className="postUserName">
              {Users.filter((user) => user.id === post.userId)[0].username}
            </span>

            <span className="postDate">{post.date}</span>
          </div>

          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={feedImg} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={likeIcon}
              onClick={handleLikeClick}
              alt=""
            />
            <img
              className="likeIcon"
              src={heartIcon}
              onClick={handleLikeClick}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>

          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
