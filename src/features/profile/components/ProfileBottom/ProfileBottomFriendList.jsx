import NoAvatarImg from "..././../assets/person/noAvatar.png";
import { Avatar, Paper } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Box } from "@mui/system";
import { default as React } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileBottomFriendList({ friends, setValue, scrollTopRef }) {
  const history = useHistory();

  const handleFriendClick = (friend) => {
    history.push(`/profile/${friend._id}`);
    scrollTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
        <Box
          onClick={() => setValue(2)}
          sx={{
            fontWeight: "400",
            padding: "8px",
            borderRadius: "8px",
            color: "#1877f2",
            "&:hover": {
              backgroundColor: "#f0f2f5",
              cursor: "pointer",
            },
          }}
        >
          Xem tất bạn bè
        </Box>
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
          <Box key={friend._id} onClick={() => handleFriendClick(friend)}>
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
          </Box>
        ))}
      </ImageList>
    </Paper>
  );
}

export default ProfileBottomFriendList;
