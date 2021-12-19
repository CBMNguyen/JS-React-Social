import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import GifIcon from "@mui/icons-material/Gif";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import PhotoIcon from "@mui/icons-material/Photo";
import SendIcon from "@mui/icons-material/Send";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Avatar, Grow, IconButton, Paper, Popover } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import userApi from "api/user";
import {
  getMessages,
  setArrivalMessage,
  setCurrentChat,
  setMessages,
} from "app/messengerSlice";
import { setOnlineUsers } from "app/notificationSlice";
import axios from "axios";
import { messengerToolTip } from "constants/global";
import { BlackTooltip } from "constants/mui";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StyledBadge } from "utils/common";
import noAvatarImg from "../../assets/person/noAvatar.png";
import Message from "../message/Message";

function Messenger({ socket }) {
  const { user } = useSelector((state) => state.user);
  const [arrivalUser, setArrivalUser] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const inputRef = useRef();
  const scrollRef = useRef();
  const dispatch = useDispatch();

  const { currentChat, messages, arrivalMessage } = useSelector(
    (state) => state.messenger
  );

  const { onlineUsers } = useSelector((state) => state.notification);
  // get current messenger User
  useEffect(() => {
    const getArrivalUser = async () => {
      const arrivalUserId = currentChat.members.find(
        (userId) => userId !== user._id
      );
      const data = await userApi.getUserById(arrivalUserId);
      setArrivalUser(data.user);
    };
    currentChat && getArrivalUser();
  }, [currentChat, user]);
  // handle bind socket and get Message
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      dispatch(
        setArrivalMessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        })
      );
    });
  }, [dispatch, socket]);
  // handle update arrival Message
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      dispatch(setMessages(arrivalMessage));
  }, [arrivalMessage, currentChat, dispatch]);

  useEffect(() => {
    socket?.emit("addUser", user._id);
    socket?.on("getUsers", (users) => {
      dispatch(
        setOnlineUsers(
          user?.followings?.filter((f) => users.some((u) => u.userId === f))
        )
      );
    });
  }, [user, dispatch, socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await dispatch(getMessages(currentChat._id));
      } catch (error) {
        console.log(error);
      }
    };
    currentChat && fetchMessages();
  }, [currentChat, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handlePickEmoji = (e, { emoji }) => {
    const ref = inputRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const text = start + emoji + end;
    setMessage(text);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  // handle show user chat bar
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // handle hide user chat bar
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = inputRef.current.value;

    const message = {
      senderId: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/messages/`,
        message
      );
      dispatch(setMessages(res.data.savedMessage));
      inputRef.current.value = "";
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    currentChat && (
      <>
        <Grow in={!!currentChat}>
          <Paper
            elevation={2}
            sx={{
              position: "fixed",
              bottom: 0,
              right: "5px",
              zIndex: 99,
              paddingBottom: "90px",

              width: "350px",
              height: "440px",
              display: "flex",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px",

                  height: "48px",
                  borderBottom: "2px solid #0002",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              >
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  sx={{ position: "absolute", left: "-334px", top: "8px" }}
                >
                  <List sx={{ width: "320px", padding: "2px" }}>
                    {messengerToolTip.map((item, index) => {
                      let divider = <span />;
                      if (
                        index === 1 ||
                        index === 4 ||
                        index === 5 ||
                        index === 8
                      )
                        divider = <Divider sx={{ marginY: 1 }} />;
                      return (
                        <Link
                          to={
                            index === 1 ? `/profile/${arrivalUser?._id}` : "/"
                          }
                          style={{ color: "#333", textDecoration: "none" }}
                          key={item.name}
                        >
                          <ListItem disablePadding>
                            <ListItemButton sx={{ padding: 0 }}>
                              <ListItemIcon
                                sx={{
                                  paddingLeft: "8px",
                                }}
                              >
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Box
                                    sx={{ fontWeight: "500", color: "#333" }}
                                  >
                                    <Box>{item.name}</Box>
                                    {index === messengerToolTip.length - 1 && (
                                      <Box
                                        sx={{
                                          fontSize: "12px",
                                          color: "#555",
                                        }}
                                      >
                                        Đóng góp ý kiến và báo cáo cuộc trò
                                        chuyện
                                      </Box>
                                    )}
                                  </Box>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          {divider}
                        </Link>
                      );
                    })}
                  </List>
                </Popover>

                <BlackTooltip placement="top" title="Cài đặt chat">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "2px",
                      borderRadius: "4px",
                      transition: "all 0.5s easy-in-out 0s",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#f0f2f5",
                      },
                    }}
                    aria-describedby={id}
                    onClick={handleClick}
                  >
                    <StyledBadge
                      variant="dot"
                      color={
                        onlineUsers.includes(arrivalUser?._id)
                          ? "success"
                          : "default"
                      }
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <Avatar
                        sx={{ width: "32px", height: "32px" }}
                        src={
                          arrivalUser?.profilePicture?.length > 0
                            ? `${process.env.REACT_APP_API_URL}/${
                                arrivalUser?.profilePicture[
                                  arrivalUser?.profilePicture?.length - 1
                                ]
                              }`
                            : noAvatarImg
                        }
                        alt=""
                      ></Avatar>
                    </StyledBadge>

                    <Box
                      sx={{
                        marginLeft: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 500,
                          color: "rgb(53, 52, 52)",
                          textTransform: "capitalize",
                        }}
                      >
                        {arrivalUser?.username}
                        <KeyboardArrowDownOutlinedIcon
                          sx={{ fontSize: "18px", ml: "2px" }}
                        />
                      </Box>

                      {onlineUsers.includes(arrivalUser?._id) && (
                        <Box
                          sx={{
                            fontSize: "12px",
                          }}
                          component="span"
                        >
                          đang hoạt động
                        </Box>
                      )}
                    </Box>
                  </Box>
                </BlackTooltip>

                <Box>
                  <BlackTooltip
                    title={`Bắt đầu chat video với ${arrivalUser?.username}`}
                  >
                    <IconButton>
                      <VideocamIcon color="primary" />
                    </IconButton>
                  </BlackTooltip>
                  <BlackTooltip
                    title={`Bắt đầu cuộc hoại thoại với ${arrivalUser?.username}`}
                  >
                    <IconButton>
                      <PhoneIcon color="primary" />
                    </IconButton>
                  </BlackTooltip>

                  <BlackTooltip title="Thu nhỏ đoạn chat">
                    <IconButton>
                      <HorizontalRuleIcon color="primary" />
                    </IconButton>
                  </BlackTooltip>

                  <BlackTooltip title="Đóng đoạn chat">
                    <IconButton onClick={() => dispatch(setCurrentChat(null))}>
                      <CloseIcon color="primary" />
                    </IconButton>
                  </BlackTooltip>
                </Box>
              </Box>

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",

                  padding: "10px",
                  paddingRight: "5px",
                  paddingTop: 0,
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    overflowY: "scroll",
                    paddingRight: "10px",
                  }}
                >
                  {messages.map((message) => (
                    <div key={message._id} ref={scrollRef}>
                      <Message
                        user={user}
                        arrivalUser={arrivalUser}
                        message={message}
                        own={message.senderId === user._id}
                      />
                    </div>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "95%",

                margin: "0 2.5%",
                borderRadius: "20px",
                border: "1px solid lightgray",
              }}
            >
              <BlackTooltip title="Mở một hành động khác">
                <IconButton sx={{ paddingLeft: "5px", paddingRight: 0 }}>
                  <AddCircleIcon color="primary" />
                </IconButton>
              </BlackTooltip>

              <BlackTooltip title="Đính kèm một hình ảnh  hoặc video">
                <IconButton>
                  <PhotoIcon color="primary" />
                </IconButton>
              </BlackTooltip>

              <BlackTooltip title="Chọn nhãn dán">
                <IconButton sx={{ paddingX: 0 }}>
                  <StickyNote2Icon color="primary" />
                </IconButton>
              </BlackTooltip>

              <BlackTooltip title="Chọn file gif">
                <IconButton>
                  <GifIcon color="primary" />
                </IconButton>
              </BlackTooltip>

              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "-325px",
                    left: "-220px",
                  }}
                >
                  {showEmoji && <Picker onEmojiClick={handlePickEmoji} />}
                </Box>

                <BlackTooltip title="Chọn biểu tượng cảm xúc">
                  <IconButton
                    sx={{ paddingX: 0 }}
                    onClick={() => {
                      setShowEmoji(!showEmoji);
                      inputRef.current.focus();
                    }}
                  >
                    <InsertEmoticonIcon />
                  </IconButton>
                </BlackTooltip>
              </Box>

              <Box component="form" onSubmit={message ? handleSubmit : null}>
                <Box
                  component="input"
                  onClick={() => setShowEmoji(false)}
                  onChange={(e) => setMessage(e.target.value)}
                  ref={inputRef}
                  value={message}
                  className="chatMessageInput"
                  placeholder="write something ..."
                  sx={{
                    border: "none",
                    width: "80%",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                />
              </Box>

              <BlackTooltip title="Gửi tin nhắn">
                <IconButton onClick={message ? handleSubmit : null}>
                  <SendIcon color="primary" />
                </IconButton>
              </BlackTooltip>
            </Box>
          </Paper>
        </Grow>
      </>
    )
  );
}

export default Messenger;
