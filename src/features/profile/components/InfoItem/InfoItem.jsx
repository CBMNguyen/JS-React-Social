import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import { style } from "../InfoTab/infoTabStyle";

function InfoItem({ sx = {}, startIcon, title, content, end1Icon, end2Icon }) {
  return (
    <Box sx={{ ...style.flex, ...sx }}>
      {startIcon}
      <Box>
        {title}
        {content && <Box sx={{ ...style.subTitle }}>{content}</Box>}
      </Box>
      <Box sx={{ ...style.flex, ml: "auto" }}>
        <IconButton>{end1Icon}</IconButton>

        <IconButton
          sx={{
            ...style.wrappedIcon,
          }}
        >
          {end2Icon}
        </IconButton>
      </Box>
    </Box>
  );
}

export default InfoItem;
