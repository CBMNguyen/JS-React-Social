import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import postApi from "api/post";
import userApi from "api/user";
import Feed from "components/feed/Feed";
import { follow, unFollow } from "features/auth/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import NoAvatarImg from "../../assets/person/noAvatar.png";
import coverImg from "../../assets/post/3.jpeg";
import "./profile.css";

function Profile(props) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const { user } = await userApi.getUserById(id);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser(userId);
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async (id) => {
      try {
        const { posts } = await postApi.getPostOfMe(id);
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
    };
    user._id && fetchPosts(user._id);
  }, [user._id, dispatch]);

  useEffect(() => {
    setFollowed(currentUser.user.followings.includes(user._id));
  }, [currentUser.user, user._id]);

  const handleFollowClick = async () => {
    try {
      followed && dispatch(unFollow(user._id));
      !followed && dispatch(follow(user._id));
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile">
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img className="profileCoverImg" src={coverImg} alt="" />
            <img
              className="profileUserImg"
              src={user.profilePicture || NoAvatarImg}
              alt=""
            />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user?.username}</h4>
            <span className="profileInfoDesc">{user?.desc}</span>
            {currentUser?.user?._id !== userId && (
              <button
                onClick={handleFollowClick}
                className="profileFollowButton"
              >
                {followed ? "Unfollow" : "Follow"}
                {followed ? <RemoveIcon /> : <AddIcon />}
              </button>
            )}
          </div>
        </div>
        <div className="profileRightBottom">
          <Feed posts={posts} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
