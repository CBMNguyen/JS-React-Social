import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import userApi from "api/user";
import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "utils/common";
import noAvatarImg from "../../assets/person/noAvatar.png";

function FriendRequestItem({
  userId,
  onAcceptFriendRequest,
  onRefuseFriendRequest,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const { user } = await userApi.getUserById(userId);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser(userId);
  }, [userId]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Avatar
        sx={{ width: 64, height: 64, mr: 2 }}
        src={
          user?.profilePicture?.length > 0
            ? `${process.env.REACT_APP_API_URL}/${
                user?.profilePicture[user?.profilePicture?.length - 1]
              }`
            : noAvatarImg
        }
        alt="avatar"
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ fontSize: "20px", fontWeight: "500", mb: 1 / 2 }}>
          {capitalizeFirstLetter(user?.username || "")}
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            onClick={() => onAcceptFriendRequest(userId)}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              padding: "5px 10px",
              mr: 1,
              width: "80px",
              textAlign: "center",
              borderRadius: "4px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Chấp nhận
          </Box>

          <Box
            onClick={() => onRefuseFriendRequest(userId)}
            sx={{
              backgroundColor: "lightgray",
              color: "#000",
              padding: "5px 10px",
              width: "80px",
              textAlign: "center",
              borderRadius: "4px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Từ chối
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FriendRequestItem;
