import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import userApi from "api/user";
import {
  createComment,
  createCommentSocket,
  createLikeCommentSocket,
  createLikeSocket,
  likeAndDislike,
  likeAndDislikeComment,
} from "app/postSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showToastError, showToastSuccess } from "utils/common";
import CardActionn from "./components/CardAction";
import CardBottom from "./components/CardBottom";
import CardHeaderr from "./components/CardHeader";
import ShowStateHeader from "./components/ShowStateHeader";

function Post({ post, currentUser, socket }) {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [user, setUser] = useState({});
  const [openStates, setOpenStates] = useState(false);
  const [userNamelikePost, setUsernameLikePost] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

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

  useEffect(() => {
    const fetchUserLikeBox = async () => {
      try {
        const data = await Promise.all(
          post.likes.map((like) => userApi.getUserById(like.userId))
        );
        const usernames = data.map((user, index) => ({
          username: user.user.username,
          state: post.likes[index].state,
        }));
        setUsernameLikePost(usernames);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserLikeBox();
  }, [post.likes]);

  // Add emoji correct order
  useEffect(() => {
    if (inputRef.current) inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  // Get comment realtime
  useEffect(() => {
    socket?.on("getComment", ({ postId, comment }) => {
      if (comment.userId !== currentUser._id && post._id === postId)
        dispatch(createCommentSocket({ postId, comment }));
    });
  }, [socket, currentUser._id, dispatch, post._id]);

  // Get like realtime
  useEffect(() => {
    socket?.on("getLike", ({ postId, state, senderId }) => {
      if (senderId !== currentUser._id && post._id === postId)
        dispatch(createLikeSocket({ postId, state, userId: senderId }));
    });
  }, [socket, currentUser._id, dispatch, post._id]);

  // Get LikeComment realtime
  useEffect(() => {
    socket?.on("getLikeComment", ({ postId, commentId, state, senderId }) => {
      if (senderId !== currentUser._id && post._id === postId)
        dispatch(
          createLikeCommentSocket({ postId, commentId, state, senderId })
        );
    });
  }, [socket, currentUser._id, dispatch, post._id]);

  const handleLikeClick = async (postId, state, userId) => {
    try {
      await showToastSuccess(
        dispatch(
          likeAndDislike({
            postId,
            state,
            userId,
          })
        )
      );

      socket.emit("addLike", {
        // add like post with socket
        postId,
        senderId: currentUser._id,
        state,
      });
    } catch (error) {
      showToastError(error);
    }
  };

  const handleCommentClick = async (state, commentId, userId) => {
    try {
      await showToastSuccess(
        dispatch(
          likeAndDislikeComment({ postId: post._id, state, commentId, userId })
        )
      );

      socket.emit("addLikeComment", {
        // add like comment with socket
        postId: post._id,
        commentId,
        senderId: currentUser._id,
        state,
      });
    } catch (error) {
      showToastError(error);
    }
  };

  // handle emoji
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePickEmoji = (e, { emoji }) => {
    const ref = inputRef.current;
    ref.focus();
    const start = ref.value.substring(0, ref.selectionStart);
    const end = ref.value.substring(ref.selectionStart);
    const text = start + emoji + end;
    ref.value = text;
    setCursorPosition(start.length + emoji.length);
  };
  // =====================================================

  const handleCreateComment = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value || !inputRef.current.value.trim("")) return;

    try {
      const { postId, comment } = await showToastSuccess(
        dispatch(
          createComment({ postId: post._id, text: inputRef.current.value })
        )
      );

      socket.emit("addComment", {
        // add comment with socket
        postId,
        comment,
      });

      inputRef.current.value = "";
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <Card elevation={2} sx={{ width: "100%", mb: "20px", borderRadius: "8px" }}>
      <CardHeaderr user={user} post={post} />

      <CardContent sx={{ pt: 0 }}>
        <Typography variant="span">{post?.desc || ""}</Typography>
      </CardContent>

      {post.img && (
        <CardMedia
          component="img"
          image={`${process.env.REACT_APP_API_URL}/${post.img}`}
          alt="Paella dish"
          sx={{ objectFit: "contain", maxHeight: 500 }}
        />
      )}

      <ShowStateHeader
        post={post}
        currentUser={currentUser}
        userNamelikePost={userNamelikePost}
        handleExpandClick={handleExpandClick}
      />

      <Divider />

      <CardActionn
        post={post}
        openStates={openStates}
        currentUser={currentUser}
        setOpenStates={setOpenStates}
        handleLikeClick={handleLikeClick}
        handleExpandClick={handleExpandClick}
      />

      <Divider />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardBottom
          post={post}
          user={user}
          inputRef={inputRef}
          showEmoji={showEmoji}
          setShowEmoji={setShowEmoji}
          handlePickEmoji={handlePickEmoji}
          handleCreateComment={handleCreateComment}
          handleCommentClick={handleCommentClick}
          currentUser={currentUser}
        />
      </Collapse>
    </Card>
  );
}

export default Post;
