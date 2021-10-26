import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Badge, Stack, Tooltip, tooltipClasses } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import userApi from "api/user";
import { setCurrentChat } from "app/messengerSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "utils/common";
import noAvatarImg from "../../assets/person/noAvatar.png";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[2],
    fontSize: 11,
    maxWidth: 380,
    borderRadius: "8px",
  },
}));

function ChatOnline({ onlineUsers, currentUserId }) {
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const { friendList } = await userApi.getFriends(currentUserId);
        setFriends(friendList);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (friend) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/conversations/find/${currentUserId}/${friend._id}`
      );
      dispatch(setCurrentChat(res.data.conversation));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <List>
        {onlineFriends.map((friend) => (
          <LightTooltip
            placement="left-start"
            title={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Badge
                  sx={{ alignSelf: "flex-start" }}
                  badgeContent=" "
                  color="success"
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Avatar
                    sx={{ width: "100px", height: "100px" }}
                    src={friend?.profilePicture || noAvatarImg}
                  />
                </Badge>

                <Stack spacing={1} sx={{ ml: 2, mt: 1, fontSize: "14px" }}>
                  <Box component="h1">
                    {capitalizeFirstLetter(friend.username)}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ color: "#0009", mr: 1 }} />
                    <Box>
                      Đã trở thành bạn bè với <b>Hiếu Nguyễn</b> và{" "}
                      <b>4 người khác</b>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <GroupIcon sx={{ color: "#0009", mr: 1 }} />
                    <Box>
                      50 bạn chung bao gồm <b>Việt Linh</b> và{" "}
                      <b>Trần Trọng Toàn</b>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            }
            key={friend._id}
          >
            <ListItem onClick={() => handleClick(friend)} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Badge
                    variant="dot"
                    color="success"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar src={friend?.profilePicture || noAvatarImg} />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={capitalizeFirstLetter(friend.username)}
                />
              </ListItemButton>
            </ListItem>
          </LightTooltip>
        ))}
      </List>
    </Box>
  );
}

export default ChatOnline;
