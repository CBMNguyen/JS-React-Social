import NoAvatarImg from "..././../assets/person/noAvatar.png";
import { Avatar, Paper } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Box } from "@mui/system";
import { default as React } from "react";
import { Link } from "react-router-dom";

function ProfileBottomFriendList({ friends }) {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: "16px",
        mb: "16px",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box component="h2">Friends</Box>
        <Box sx={{ textDecoration: "none", color: "blue" }}>Xem tất bạn bè</Box>
      </Box>
      <Box component="span">{friends.length} người bạn</Box>
      <ImageList
        sx={{
          width: "100%",
          borderRadius: "8px",
          mt: "8px",
        }}
        cols={3}
      >
        {friends.slice(0, 9).map((friend) => (
          <Link
            key={friend._id}
            to={`/profile/${friend._id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ImageListItem>
              <Avatar
                sx={{
                  width: "104px",
                  height: "104px",
                  borderRadius: "8px",
                }}
                src={
                  friend?.profilePicture?.length > 0
                    ? `${process.env.REACT_APP_API_URL}/${
                        friend?.profilePicture[
                          friend?.profilePicture?.length - 1
                        ]
                      }`
                    : NoAvatarImg
                }
                srcSet={
                  friend?.profilePicture?.length > 0
                    ? `${process.env.REACT_APP_API_URL}/${
                        friend?.profilePicture[
                          friend?.profilePicture?.length - 1
                        ]
                      }`
                    : NoAvatarImg
                }
                alt={friend?.username}
                loading="lazy"
                style={{ borderRadius: "8px" }}
              />
              <ImageListItemBar
                title={friend?.username}
                position="below"
                sx={{
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </Paper>
  );
}

export default ProfileBottomFriendList;
