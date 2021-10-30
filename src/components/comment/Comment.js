import { Avatar, AvatarGroup, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import userApi from "api/user";
import { states } from "constants/global";
import { BlackTooltip, TransparentTooltip } from "constants/mui";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import {
  capitalizeFirstLetter,
  countState,
  currentState,
  formatDateFull,
} from "utils/common";
import NoAvatarImg from "../../assets/person/noAvatar.png";

function Comment({ comment, onCommentClick, currentUser }) {
  const [user, setUser] = useState({});
  const [openStates, setOpenStates] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userApi.getUserById(comment.userId);
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [comment.userId]);

  const handleLikeStateClick = (state, commentId, userId) => {
    if (!onCommentClick) return;
    onCommentClick(state, commentId, userId);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Avatar
        sx={{ width: "28px", height: "28px", alignSelf: "flex-start" }}
        src={user.profilePicture || NoAvatarImg}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: 1,
        }}
        onMouseLeave={() => setOpenStates(false)}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f0f2f5",
            p: "4px 8px",
            borderRadius: "14px",
          }}
        >
          <Box sx={{ fontSize: "14px", fontWeight: "500" }}>
            {capitalizeFirstLetter(user?.username || "")}
          </Box>
          <Typography variant="body2">{comment.text}</Typography>
          {comment.likes.length > 0 && (
            <BlackTooltip
              title={states.map((item, index) => {
                return (
                  <Box
                    sx={{
                      display:
                        countState(comment.likes, index) > 0 ? "flex" : "none",
                      alignItems: "center",
                      marginY: 1,
                    }}
                    key={index}
                  >
                    <Avatar sx={{ width: "18px", height: "18px" }} src={item} />
                    <Box sx={{ ml: 1 }}>{countState(comment.likes, index)}</Box>
                  </Box>
                );
              })}
            >
              <Paper
                sx={{
                  position: "absolute",
                  bottom: "-8px",
                  right: 0,
                  display: "flex",
                  paddingX: "4px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <AvatarGroup max={10}>
                  {states.map((item, index) => {
                    return (
                      <Avatar
                        sx={{
                          width: "14px",
                          height: "14px",
                          display:
                            countState(comment.likes, index) > 0
                              ? "flex"
                              : "none",
                        }}
                        key={index}
                        src={item}
                      />
                    );
                  })}
                </AvatarGroup>
                <Box component="span">{comment.likes.length}</Box>
              </Paper>
            </BlackTooltip>
          )}
        </Box>
        <Box sx={{ display: "flex", mt: 1 / 2 }}>
          <TransparentTooltip
            open={openStates}
            placement="top"
            title={
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  maxHeight: "34px",
                }}
              >
                {states.map((item, index) => (
                  <Box
                    className="animate__animated animate__pulse animate__infinite	infinite"
                    onClick={() => {
                      handleLikeStateClick(index, comment._id, currentUser._id);
                      setOpenStates(false);
                    }}
                    key={index}
                    sx={{
                      width: "34px",
                      height: "34px",
                      paddingX: "4px",
                      mt: "2px",

                      objectFit: "cover",
                      transition: "all 0.5s easy-in-out 0s",
                      "&:hover": {
                        position: "relative",
                        marginTop: "-10px",
                        cursor: "pointer",
                      },
                    }}
                    component="img"
                    src={item}
                  />
                ))}
              </Stack>
            }
          >
            <Box
              onClick={() =>
                handleLikeStateClick(0, comment._id, currentUser._id)
              }
              onMouseEnter={() => setOpenStates(true)}
            >
              <Typography
                sx={{
                  ml: 1,
                  fontWeight: "bolder",
                  color: currentState(
                    comment.likes.find(
                      (like) => like.userId === currentUser._id
                    )?.state
                  ).color,
                  "&:hover": {
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                }}
                variant="caption"
                display="block"
                gutterBottom
              >
                {
                  currentState(
                    comment.likes.find(
                      (like) => like.userId === currentUser._id
                    )?.state || -1
                  ).name
                }
              </Typography>
            </Box>
          </TransparentTooltip>

          <BlackTooltip title="Tính năng sẽ sóm được hoàn thành">
            <Typography
              sx={{
                ml: 1,
                fontWeight: "bolder",
                color: "#555",
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
              variant="caption"
              display="block"
              gutterBottom
            >
              Phản hồi
            </Typography>
          </BlackTooltip>

          <BlackTooltip title={formatDateFull(new Date(comment.createdAt))}>
            <Typography
              sx={{
                ml: 1,
                fontWeight: "400",
                color: "#555",
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
              variant="caption"
              display="block"
              gutterBottom
            >
              {format(comment.createdAt)}
            </Typography>
          </BlackTooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default Comment;
