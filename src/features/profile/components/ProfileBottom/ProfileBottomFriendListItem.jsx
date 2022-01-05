import NoAvatarImg from "..././../assets/person/noAvatar.png";
import { Avatar } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Box } from "@mui/system";
import userApi from "api/user";
import { default as React, useEffect, useState } from "react";

function ProfileBottomFriendListItem({ handleFriendClick, userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const { user } = await userApi.getUserById(id);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser(userId);
  }, [userId]);
  return (
    <Box key={user._id} onClick={() => handleFriendClick(user)}>
      <ImageListItem>
        <Avatar
          sx={{
            width: "104px",
            height: "104px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          src={
            user?.profilePicture?.length > 0
              ? user?.profilePicture[user?.profilePicture?.length - 1]
              : NoAvatarImg
          }
          srcSet={
            user?.profilePicture?.length > 0
              ? user?.profilePicture[user?.profilePicture?.length - 1]
              : NoAvatarImg
          }
          alt={user?.username}
          loading="lazy"
          style={{ borderRadius: "8px" }}
        />
        <ImageListItemBar
          title={user?.username}
          position="below"
          sx={{
            textAlign: "center",
            textTransform: "capitalize",
          }}
        />
      </ImageListItem>
    </Box>
  );
}

export default ProfileBottomFriendListItem;
