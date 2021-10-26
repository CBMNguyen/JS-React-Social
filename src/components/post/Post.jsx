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
import { likeAndDislike } from "app/postSlice";
import { BlackTooltip } from "constants/mui";
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

function Post({ post }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

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
          <Box>Hiếu và 100k người khác</Box>
          <Box>1k bình luận 167 lượt chia sẻ</Box>
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

            <Box sx={{ pl: 1 }}>Thích</Box>
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
                  sx={{ width: 32, height: 32 }}
                  src={user?.profilePicture || NoAvatarImg}
                />
              </Badge>
            </Link>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "92%",
                backgroundColor: "#f0f2f5",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  height: 32,
                  pl: 2,
                  border: "none",
                  backgroundColor: "inherit",
                  borderRadius: "20px",
                  "&:focus": {
                    outline: "none",
                  },
                }}
                component="input"
                placeholder="Viết bình luận"
              />

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
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
