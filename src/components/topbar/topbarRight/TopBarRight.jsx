import AppsIcon from "@mui/icons-material/Apps";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Avatar, Badge, Popover } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { BlackTooltip } from "constants/mui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import noAvatarImg from "../../../assets/person/noAvatar.png";
import { style } from "./TopBarRight";
import ShowConversations from "components/showConversations/ShowConversations";
import ShowFriendRequest from "components/showFriendRequest/ShowFriendRequest";

function TopBarRight({
  user,
  conversations,
  handleAcceptFriendRequest,
  handleRefuseFriendRequest,
}) {
  const [anchorElChat, setAnchorElChat] = useState(null);
  const [anchorElFriend, setAnchorElFriend] = useState(null);

  // handle show user chat bar
  const handleChatClick = (event) => {
    setAnchorElChat(event.currentTarget);
  };

  // handle hide user chat bar
  const handleChatClose = () => {
    setAnchorElChat(null);
  };

  const openChat = Boolean(anchorElChat);
  const chatId = openChat ? "simple-popover" : undefined;

  //===========================================================
  // handle show user friend request
  const handleFriendRequestClick = (event) => {
    setAnchorElFriend(event.currentTarget);
  };

  // handle hide user chat bar
  const handleFriendRequestClose = () => {
    setAnchorElFriend(null);
  };

  const openFriendRequest = Boolean(anchorElFriend);
  const friendRequestId = openFriendRequest ? "simple-popover" : undefined;

  // Check profile picture of current user
  const src =
    user?.profilePicture?.length > 0
      ? user?.profilePicture[user?.profilePicture?.length - 1]
      : noAvatarImg;

  return (
    <Box sx={style.container}>
      <Box sx={style.wrapper}>
        <Link className="link" to={`/profile/${user?._id}`}>
          <Box component="div" sx={style.avatarWrapper}>
            <Avatar sx={style.avatar} src={src} alt="avatar" />

            <Box component="span" sx={style.username}>
              {user?.username}
            </Box>
          </Box>
        </Link>

        <BlackTooltip title="Menu">
          <IconButton sx={style.iconButton}>
            <AppsIcon sx={style.icon} />
          </IconButton>
        </BlackTooltip>

        <BlackTooltip title="Friend request">
          <IconButton
            aria-describedby={friendRequestId}
            onClick={handleFriendRequestClick}
            sx={{ ...style.iconButton, mx: 2 }}
          >
            <Badge
              badgeContent={user?.notifications?.length}
              max={5}
              color="error"
            >
              <PersonAddIcon
                color="primary"
                sx={{ pr: "2px", color: !anchorElFriend ? "#000" : "" }}
              />
            </Badge>
          </IconButton>
        </BlackTooltip>

        <BlackTooltip title="Messenger">
          <IconButton
            aria-describedby={chatId}
            onClick={handleChatClick}
            sx={style.iconButton}
          >
            <Badge badgeContent={1} max={5} color="error">
              <ChatIcon
                color="primary"
                sx={!anchorElChat ? { color: "#000" } : {}}
              />
            </Badge>
          </IconButton>
        </BlackTooltip>

        <BlackTooltip title="Account">
          <IconButton sx={{ ...style.iconButton, ml: 2 }}>
            <Badge variant="dot" color="error">
              <ArrowDropDownIcon sx={style.icon} />
            </Badge>
          </IconButton>
        </BlackTooltip>
      </Box>

      {/* Show Online Friends */}
      <Popover
        id={chatId}
        open={openChat}
        anchorEl={anchorElChat}
        onClose={handleChatClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ mt: 1, ml: 1 / 2 }}
      >
        <ShowConversations
          currentUser={user}
          conversations={conversations}
          handleChatClose={handleChatClose}
        />
      </Popover>

      {/* Show Friend Request List */}
      <Popover
        id={friendRequestId}
        open={openFriendRequest}
        anchorEl={anchorElFriend}
        onClose={handleFriendRequestClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ mt: 1, ml: 1 / 2 }}
      >
        <ShowFriendRequest
          onAcceptFriendRequest={handleAcceptFriendRequest}
          onRefuseFriendRequest={handleRefuseFriendRequest}
          notifications={user.notifications}
        />
      </Popover>
    </Box>
  );
}

export default TopBarRight;
