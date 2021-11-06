import { AvatarGroup, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import { states } from "constants/global";
import { BlackTooltip } from "constants/mui";
import React from "react";
import { capitalizeFirstLetter, countState, currentState } from "utils/common";

function ShowStateHeader({
  post,
  userNamelikePost,
  currentUser,
  handleExpandClick,
}) {
  return post.likes.length > 0 || post.comments.length > 0 ? (
    <CardContent sx={{ py: 1.5 }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AvatarGroup sx={{ "&:hover": { cursor: "pointer" } }} max={10}>
            {states.map((item, index) => {
              return (
                <BlackTooltip
                  key={index}
                  title={
                    <Box>
                      <Box sx={{ fontSize: "14px", mb: 1 }}>
                        {currentState(index).name}
                      </Box>
                      {userNamelikePost.map((user, i) => {
                        if (user.state === index) {
                          return (
                            <Box sx={{ maxWidth: "100px" }} key={i}>
                              {index > 19
                                ? `và ${
                                    userNamelikePost.length - 19
                                  } người khác...`
                                : capitalizeFirstLetter(user.username || "")}
                            </Box>
                          );
                        }

                        return <Box key={i} sx={{ display: "none" }} />;
                      })}
                    </Box>
                  }
                >
                  <Avatar
                    sx={{
                      width: "24px",
                      height: "24px",
                      display:
                        countState(post.likes, index) > 0 ? "flex" : "none",
                    }}
                    key={index}
                    src={item}
                  />
                </BlackTooltip>
              );
            })}
          </AvatarGroup>

          <BlackTooltip
            title={userNamelikePost.slice(0, 21).map((user, index) => {
              return (
                <Box sx={{ maxWidth: "100px" }} key={index}>
                  {index > 19
                    ? `và ${userNamelikePost.length - 19} người khác...`
                    : capitalizeFirstLetter(user.username || "")}
                </Box>
              );
            })}
          >
            <Box
              sx={{
                ml: 1,
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
            >
              {post.likes.some((like) => like.userId === currentUser._id) &&
              post.likes.length > 1
                ? `Bạn và ${post.likes.length - 1} người khác`
                : ""}
            </Box>
          </BlackTooltip>
        </Box>

        <Box sx={{ display: "flex", alignItem: "center" }}>
          <Box
            onClick={handleExpandClick}
            component="span"
            sx={{
              mr: 1 / 2,
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >{`${post.comments.length} bình luận `}</Box>
        </Box>
      </Stack>
    </CardContent>
  ) : (
    <></>
  );
}

export default ShowStateHeader;
