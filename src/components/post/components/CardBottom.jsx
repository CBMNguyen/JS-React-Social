import { CameraAltOutlined } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import { BlackTooltip } from "constants/mui";
import Picker from "emoji-picker-react";
import React from "react";
import { Link } from "react-router-dom";
import { StyledBadge } from "utils/common";
import NoAvatarImg from "../../../assets/person/noAvatar.png";
import Comment from "../../../components/comment/Comment";

const style = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    cursor: "pointer",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  inputRightBox: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    backgroundColor: "#f0f2f5",
    borderRadius: "20px",
  },

  form: {
    flexGrow: 1,
    height: 28,
    pl: 2,
    border: "none",
    backgroundColor: "inherit",
    borderRadius: "20px",
  },

  commentInput: {
    width: "100%",
    height: 28,
    border: "none",
    backgroundColor: "inherit",
    "&:focus": {
      outline: "none",
    },
  },

  showEmoji: {
    position: "absolute",
    zIndex: 2000,
    bottom: "42px",
    right: 0,
  },

  closeEmoji: {
    zIndex: 1999,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "transparent",
  },
};

function CardBottom({
  post,
  user,
  currentUser,
  inputRef,
  showEmoji,
  setShowEmoji,
  handlePickEmoji,
  handleCommentClick,
  handleCreateComment,
}) {
  return (
    <CardContent
      sx={{
        pt: 0,
      }}
    >
      <Box sx={style.header}>
        <Box>Phù hợp nhất</Box>
        <IconButton>
          <ArrowDropDownIcon />
        </IconButton>
      </Box>

      <Box sx={style.inputBox}>
        <Link to={`/profile/${user._id}`}>
          <StyledBadge
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
              src={
                user?.profilePicture?.length > 0
                  ? `${process.env.REACT_APP_API_URL}/${
                      user?.profilePicture[user?.profilePicture?.length - 1]
                    }`
                  : NoAvatarImg
              }
            />
          </StyledBadge>
        </Link>

        <Box sx={style.inputRightBox}>
          <Box sx={style.form} component="form" onSubmit={handleCreateComment}>
            <Box
              sx={style.commentInput}
              ref={inputRef}
              onClick={() => setShowEmoji(false)}
              component="input"
              placeholder="Viết bình luận"
            />
            <Box sx={style.showEmoji}>
              {showEmoji && <Picker onEmojiClick={handlePickEmoji} />}
            </Box>

            {showEmoji && (
              <Box onClick={() => setShowEmoji(false)} sx={style.closeEmoji} />
            )}
          </Box>

          <Box>
            <BlackTooltip title="Chèn một biểu tượng cảm xúc">
              <IconButton
                onClick={() => {
                  setShowEmoji(!showEmoji);
                  inputRef.current.focus();
                }}
              >
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
  );
}

export default CardBottom;
