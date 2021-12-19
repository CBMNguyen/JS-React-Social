import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Paper } from "@mui/material";
import { Box } from "@mui/system";
import FriendRequestItem from "components/friendRequestItem/FriendRequestItem";
import React from "react";

function ShowFriendRequest({
  notifications,
  onAcceptFriendRequest,
  onRefuseFriendRequest,
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",

        width: "340px",
        maxHeight: "700px",
        borderRadius: "8px",
        padding: "10px",
        paddingBottom: "2px",

        backgroundColor: "#fff",
        color: "#000",
        transition: "all 0.4s easy-in-out 0s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="h2" sx={{ mt: "10px", ml: "10px" }}>
          Bạn bè
        </Box>

        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Box
          sx={{
            mx: 1,
            display: "inline-block",
            fontWeight: "500",
            padding: "6px",
            borderRadius: "16px",
            color: "#222",
            backgroundColor: "#ccc",
            "&:hover": {
              backgroundColor: "#bbb",
              cursor: "pointer",
            },
          }}
        >
          Xem tất cả
        </Box>

        <Box
          sx={{
            display: "inline-block",
            fontWeight: "500",
            padding: "6px",
            borderRadius: "16px",
            color: "#222",
            backgroundColor: "#ccc",
            "&:hover": {
              backgroundColor: "#bbb",
              cursor: "pointer",
            },
          }}
        >
          Gợi ý
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box component="h2" sx={{ mt: "10px", ml: "10px" }}>
          Lời mời kết bạn
        </Box>

        <Box
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
          Xem tất cả
        </Box>
      </Box>
      {notifications.map((userId) => (
        <FriendRequestItem
          onAcceptFriendRequest={onAcceptFriendRequest}
          onRefuseFriendRequest={onRefuseFriendRequest}
          key={userId}
          userId={userId}
        />
      ))}
    </Paper>
  );
}

export default ShowFriendRequest;
