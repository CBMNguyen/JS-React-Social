import { Box } from "@mui/system";
import userApi from "api/user";
import { getPostOfMe } from "app/postSlice";
import Messenger from "components/messenger/Messenger";
import Topbar from "components/topbar/Topbar";
import { follow, unFollow } from "features/auth/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ProfileBottom from "./components/ProfileBottom";
import ProfileTop from "./components/ProfileTop";

function Profile(props) {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const [user, setUser] = useState({});
  const { posts } = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);

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
        await dispatch(getPostOfMe(id));
      } catch (error) {
        console.log(error);
      }
    };
    user._id && fetchPosts(user._id);
  }, [user._id, dispatch]);

  useEffect(() => {
    const fetchFriends = async (id) => {
      try {
        const { friendList } = await userApi.getFriends(userId);
        setFriends(friendList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends(userId);
  }, [userId]);

  const handleFollowClick = async () => {
    try {
      currentUser.user.followings.includes(user?._id)
        ? dispatch(unFollow(user._id))
        : dispatch(follow(user._id));
    } catch (error) {
      console.log(error);
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {/* This is Top Bar */}
      <Topbar />

      <Box sx={{ backgroundColor: "#f0f2f5" }}>
        {/* Profile Top */}

        <ProfileTop
          user={user}
          currentUser={currentUser}
          userId={userId}
          value={value}
          handleChange={handleChange}
          handleFollowClick={handleFollowClick}
        />

        {/* Profile Bottom */}
        <ProfileBottom
          value={value}
          user={user}
          friends={friends}
          posts={posts}
        />
      </Box>

      <Messenger />
    </>
  );
}

export default Profile;
