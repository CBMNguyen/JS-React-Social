import { Box } from "@mui/system";
import userApi from "api/user";
import { getPostOfMe } from "app/postSlice";
import Messenger from "components/messenger/Messenger";
import Topbar from "components/topbar/Topbar";
import { follow, unFollow } from "features/auth/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import EditProfileModal from "./components/EditProfileModal/EditProfileModal.jsx";
import ProfileBottom from "./components/ProfileBottom/ProfileBottom";
import ProfileTop from "./components/ProfileTop/ProfileTop";

function Profile(props) {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.user);

  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [openImg, setOpenImg] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [infoTabValue, setInfoTabValue] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [profileState, setProfileState] = React.useState(
    JSON.parse(localStorage.getItem("profileState")) || [1, 1, 1, 1, 1]
  );

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFollowClick = async () => {
    try {
      currentUser.user.followings.includes(user?._id)
        ? dispatch(unFollow(user._id))
        : dispatch(follow(user._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* This is Top Bar */}
      {!openImg && <Topbar />}

      <Box sx={{ backgroundColor: "#f0f2f5" }}>
        {/* Profile Top */}

        <ProfileTop
          value={value}
          setValue={setValue}
          user={user}
          currentUser={currentUser}
          userId={userId}
          handleChange={handleChange}
          handleFollowClick={handleFollowClick}
        />

        {/* Profile Bottom */}
        <ProfileBottom
          profileState={profileState}
          value={value}
          setValue={setValue}
          infoTabValue={infoTabValue}
          setInfoTabValue={setInfoTabValue}
          user={user}
          friends={friends}
          posts={posts}
          openImg={openImg}
          setOpenImg={setOpenImg}
          setOpenModal={setOpenModal}
        />
      </Box>

      <EditProfileModal
        profileState={profileState}
        setProfileState={setProfileState}
        setValue={setValue}
        setInfoTabValue={setInfoTabValue}
        user={user}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <Messenger />
    </>
  );
}

export default Profile;
