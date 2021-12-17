import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BlackTooltip } from "constants/mui";
import React from "react";
import { format } from "timeago.js";
import noAvatarImg from "../../assets/person/noAvatar.png";

function Message({ own, message, arrivalUser }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "8px",
        alignItems: !own ? "flex-start" : "flex-end",
      }}
    >
      <Box sx={{ display: "flex" }}>
        {!own && (
          <Avatar
            sx={{ width: "32px", height: "32px", mr: "10px" }}
            src={
              arrivalUser?.profilePicture?.length > 0
                ? `${process.env.REACT_APP_API_URL}/${
                    arrivalUser?.profilePicture[
                      arrivalUser?.profilePicture?.length - 1
                    ]
                  }`
                : noAvatarImg
            }
            alt="avatar"
          />
        )}
        <BlackTooltip
          title={`${`0${new Date(message.createdAt).getHours()}`.slice(
            -2
          )}:${`0${new Date(message.createdAt).getMinutes()}`.slice(-2)}
          ${new Date(message.createdAt).getDate()} Tháng ${
            new Date(message.createdAt).getMonth() + 1
          }, ${new Date(message.createdAt).getFullYear()}
          `}
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
          marginTop: "2px",
          marginLeft: !own ? "48px" : "0px",
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
