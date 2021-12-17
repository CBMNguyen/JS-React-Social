import BorderColorIcon from "@mui/icons-material/BorderColor";
import GridViewIcon from "@mui/icons-material/GridView";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { IconButton, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { setCurrentChat } from "app/messengerSlice";
import Conversation from "components/conversations/Conversation";
import { BlackTooltip } from "constants/mui";
import React from "react";
import { useDispatch } from "react-redux";

function ShowConversations({ conversations, currentUser, handleChatClose }) {
  const dispatch = useDispatch();

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",

        width: "340px",
        maxHeight: "700px",
        borderRadius: "8px",
        padding: "10px",
        paddingBottom: 0,

        backgroundColor: "#fff",
        color: "#000",
        transition: "all 0.4s easy-in-out 0s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="h2" sx={{ mt: "10px", ml: "10px" }}>
          Messenger
        </Box>

        <Box>
          <BlackTooltip title="Tùy chọn">
            <IconButton>
              <MoreHorizIcon fontSize="small" color="textSecondary" />
            </IconButton>
          </BlackTooltip>

          <BlackTooltip title="Xem tất cả trong messenger">
            <IconButton>
              <GridViewIcon fontSize="small" color="textSecondary" />
            </IconButton>
          </BlackTooltip>

          <BlackTooltip title="Tạo phòng họp mặt mới">
            <IconButton>
              <VideoCallIcon fontSize="small" color="textSecondary" />
            </IconButton>
          </BlackTooltip>

          <BlackTooltip title="Tin nhắn mới">
            <IconButton>
              <BorderColorIcon fontSize="small" color="textSecondary" />
            </IconButton>
          </BlackTooltip>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "90%",
          height: "24px",
          margin: "auto",
          marginY: "20px",
          padding: "5px 0",

          backgroundColor: "#f0f2f5",
          border: "1px solid lightgray",
          borderRadius: "20px",
        }}
      >
        <SearchIcon sx={{ fontSize: "20px", ml: "10px", color: "#0008" }} />
        <Box
          component="input"
          sx={{
            width: "100%",
            border: "none",
            backgroundColor: "inherit",
            "&:focus": {
              outline: "none",
            },
          }}
          placeholder="Search friend on messenger"
        />
      </Box>
      {conversations.map((conversation) => (
        <div
          onClick={() => {
            dispatch(setCurrentChat(conversation));
            handleChatClose();
          }}
          key={conversation._id}
        >
          <Conversation currentUser={currentUser} conversation={conversation} />
        </div>
      ))}

      <Box
        sx={{
          display: "block",
          padding: "12px 0",
          borderTop: "2px solid #f0f2f5",

          color: "#1877f2",
          textAlign: "center",
          textDecoration: "none",
          fontSize: "14px",
          transition: "all 0.2s ease-in-out 0s",

          "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
          },
        }}
      >
        Xem tất cả trong Messenger
      </Box>
    </Paper>
  );
}

export default ShowConversations;
