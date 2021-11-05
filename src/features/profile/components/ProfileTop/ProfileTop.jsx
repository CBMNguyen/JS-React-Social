import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CoverAndAvatarImg from "./CoverAndAvatarImg";
import { style } from "./profileTopStyle";
import ProfileTopTab from "./ProfileTopTab";
import ProfileTopUserInfo from "./ProfileTopUserInfo";

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
        <CoverAndAvatarImg user={user} />

        {/* Profile Top User Info */}
        <ProfileTopUserInfo currentUser={currentUser} user={user} />

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
