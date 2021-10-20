import userApi from "api/user";
import { getConversations } from "app/messengerSlice";
import { getTimeLine } from "app/postSlice";
import Feed from "components/feed/Feed";
import Messenger from "components/messenger/Messenger";
import Rightbar from "features/home/components/rightbar/Rightbar";
import Topbar from "components/topbar/Topbar";
import { getMe } from "features/auth/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastError, showToastSuccess } from "utils/common";
import Sidebar from "./components/sidebar/Sidebar";
import "./home.css";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { onlineUsers } = useSelector((state) => state.messenger);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getMe());
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    const fetchPosts = async (id) => {
      try {
        await showToastSuccess(dispatch(getTimeLine(id)));
      } catch (error) {
        showToastError(error);
      }
    };
    user._id && fetchPosts(user._id);
  }, [user._id, dispatch]);

  useEffect(() => {
    const fetchFriends = async (id) => {
      try {
        const { friendList } = await userApi.getFriends(user._id);
        setFriends(friendList);
      } catch (error) {
        showToastError(error);
      }
    };
    user._id && fetchFriends(user._id);
  }, [user._id, dispatch]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        await dispatch(getConversations(user._id));
      } catch (error) {
        console.log(error);
      }
    };
    user._id && fetchConversations();
  }, [user._id, dispatch]);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar friends={friends} />
        <Feed posts={posts} />
        <Rightbar currentUserId={user._id} onlineUsers={onlineUsers} />
      </div>

      <Messenger />
    </>
  );
}

export default Home;
