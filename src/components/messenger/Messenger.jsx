import CloseIcon from "@mui/icons-material/Close";
import userApi from "api/user";
import {
  getMessages,
  setArrivalMessage,
  setCurrentChat,
  setMessages,
  setOnlineUsers,
} from "app/messengerSlice";
import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import noAvatarImg from "../../assets/person/noAvatar.png";
import Message from "../message/Message";
import "./messenger.css";

function Messenger() {
  const socket = useRef();
  const scrollRef = useRef();
  const inputRef = useRef();
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
      <div className="messenger">
        <div className="chatBox">
          <div className="chatBoxTop">
            <div className="chatBoxTopInfo">
              <div
                style={{ position: "relative", width: "32px", height: "32px" }}
              >
                <img
                  className="chatBoxTopImg"
                  src={arrivalUser?.profilePicture || noAvatarImg}
                  alt=""
                ></img>
                <div
                  className={classNames("chatBoxTopBadge", {
                    offline: !arrivalUserOnline,
                  })}
                ></div>
              </div>
              <div className="chatBoxTopName">{arrivalUser?.username}</div>
            </div>

            <div
              onClick={() => dispatch(setCurrentChat(null))}
              className="chatBoxTopClose"
            >
              <CloseIcon />
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
          <input
            ref={inputRef}
            className="chatMessageInput"
            placeholder="write something ..."
          ></input>
          <button onClick={handleSubmit} className="chatSubmitButton">
            Send
          </button>
        </div>
      </div>
    )
  );
}

export default Messenger;
