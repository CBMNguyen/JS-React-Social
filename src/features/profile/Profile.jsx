import { Box } from "@mui/system";
import userApi from "api/user";
import { getConversationTwoUser } from "app/messengerSlice.js";
import { getPostOfMe } from "app/postSlice";
import Messenger from "components/messenger/Messenger";
import Topbar from "components/topbar/Topbar";
import {
  addNotification,
  follow,
  removeRequiredFriend,
  requiredFriend,
  unFollow,
  unFriend,
} from "features/auth/userSlice";
import React, { useEffect, useRef, useState } from "react";
import Lightbox from "react-image-lightbox";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import EditProfileModal from "./components/EditProfileModal/EditProfileModal.jsx";
import ProfileBottom from "./components/ProfileBottom/ProfileBottom";
import ProfileTop from "./components/ProfileTop/ProfileTop";

function Profile({ socket }) {
  const { userId } = useParams();
  const scrollTopRef = useRef();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [photoIndex, setPhotoIndex] = useState(0);

  const [openImg, setOpenImg] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [infoTabValue, setInfoTabValue] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [profileState, setProfileState] = React.useState(
    JSON.parse(localStorage.getItem("profileState")) || [1, 1, 1, 1, 1]
  );

  const imageInPost = posts.filter((post) => post.img);

  const imageList = [].concat(
    user?.coverPicture,
    user?.profilePicture,
    imageInPost.map((post) => post.img)
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
  }, [userId, currentUser]);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFollowClick = async () => {
    try {
      currentUser.user.followings.includes(user?._id)
        ? await dispatch(unFollow(user._id))
        : await dispatch(follow(user._id));

      socket.emit("addFollowNotification", {
        senderId: currentUser.user._id,
        receiverId: user._id,
        type: currentUser.user.followings.includes(user?._id) ? 0 : 9,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFriendClick = async () => {
    try {
      await dispatch(unFriend(user._id));
      await dispatch(unFollow(user._id));
      socket.emit("addUnfriendNotification", {
        senderId: currentUser.user._id,
        receiverId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequireFriendClick = async () => {
    try {
      if (!currentUser?.requiredFriends?.includes(user?._id)) {
        socket.emit("addNotification", {
          senderId: currentUser.user._id,
          receiverId: user._id,
        });
        await dispatch(requiredFriend(user?._id));
        await dispatch(addNotification(user?._id));
      } else {
        socket.emit("removeNotification", {
          senderId: currentUser.user._id,
          receiverId: user._id,
        });
        await dispatch(removeRequiredFriend(user._id));
      }

      if (!currentUser.user.followings.includes(user?._id)) {
        await dispatch(follow(user._id));
        socket.emit("addFollowNotification", {
          senderId: currentUser.user._id,
          receiverId: user._id,
          type: 1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatClick = async () => {
    try {
      await dispatch(
        getConversationTwoUser({
          userId1: currentUser.user._id,
          userId2: user._id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* This is Top Bar */}
      {!openImg && <Topbar socket={socket} />}

      <Box ref={scrollTopRef} sx={{ backgroundColor: "#f0f2f5" }}>
        {/* Profile Top */}

        <ProfileTop
          value={value}
          setValue={setValue}
          user={user}
          currentUser={currentUser}
          userId={userId}
          handleChange={handleChange}
          handleChatClick={handleChatClick}
          handleFollowClick={handleFollowClick}
          handleUnFriendClick={handleUnFriendClick}
          handleRequireFriendClick={handleRequireFriendClick}
        />

        {/* Profile Bottom */}
        <ProfileBottom
          socket={socket}
          profileState={profileState}
          value={value}
          setValue={setValue}
          infoTabValue={infoTabValue}
          setInfoTabValue={setInfoTabValue}
          user={user}
          currentUser={currentUser.user}
          posts={posts}
          openImg={openImg}
          setOpenImg={setOpenImg}
          setOpenModal={setOpenModal}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          imageList={imageList}
          scrollTopRef={scrollTopRef}
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

      {openImg && (
        <Lightbox
          mainSrc={`${process.env.REACT_APP_API_URL}/${imageList[photoIndex]}`}
          nextSrc={`${process.env.REACT_APP_API_URL}/${[
            (photoIndex + 1) % imageList.length,
          ]}`}
          prevSrc={`${process.env.REACT_APP_API_URL}/${[
            (photoIndex + imageList.length - 1) % imageList.length,
          ]}`}
          onCloseRequest={() => setOpenImg(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + imageList.length - 1) % imageList.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % imageList.length)
          }
        />
      )}

      <Messenger socket={socket} />
    </>
  );
}

export default Profile;
