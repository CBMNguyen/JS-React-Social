import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import userApi from "api/user";
import { setCurrentChat } from "app/messengerSlice";
import axios from "axios";
import { LightTooltip } from "constants/mui";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "timeago.js";
import {
  capitalizeFirstLetter,
  StyledBadge,
  StyledBadgeUserTag,
} from "utils/common";
import noAvatarImg from "../../assets/person/noAvatar.png";

function ChatOnline({ onlineUsers, currentUserId }) {
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);

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
  }, [currentUserId, onlineUsers]);

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
        {friends.map((friend) => (
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
                <StyledBadgeUserTag
                  sx={{ alignSelf: "flex-start" }}
                  badgeContent=" "
                  color={
                    onlineUsers?.includes(friend._id) ? "success" : "default"
                  }
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Avatar
                    sx={{ width: "100px", height: "100px" }}
                    src={
                      friend?.profilePicture?.length > 0
                        ? `${process.env.REACT_APP_API_URL}/${
                            friend?.profilePicture[
                              friend?.profilePicture?.length - 1
                            ]
                          }`
                        : noAvatarImg
                    }
                  />
                </StyledBadgeUserTag>

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
              <ListItemButton sx={{ borderRadius: "8px" }}>
                <ListItemIcon>
                  <StyledBadge
                    variant={onlineUsers?.includes(friend._id) ? "dot" : ""}
                    color={
                      onlineUsers?.includes(friend._id) ? "success" : "default"
                    }
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      src={
                        friend?.profilePicture?.length > 0
                          ? `${process.env.REACT_APP_API_URL}/${
                              friend?.profilePicture[
                                friend?.profilePicture?.length - 1
                              ]
                            }`
                          : noAvatarImg
                      }
                    />
                  </StyledBadge>
                </ListItemIcon>
                <ListItemText
                  primary={capitalizeFirstLetter(friend?.username)}
                />
                {!onlineUsers?.includes(friend._id) && (
                  <ListItemText
                    sx={{ position: "absolute", left: "16px", bottom: 0 }}
                    primary={
                      <Box
                        sx={{
                          padding: "1px",
                          fontSize: "9px",
                          fontWeight: "bold",
                          color: "green",
                          backgroundColor: "rgb(226, 250, 226)",
                          borderRadius: "8px",
                        }}
                      >
                        {format(new Date(friend.latestOnline)).toString()
                          .length > 8
                          ? format(new Date(friend.latestOnline))
                              .toString()
                              .slice(0, -3)
                          : format(new Date(friend.latestOnline)).toString()}
                      </Box>
                    }
                  />
                )}
              </ListItemButton>
            </ListItem>
          </LightTooltip>
        ))}
      </List>
    </Box>
  );
}

export default ChatOnline;
