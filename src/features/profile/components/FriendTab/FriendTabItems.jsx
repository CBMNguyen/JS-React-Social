import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import NoAvatarImg from "../../../../assets/person/noAvatar.png";

function FriendTabItems({ user, friends }) {
  const mutualFriends = (friend) => {
    let count = 0;
    user.followings.forEach((userId) => {
      if (friend.followings.includes(userId)) count += 1;
    });
    return count;
  };
  return (
    <Grid container spacing={2}>
      {friends.map((friend) => (
        <Grid item md={6} key={friend._id}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              border: "1px solid #ededed",
              borderRadius: "8px",
            }}
          >
            <Avatar
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
              }}
              src={
                friend?.profilePicture?.length > 0
                  ? `${process.env.REACT_APP_API_URL}/${
                      friend?.profilePicture[friend?.profilePicture?.length - 1]
                    }`
                  : NoAvatarImg
              }
            />

            <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <Box
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  "&:hover": { cursor: "pointer", textDecoration: "underline" },
                }}
              >
                {friend.username}
              </Box>
              <Box
                sx={{
                  fontSize: "12px",
                  "&:hover": { cursor: "pointer", textDecoration: "underline" },
                }}
              >
                {mutualFriends(friend)} Bạn chung
              </Box>
            </Box>

            <IconButton sx={{ marginLeft: "auto" }}>
              <MoreHorizIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default FriendTabItems;
