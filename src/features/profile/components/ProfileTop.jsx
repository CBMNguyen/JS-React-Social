import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import NoAvatarImg from "../../../assets/person/noAvatar.png";
import coverImg from "../../../assets/post/9.jpeg";
import { style } from "../profileTopStyle";
import ProfileTopTab from "./ProfileTopTab";

function ProfileTop({
  user,
  currentUser,
  userId,
  value,
  handleChange,
  handleFollowClick,
}) {
  return (
    <Box sx={style.profileTopBg}>
      <Box sx={style.profileTopWidth}>
        {/* Profile Top Cover Img & Profile Picture */}
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

          <Box
            component="img"
            sx={style.profileTopAvatarImg}
            src={
              user?.profilePicture?.length > 0
                ? `${process.env.REACT_APP_API_URL}/upload/${
                    user?.profilePicture[user?.profilePicture?.length - 1]
                  }`
                : NoAvatarImg
            }
            alt=""
          />
        </Box>
        {/* Profile Top User Info */}
        <Box
          sx={{
            ...style.flexAlignItemCenter,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box component="h1" sx={{ mt: "8px", textTransform: "capitalize" }}>
            {user?.username}
          </Box>
          <Box component="span" sx={{ fontWeight: 300 }}>
            {user?.desc || "..."}
          </Box>
          <Box component="span" sx={{ fontWeight: 400, color: "blue" }}>
            Chỉnh sửa
          </Box>
        </Box>

        <Divider sx={{ marginY: 1 / 2 }} />

        {/* Profile Top Tabs  */}
        <ProfileTopTab
          value={value}
          handleChange={handleChange}
          currentUser={currentUser}
          handleFollowClick={handleFollowClick}
          userId={userId}
          user={user}
        />
      </Box>

      <Divider sx={{ marginY: 1 / 2 }} />
    </Box>
  );
}

export default ProfileTop;
