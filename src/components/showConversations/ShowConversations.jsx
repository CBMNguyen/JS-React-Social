import { setCurrentChat } from "app/messengerSlice";
import Conversation from "components/conversations/Conversation";
import React from "react";
import { useDispatch } from "react-redux";
import "./showconversation.css";

function ShowConversations({
  conversations,
  currentUser,
  showConversations,
  setShowConversations,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="showConversation">
        <h2 className="showConversationTitle">Messenger</h2>
        <input
          className="showConversationInput"
          placeholder="Search friend on messenger"
        />
        {conversations.map((conversation) => (
          <div
            onClick={() => {
              dispatch(setCurrentChat(conversation));
              setShowConversations(!showConversations);
            }}
            key={conversation._id}
          >
            <Conversation
              currentUser={currentUser}
              conversation={conversation}
            />
          </div>
        ))}
      </div>

      <div
        className="closeConversation"
        onClick={() => setShowConversations(false)}
      ></div>
    </>
  );
}

export default ShowConversations;
