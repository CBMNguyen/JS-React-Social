import MoreVertIcon from "@mui/icons-material/MoreVert";
import userApi from "api/user";
import React, { useEffect, useState } from "react";
import heartIcon from "../../assets/heart.png";
import likeIcon from "../../assets/like.png";
import NoAvatarImg from "../../assets/person/noAvatar.png";
import "./post.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likeAndDislike } from "app/postSlice";
import { showToastError, showToastSuccess } from "utils/common";

function Post({ post }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    try {
      await showToastSuccess(dispatch(likeAndDislike(post._id)));
    } catch (error) {
      showToastError(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const { user } = await userApi.getUserById(id);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser(post.userId);
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user._id}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture || NoAvatarImg}
                alt="profilePictureLogo"
              />
            </Link>

            <span className="postUserName">{user?.username}</span>

            <span className="postDate">{format(new Date(post.createdAt))}</span>
          </div>

          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.img && (
            <img
              className="postImg"
              src={`${process.env.REACT_APP_API_URL}/upload/${post.img}`}
              alt=""
            />
          )}
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
