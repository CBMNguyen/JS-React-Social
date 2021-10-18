import userApi from "api/user";
import { getTimeLine } from "app/postSlice";
import Feed from "components/feed/Feed";
import Rightbar from "components/rightbar/Rightbar";
import Topbar from "components/topbar/Topbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastError, showToastSuccess } from "utils/common";
import Sidebar from "./components/sidebar/Sidebar";
import "./home.css";

function Home(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [friends, setFriends] = useState([]);

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

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar friends={friends} />
        <Feed posts={posts} />
        <Rightbar friends={friends} />
      </div>
    </>
  );
}

export default Home;
