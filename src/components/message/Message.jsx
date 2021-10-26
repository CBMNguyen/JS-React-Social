import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { format } from "timeago.js";
import noAvatarImg from "../../assets/person/noAvatar.png";

function Message({ own, message }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        alignItems: own ? "flex-start" : "flex-end",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ width: "32px", height: "32px", mr: "10px" }}
          src={noAvatarImg}
          alt="avatar"
        />
        <Typography
          sx={{
            padding: "8px",
            borderRadius: "16px",
            backgroundColor: own ? "#1877f2" : "#e6e0e0",
            color: own ? "#fff" : "#000",
            maxWidth: "300px",
          }}
          variant="body1"
        >
          {message.text}
        </Typography>
      </Box>
      <Box
        component="span"
        sx={{
          fontSize: "10px",
          marginTop: "8px",
          color: "#0008",
          fontWeight: 500,
        }}
      >
        {format(message.createdAt)}
      </Box>
    </Box>
  );
}

export default Message;
