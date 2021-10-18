import axios from "axios";
import Topbar from "components/topbar/Topbar";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatOnline from "./components/chatOnline/chatOnline";
import Conversation from "./components/conversations/Conversation";
import Message from "./components/message/Message";
import "./messenger.css";

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2022/api/conversations/" + user._id
        );
        setConversations(res.data.conversation);
      } catch (error) {
        console.log(error);
      }
    };
    user._id && getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2022/api/messages/" + currentChat._id
        );
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    currentChat && getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post(
        "http://localhost:2022/api/messages/",
        message
      );
      setMessages([...messages, res.data.savedMessage]);
      setNewMessage("");
    } catch (error) {}
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div key={message._id} ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.senderId === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    className="chatMessageInput"
                    placeholder="write something ..."
                  ></textarea>
                  <button onClick={handleSubmit} className="chatSubmitButton">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
