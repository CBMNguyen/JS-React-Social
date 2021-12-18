import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Avatar, Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import NoAvatarImg from "../../../../assets/person/noAvatar.png";
import coverImg from "../../../../assets/post/9.jpeg";
import { style } from "./profileTopStyle";

function CoverAndAvatarImg({ user, currentUser }) {
  const { onlineUsers } = useSelector((state) => state.notification);
  return (
    <Box sx={style.profileTopWrapper}>
      <Box
        component="img"
        sx={style.profileTopCoverImg}
        src={
          user?.coverPicture?.length > 0
            ? user?.coverPicture[user?.coverPicture.length - 1]
            : coverImg
        }
        alt=""
      />

      <Button
        color="inherit"
        variant="contained"
        sx={style.profileTopEditButton}
        startIcon={<CameraAltIcon />}
      >
        Chỉnh sửa ảnh bìa
      </Button>

      <Box sx={style.profileTopAvatarContainer}>
        <Box sx={style.profileTopAvatarWrapper}>
          <Avatar
            id={user._id}
            sx={{ width: "100%", height: "100%" }}
            src={
              user?.profilePicture?.length > 0
                ? `${process.env.REACT_APP_API_URL}/${
                    user?.profilePicture[user?.profilePicture?.length - 1]
                  }`
                : NoAvatarImg
            }
            alt=""
          />

          {currentUser.user._id === user._id ? (
            <IconButton sx={style.profileTopCameraIcon}>
              <CameraAltIcon sx={{ color: "#333" }} />
            </IconButton>
          ) : onlineUsers.includes(user._id) ? (
            <Box
              sx={{
                ...style.profileTopCameraIcon,
                borderRadius: "50%",
                backgroundColor: "#0b0",
                border: "4px solid #fff",
              }}
            />
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CoverAndAvatarImg;
