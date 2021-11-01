import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FlareIcon from "@mui/icons-material/Flare";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import { style } from "./infoTabStyle";

function LifeEvents({ user }) {
  return (
    <Box sx={{ padding: "8px" }}>
      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Sự kiện trong đời
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Viết một số điều về chính bạn</Box>
        </Box>

        <Box sx={{ ...style.flex }}>
          <IconButton sx={{ ...style.icon }}>
            <FlareIcon />
          </IconButton>

          <Box>Không có sự kiện trong đời được hiển thị</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LifeEvents;
