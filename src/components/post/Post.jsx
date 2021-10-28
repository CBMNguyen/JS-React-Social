import { CameraAltOutlined } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Badge, Button, Divider, IconButton, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import userApi from "api/user";
import {
  createComment,
  likeAndDislike,
  likeAndDislikeComment,
} from "app/postSlice";
import { states } from "constants/global";
import { BlackTooltip, TransparentTooltip } from "constants/mui";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import {
  capitalizeFirstLetter,
  formatDateFull,
  showToastError,
  showToastSuccess,
} from "utils/common";
import NoAvatarImg from "../../assets/person/noAvatar.png";
import Comment from "../../components/comment/Comment";

function Post({ post, currentUser }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [text, setText] = useState("");

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    try {
      await showToastSuccess(dispatch(likeAndDislike(post._id)));
    } catch (error) {
      showToastError(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentClick = async (state, commentId, userId) => {
    try {
      await showToastSuccess(
        dispatch(
          likeAndDislikeComment({ postId: post._id, state, commentId, userId })
        )
      );
    } catch (error) {
      showToastError(error);
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    try {
      await showToastSuccess(
        dispatch(createComment({ postId: post._id, text }))
      );
      setText("");
    } catch (error) {
      showToastError(error);
    }
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const { user } = await userApi.getUserById(id);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser(post.userId);
  }, [post.userId]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card elevation={2} sx={{ width: "100%", mb: "20px", borderRadius: "8px" }}>
      <CardHeader
        avatar={
          <Link to={`/profile/${user._id}`}>
            <Avatar
              src={user?.profilePicture || NoAvatarImg}
              aria-label="recipe"
            />
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography sx={{ fontWeight: "bold" }} component="span">
            {capitalizeFirstLetter(user?.username || "")}
          </Typography>
        }
        subheader={
          <BlackTooltip title={formatDateFull(new Date(post.createdAt))}>
            <Box
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
              component="span"
            >
              {format(new Date(post.createdAt))}
            </Box>
          </BlackTooltip>
        }
      />

      <CardContent sx={{ pt: 0 }}>
        <Typography variant="span" color="text.secondary">
          {post?.desc || ""}
        </Typography>
      </CardContent>

      {post.img && (
        <CardMedia
          component="img"
          image={`${process.env.REACT_APP_API_URL}/upload/${post.img}`}
          alt="Paella dish"
          sx={{ objectFit: "contain", maxHeight: 500 }}
        />
      )}

      <CardContent sx={{ py: 1.5 }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>{`Hiếu và ${like} người khác`}</Box>
          <Box>{`${post.comments.length} bình luận 0 lượt chia sẻ`}</Box>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ py: 0.5 }} disableSpacing>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Button
            sx={{
              width: 1 / 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "38px",
            }}
            color="inherit"
          >
            <ThumbUpOffAltIcon />

            <TransparentTooltip
              placement="top"
              title={
                <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                  {states.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "34px",
                        height: "34px",
                        paddingX: "4px",
                        mt: "2px",

                        transition: "all 0.5s easy-in-out 0s",
                        "&:hover": {
                          cursor: "pointer",
                          transform: "scale(1.1)",
                        },
                      }}
                      component="img"
                      src={item}
                    />
                  ))}
                </Stack>
              }
            >
              <Box onClick={handleLikeClick} sx={{ pl: 1 }}>
                Thích
              </Box>
            </TransparentTooltip>
          </Button>

          <Button
            sx={{
              width: 1 / 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "38px",
            }}
            color="inherit"
            onClick={handleExpandClick}
          >
            <ChatBubbleOutlineIcon />

            <Box sx={{ pl: 1 }}>Bình Luận</Box>
          </Button>

          <Button
            sx={{
              width: 1 / 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "38px",
            }}
            color="inherit"
          >
            <ShareIcon />
            <Box sx={{ pl: 1 }}>Chia sẻ</Box>
          </Button>
        </Stack>
      </CardActions>

      <Divider />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            pt: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
          >
            <Box>Phù hợp nhất</Box>
            <IconButton>
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to={`/profile/${user._id}`}>
              <Badge
                variant="dot"
                color="success"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                overlap="circular"
              >
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  src={user?.profilePicture || NoAvatarImg}
                />
              </Badge>
            </Link>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "95%",
                backgroundColor: "#f0f2f5",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  height: 28,
                  pl: 2,
                  border: "none",
                  backgroundColor: "inherit",
                  borderRadius: "20px",
                }}
                component="form"
                onSubmit={handleCreateComment}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 28,
                    border: "none",
                    backgroundColor: "inherit",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  component="input"
                  placeholder="Viết bình luận"
                />
              </Box>

              <Box>
                <BlackTooltip title="Chèn một biểu tượng cảm xúc">
                  <IconButton>
                    <EmojiEmotions fontSize="small" />
                  </IconButton>
                </BlackTooltip>

                <BlackTooltip title="Đính kèm một ảnh hoặc video">
                  <IconButton>
                    <CameraAltOutlined fontSize="small" />
                  </IconButton>
                </BlackTooltip>
                <BlackTooltip title="Bình luận bằng GIF">
                  <IconButton>
                    <GifOutlinedIcon fontSize="small" />
                  </IconButton>
                </BlackTooltip>

                <BlackTooltip title="Bình luận bằng nhãn dán">
                  <IconButton>
                    <FileCopyOutlinedIcon fontSize="small" />
                  </IconButton>
                </BlackTooltip>
              </Box>
            </Box>
          </Box>
          {post.comments.length > 0 &&
            post.comments.map((comment) => (
              <Comment
                key={comment._id}
                onCommentClick={handleCommentClick}
                comment={comment}
                currentUser={currentUser}
              />
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
