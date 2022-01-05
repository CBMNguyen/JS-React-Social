import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { BlackTooltip } from "constants/mui";
import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { formatDateFull } from "utils/common";
import NoAvatarImg from "../../../assets/person/noAvatar.png";

function CardHeaderr({ user, post }) {
  return (
    <CardHeader
      avatar={
        <Link to={`/profile/${user._id}`}>
          <Avatar
            src={
              user?.profilePicture?.length > 0
                ? user?.profilePicture[user?.profilePicture?.length - 1]
                : NoAvatarImg
            }
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
        <Typography
          sx={{ fontWeight: "bold", textTransform: "capitalize" }}
          component="span"
        >
          {user?.username || ""}
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
  );
}

export default CardHeaderr;
