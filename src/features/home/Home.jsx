import { Box } from "@mui/system";
import { getConversations } from "app/messengerSlice";
import { getTimeLine } from "app/postSlice";
import Feed from "components/feed/Feed";
import Messenger from "components/messenger/Messenger";
import Topbar from "components/topbar/Topbar";
import { getMe } from "features/auth/userSlice";
import Rightbar from "features/home/components/rightbar/Rightbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastError, showToastSuccess } from "utils/common";
import Sidebar from "./components/sidebar/Sidebar";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { onlineUsers } = useSelector((state) => state.messenger);

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
      <Box sx={{ display: "flex", width: "100%", backgroundColor: "#f0f2f5" }}>
        <Sidebar user={user} />
        <Feed posts={posts} />
        <Rightbar currentUserId={user._id} onlineUsers={onlineUsers} />
      </Box>

      <Messenger />
    </>
  );
}

export default Home;
