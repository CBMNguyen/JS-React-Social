import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { style } from "../InfoTab/infoTabStyle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function AddItem({
  sx,
  component = "h4",
  title,
  content,
  fontSize = "medium",
  onClick = null,
}) {
  return (
    <Box onClick={onClick} sx={sx || {}}>
      {title && (
        <Box component={component} sx={{ fontWeight: 500, ml: 1 }}>
          {title}
        </Box>
      )}
      <Box sx={{ ...style.flex, ...style.blue }}>
        <IconButton sx={{ ...style.icon }}>
          <AddCircleOutlineIcon fontSize={fontSize} sx={{ ...style.blue }} />
        </IconButton>

        <Box>{content}</Box>
      </Box>
    </Box>
  );
}

export default AddItem;
