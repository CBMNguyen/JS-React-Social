import { Paper } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import { Box } from "@mui/system";
import { default as React } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProfileBottomFriendListItem from "./ProfileBottomFriendListItem";

function ProfileBottomFriendList({ user, setValue, scrollTopRef }) {
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
      <Box component="span">{user?.friends?.length} người bạn</Box>
      <ImageList
        sx={{
          width: "100%",
          borderRadius: "8px",
          mt: "8px",
        }}
        cols={3}
      >
        {user?.friends?.slice(0, 9).map((userId) => (
          <ProfileBottomFriendListItem
            key={userId}
            userId={userId}
            handleFriendClick={handleFriendClick}
          />
        ))}
      </ImageList>
    </Paper>
  );
}

export default ProfileBottomFriendList;
