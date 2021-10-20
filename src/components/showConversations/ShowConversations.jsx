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
        >
          <Conversation
            key={conversation._id}
            currentUser={currentUser}
            conversation={conversation}
          />
        </div>
      ))}
    </div>
  );
}

export default ShowConversations;
