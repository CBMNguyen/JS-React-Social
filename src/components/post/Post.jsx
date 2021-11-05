import { CameraAltOutlined } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { AvatarGroup, Button, Divider, IconButton, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import userApi from "api/user";
import {
  createComment,
  createCommentSocket,
  createLikeSocket,
  likeAndDislike,
  likeAndDislikeComment,
} from "app/postSlice";
import { states } from "constants/global";
import { BlackTooltip, TransparentTooltip } from "constants/mui";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import {
  capitalizeFirstLetter,
  countState,
  currentState,
  currentStateAvatar,
  formatDateFull,
  showToastError,
  showToastSuccess,
  StyledBadge,
} from "utils/common";
import NoAvatarImg from "../../assets/person/noAvatar.png";
import Comment from "../../components/comment/Comment";

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

  useEffect(() => {
    if (inputRef.current) inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  useEffect(() => {
    socket?.on("getComment", ({ postId, comment }) => {
      if (comment.userId !== currentUser._id && post._id === postId)
        dispatch(createCommentSocket({ postId, comment }));
    });
  }, [socket, currentUser._id, dispatch, post._id]);

  useEffect(() => {
    socket?.on("getLike", ({ postId, state, senderId }) => {
      if (senderId !== currentUser._id && post._id === postId)
        dispatch(createLikeSocket({ postId, state, userId: senderId }));
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
        postId,
        senderId: currentUser._id,
        state,
      });

      if (currentUser._id !== post.userId) {
        socket.emit("addNotification", {
          postId,
          senderId: currentUser._id,
          receiverId: post.userId,
          type: state,
        });
      }
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
    } catch (error) {
      showToastError(error);
    }
  };

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
      <CardHeader
        avatar={
          <Link to={`/profile/${user._id}`}>
            <Avatar
              src={
                user?.profilePicture?.length > 0
                  ? `${process.env.REACT_APP_API_URL}/${
                      user?.profilePicture[user?.profilePicture?.length - 1]
                    }`
                  : NoAvatarImg
              }
              aria-label="recipe"
            />
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            component="span"
          >
            {user?.username || ""}
          </Typography>
        }
        subheader={
          <BlackTooltip title={formatDateFull(new Date(post.createdAt))}>
            <Box
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
              component="span"
            >
              {format(new Date(post.createdAt))}
            </Box>
          </BlackTooltip>
        }
      />

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

      {(post.likes.length > 0 || post.comments.length > 0) && (
        <CardContent sx={{ py: 1.5 }}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AvatarGroup sx={{ "&:hover": { cursor: "pointer" } }} max={10}>
                {states.map((item, index) => {
                  return (
                    <BlackTooltip
                      key={index}
                      title={
                        <Box>
                          <Box sx={{ fontSize: "14px", mb: 1 }}>
                            {currentState(index).name}
                          </Box>
                          {userNamelikePost.map((user, i) => {
                            if (user.state === index) {
                              return (
                                <Box sx={{ maxWidth: "100px" }} key={index}>
                                  {index > 19
                                    ? `và ${
                                        userNamelikePost.length - 19
                                      } người khác...`
                                    : capitalizeFirstLetter(
                                        user.username || ""
                                      )}
                                </Box>
                              );
                            }

                            return <Box key={i} sx={{ display: "none" }} />;
                          })}
                        </Box>
                      }
                    >
                      <Avatar
                        sx={{
                          width: "24px",
                          height: "24px",
                          display:
                            countState(post.likes, index) > 0 ? "flex" : "none",
                        }}
                        key={index}
                        src={item}
                      />
                    </BlackTooltip>
                  );
                })}
              </AvatarGroup>

              <BlackTooltip
                title={userNamelikePost.slice(0, 21).map((user, index) => {
                  return (
                    <Box sx={{ maxWidth: "100px" }} key={index}>
                      {index > 19
                        ? `và ${userNamelikePost.length - 19} người khác...`
                        : capitalizeFirstLetter(user.username || "")}
                    </Box>
                  );
                })}
              >
                <Box
                  sx={{
                    ml: 1,
                    "&:hover": {
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {post.likes.some((like) => like.userId === currentUser._id) &&
                  post.likes.length > 1
                    ? `Bạn và ${post.likes.length - 1} người khác`
                    : ""}
                </Box>
              </BlackTooltip>
            </Box>

            <Box sx={{ display: "flex", alignItem: "center" }}>
              <Box
                onClick={handleExpandClick}
                component="span"
                sx={{
                  mr: 1 / 2,
                  "&:hover": { cursor: "pointer", textDecoration: "underline" },
                }}
              >{`${post.comments.length} bình luận `}</Box>
            </Box>
          </Stack>
        </CardContent>
      )}

      <Divider />

      <CardActions sx={{ py: 0.5 }} disableSpacing>
        <Stack
          onMouseLeave={() => setOpenStates(false)}
          sx={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <TransparentTooltip
            open={openStates}
            placement="top"
            title={
              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                {states.map((item, index) => (
                  <Box
                    className="animate__animated animate__pulse animate__infinite	infinite"
                    onClick={() => {
                      handleLikeClick(post._id, index, currentUser._id);
                      setOpenStates(false);
                    }}
                    key={index}
                    sx={{
                      width: "34px",
                      height: "34px",
                      paddingX: "4px",
                      mt: "2px",

                      transition: "all 0.5s easy-in-out 0s",
                      "&:hover": {
                        position: "relative",
                        marginTop: "-10px",
                        cursor: "pointer",
                      },
                    }}
                    component="img"
                    src={item}
                  />
                ))}
              </Stack>
            }
          >
            <Button
              sx={{
                width: 1 / 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "38px",
                "&:hover": {
                  backgroundColor: "#eee",
                },
              }}
              onClick={() => handleLikeClick(post._id, 0, currentUser._id)}
              onMouseEnter={() => setOpenStates(true)}
              color="inherit"
            >
              {!currentStateAvatar(
                post.likes.find((like) => like.userId === currentUser._id)
                  ?.state || -1
              ).img ? (
                <ThumbUpOffAltIcon
                  color={
                    post.likes.find((like) => like.userId === currentUser._id)
                      ?.state === 0
                      ? "info"
                      : "inherit"
                  }
                />
              ) : (
                <Avatar
                  sx={{ width: "20px", height: "20px" }}
                  src={
                    currentStateAvatar(
                      post.likes.find((like) => like.userId === currentUser._id)
                        ?.state || -1
                    ).img
                  }
                ></Avatar>
              )}

              <Box
                sx={{
                  pl: 1,
                  fontSize:
                    currentStateAvatar(
                      post.likes.find((like) => like.userId === currentUser._id)
                        ?.state || -1
                    ).name === "Thương Thương"
                      ? "12px"
                      : "14px",
                  color:
                    post.likes.find((like) => like.userId === currentUser._id)
                      ?.state === 0
                      ? "rgb(32, 120, 244)"
                      : currentStateAvatar(
                          post.likes.find(
                            (like) => like.userId === currentUser._id
                          )?.state || -1
                        ).color,
                }}
              >
                {
                  currentStateAvatar(
                    post.likes.find((like) => like.userId === currentUser._id)
                      ?.state || -1
                  ).name
                }
              </Box>
            </Button>
          </TransparentTooltip>

          <Button
            sx={{
              width: 1 / 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "38px",
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
            color="inherit"
            onClick={handleExpandClick}
          >
            <ChatBubbleOutlineIcon />

            <Box sx={{ pl: 1 }}>Bình Luận</Box>
          </Button>

          <Button
            sx={{
              width: 1 / 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "38px",
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
            color="inherit"
          >
            <ShareIcon />
            <Box sx={{ pl: 1 }}>Chia sẻ</Box>
          </Button>
        </Stack>
      </CardActions>

      <Divider />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            pt: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
          >
            <Box>Phù hợp nhất</Box>
            <IconButton>
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to={`/profile/${user._id}`}>
              <StyledBadge
                variant="dot"
                color="success"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                overlap="circular"
              >
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  src={
                    user?.profilePicture?.length > 0
                      ? `${process.env.REACT_APP_API_URL}/${
                          user?.profilePicture[user?.profilePicture?.length - 1]
                        }`
                      : NoAvatarImg
                  }
                />
              </StyledBadge>
            </Link>

            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "95%",
                backgroundColor: "#f0f2f5",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  height: 28,
                  pl: 2,
                  border: "none",
                  backgroundColor: "inherit",
                  borderRadius: "20px",
                }}
                component="form"
                onSubmit={handleCreateComment}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 28,
                    border: "none",
                    backgroundColor: "inherit",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  ref={inputRef}
                  onClick={() => setShowEmoji(false)}
                  component="input"
                  placeholder="Viết bình luận"
                />
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 2000,
                    bottom: "42px",
                    right: 0,
                  }}
                >
                  {showEmoji && <Picker onEmojiClick={handlePickEmoji} />}
                </Box>
                {showEmoji && (
                  <Box
                    onClick={() => setShowEmoji(false)}
                    sx={{
                      zIndex: 1999,
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100vh",
                      backgroundColor: "transparent",
                    }}
                  />
                )}
              </Box>

              <Box>
                <BlackTooltip title="Chèn một biểu tượng cảm xúc">
                  <IconButton
                    onClick={() => {
                      setShowEmoji(!showEmoji);
                      inputRef.current.focus();
                    }}
                  >
                    <EmojiEmotions fontSize="small" />
                  </IconButton>
                </BlackTooltip>

                <BlackTooltip title="Đính kèm một ảnh hoặc video">
                  <IconButton>
                    <CameraAltOutlined fontSize="small" />
                  </IconButton>
                </BlackTooltip>
                <BlackTooltip title="Bình luận bằng GIF">
                  <IconButton>
                    <GifOutlinedIcon fontSize="small" />
                  </IconButton>
                </BlackTooltip>

                <BlackTooltip title="Bình luận bằng nhãn dán">
                  <IconButton>
                    <FileCopyOutlinedIcon fontSize="small" />
                  </IconButton>
                </BlackTooltip>
              </Box>
            </Box>
          </Box>
          {post.comments.length > 0 &&
            post.comments.map((comment) => (
              <Comment
                key={comment._id}
                onCommentClick={handleCommentClick}
                comment={comment}
                currentUser={currentUser}
              />
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
