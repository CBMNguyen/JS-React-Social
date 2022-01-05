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
import NoAvatarImg from "../../../../assets/person/noAvatar.png";
import Comment from "../../../comment/Comment";
import { style } from "./CardBottom";

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
    <CardContent sx={{ pt: 0 }}>
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
              sx={style.avatar}
              src={
                currentUser?.profilePicture?.length > 0
                  ? currentUser?.profilePicture[
                      user?.profilePicture?.length - 1
                    ]
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
