import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BlackTooltip } from "constants/mui";
import React from "react";
import { format } from "timeago.js";
import noAvatarImg from "../../assets/person/noAvatar.png";

function Message({ own, message, user, arrivalUser }) {
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
          src={
            own
              ? user?.profilePicture?.length > 0
                ? `${process.env.REACT_APP_API_URL}/upload/${
                    user?.profilePicture[user?.profilePicture?.length - 1]
                  }`
                : noAvatarImg
              : arrivalUser?.profilePicture?.length > 0
              ? `${process.env.REACT_APP_API_URL}/upload/${
                  arrivalUser?.profilePicture[
                    arrivalUser?.profilePicture?.length - 1
                  ]
                }`
              : noAvatarImg
          }
          alt="avatar"
        />
        <BlackTooltip
          title={`Thứ ${
            new Date(message.createdAt).getDay() + 1
          } ${`0${new Date(message.createdAt).getHours()}`.slice(
            -2
          )}:${`0${new Date(message.createdAt).getMinutes()}`.slice(-2)}`}
        >
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
        </BlackTooltip>
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
