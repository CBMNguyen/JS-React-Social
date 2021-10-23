import CloseIcon from "@mui/icons-material/Close";
import userApi from "api/user";
import {
  getMessages,
  setArrivalMessage,
  setCurrentChat,
  setMessages,
  setOnlineUsers,
} from "app/messengerSlice";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Picker from "emoji-picker-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import noAvatarImg from "../../assets/person/noAvatar.png";
import Message from "../message/Message";
import "./messenger.css";
import { Grow, IconButton, Tooltip } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PhotoIcon from "@mui/icons-material/Photo";
import GifIcon from "@mui/icons-material/Gif";
import SendIcon from "@mui/icons-material/Send";

function Messenger() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();

  const inputRef = useRef();
  const socket = useRef();
  const scrollRef = useRef();
  const dispatch = useDispatch();

  // =====================================
  const { user } = useSelector((state) => state.user);
  const { currentChat, messages, arrivalMessage, onlineUsers } = useSelector(
    (state) => state.messenger
  );

  const [arrivalUser, setArrivalUser] = useState(null);
  const [arrivalUserOnline, setArrivalUserOnline] = useState(false);

  useEffect(() => {
    const isOnline = onlineUsers?.includes(arrivalUser?._id);
    setArrivalUserOnline(isOnline);
  }, [onlineUsers, arrivalUser]);

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

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_WS_URL);
    socket.current.on("getMessage", (data) => {
      dispatch(
        setArrivalMessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        })
      );
    });
  }, [dispatch]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      dispatch(setMessages(arrivalMessage));
  }, [arrivalMessage, currentChat, dispatch]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      dispatch(
        setOnlineUsers(
          user?.followings?.filter((f) => users.some((u) => u.userId === f))
        )
      );
    });
  }, [user, dispatch]);

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

  // =====================================

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

    socket.current.emit("sendMessage", {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    currentChat && (
      <Grow in={!!currentChat}>
        <div className="messenger">
          <div className="chatBox">
            <div className="chatBoxTop">
              <div className="chatBoxTopInfo">
                <div
                  style={{
                    position: "relative",
                    width: "32px",
                    height: "32px",
                  }}
                >
                  <img
                    className="chatBoxTopImg"
                    src={arrivalUser?.profilePicture || noAvatarImg}
                    alt=""
                  ></img>
                  {arrivalUserOnline && <div className="chatBoxTopBadge"></div>}
                </div>
                <div className="chatBoxTopName">{arrivalUser?.username}</div>
              </div>

              <div>
                <Tooltip
                  title={`Bắt đầu chat video với ${arrivalUser?.username}`}
                >
                  <IconButton>
                    <VideocamIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={`Bắt đầu cuộc hoại thoại với ${arrivalUser?.username}`}
                >
                  <IconButton>
                    <PhoneIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Thu nhỏ đoạn chat">
                  <IconButton>
                    <HorizontalRuleIcon color="primary" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Đóng đoạn chat">
                  <IconButton onClick={() => dispatch(setCurrentChat(null))}>
                    <CloseIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <div className="chatBoxWrapper">
              <div className="chatBoxText">
                {messages.map((message) => (
                  <div key={message._id} ref={scrollRef}>
                    <Message
                      message={message}
                      own={message.senderId === user._id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chatBoxBottom">
            <Tooltip title="Mở một hành động khác">
              <IconButton>
                <AddCircleIcon color="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Đính kèm một hình ảnh  hoặc video">
              <IconButton>
                <PhotoIcon color="primary" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Chọn file gif">
              <IconButton>
                <GifIcon color="primary" />
              </IconButton>
            </Tooltip>

            <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", top: "-325px", left: "-220px" }}
              >
                {showEmoji && <Picker onEmojiClick={handlePickEmoji} />}
              </div>

              <Tooltip title="Chọn biểu tượng cảm xúc">
                <IconButton
                  onClick={() => {
                    setShowEmoji(!showEmoji);
                    inputRef.current.focus();
                  }}
                >
                  <InsertEmoticonIcon />
                </IconButton>
              </Tooltip>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                onClick={() => setShowEmoji(false)}
                onChange={(e) => setMessage(e.target.value)}
                ref={inputRef}
                value={message}
                className="chatMessageInput"
                placeholder="write something ..."
              />
            </form>

            <Tooltip title="Gửi tin nhắn">
              <IconButton>
                <SendIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Grow>
    )
  );
}

export default Messenger;
