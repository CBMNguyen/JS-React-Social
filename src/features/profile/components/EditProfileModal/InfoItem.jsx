import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { IOSSwitch } from "constants/mui";
import React from "react";
import { style } from "../InfoTab/infoTabStyle";

function InfoItem({
  sx = {},
  title,
  content,
  onClick = null,
  onChange,
  currentProfileState,
  showEditIcon = true,
}) {
  return (
    <Box sx={{ mb: 2, ...sx }}>
      <Box component="h3" sx={{ fontWeight: 500, ml: 1 }}>
        {title}
      </Box>

      <Box sx={{ ...style.flex, ml: 1 }}>
        <Box>
          <IOSSwitch onChange={onChange} checked={currentProfileState === 1} />
        </Box>

        <Box sx={{ ml: 2, fontSize: "15px" }}>{content}</Box>
        {showEditIcon && (
          <IconButton onClick={onClick} sx={{ ml: "auto" }}>
            <CreateIcon sx={{ color: "#000", fontSize: "28px" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default InfoItem;
