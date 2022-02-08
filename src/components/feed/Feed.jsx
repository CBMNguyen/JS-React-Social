import { Alert, AlertTitle, Card, Divider } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { createPostSocket } from "app/postSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Post from "../post/Post";
import Share from "../share/Share";

function Feed({ posts, socket, loading }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    socket?.on("getPost", ({ post }) => {
      if (user._id !== post.userId) {
        dispatch(createPostSocket({ post }));
      }
    });
  }, [socket, user._id, dispatch]);

  return (
    <Box sx={{ flex: 5.5 }}>
      <Box sx={{ padding: "20px" }}>
        {(!userId || userId === user._id) && (
          <Share socket={socket} loading={loading} />
        )}
        {posts.length > 0 &&
          posts
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <Post
                key={post._id}
                post={post}
                socket={socket}
                currentUser={user}
              />
            ))}
        {loading &&
          [1, 2, 3].map((x, index) => (
            <Card
              elevation={2}
              sx={{ width: "100%", mb: "20px", borderRadius: "8px" }}
              key={index}
            >
              <Stack spacing={1}>
                <Stack
                  sx={{ py: 2 }}
                  paddingLeft={1}
                  direction="row"
                  spacing={2}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                  <Stack>
                    <Skeleton animation="wave" variant="text" width={100} />
                    <Skeleton animation="wave" variant="text" width={200} />
                  </Stack>
                </Stack>
                <Box sx={{ paddingLeft: 2 }}>
                  <Skeleton animation="wave" variant="text" width={400} />
                </Box>
                <Skeleton animation="wave" variant="rectangular" height={400} />
                <Stack
                  py={1 / 2}
                  paddingLeft={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Stack paddingLeft={1} direction="row">
                      <Skeleton variant="circular" width={20} height={20} />
                      <Skeleton variant="circular" width={20} height={20} />
                      <Skeleton variant="circular" width={20} height={20} />
                      <Skeleton variant="circular" width={20} height={20} />
                      <Skeleton variant="circular" width={20} height={20} />
                    </Stack>
                    <Skeleton animation="wave" variant="text" width={240} />
                  </Stack>
                  <Skeleton
                    animation="wave"
                    sx={{ mr: 2 }}
                    variant="text"
                    width={80}
                  />
                </Stack>
                <Divider />
              </Stack>
            </Card>
          ))}
        {posts.length === 0 && !loading && (
          <Alert severity="info">
            <AlertTitle>Facebook</AlertTitle>
            hiện tại chưa có dòng trạng thái nào 😥
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default Feed;
