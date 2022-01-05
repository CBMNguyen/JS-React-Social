import { Avatar, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { BlackTooltip } from "constants/mui";

function ImageTabItem({ src, index, setOpenImg, setPhotoIndex }) {
  return (
    <Box
      sx={{
        display: "inline-block",
        position: "relative",
      }}
    >
      <BlackTooltip title="Tính năng này hiện tại chưa hoàn thành">
        <IconButton
          sx={{
            position: "absolute",
            top: "8px",
            right: "14px",
            zIndex: 100,
            backgroundColor: "#0005",
            "&:hover": {
              backgroundColor: "#0006",
            },
          }}
        >
          <EditIcon sx={{ color: "#fff", fontSize: "20px" }} />
        </IconButton>
      </BlackTooltip>

      <Avatar
        onClick={() => {
          setOpenImg(true);
          setPhotoIndex(index);
        }}
        sx={{
          width: "150px",
          height: "150px",
          borderRadius: "8px",
          cursor: "pointer",

          mr: "6px",
          mb: "6px",
        }}
        src={src}
        alt={src}
        loading="lazy"
      />
    </Box>
  );
}

export default ImageTabItem;
