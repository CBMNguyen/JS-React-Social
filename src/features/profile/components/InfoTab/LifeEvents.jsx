import FlareIcon from "@mui/icons-material/Flare";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import AddItem from "../AddItem/AddItem";
import { style } from "./infoTabStyle";

function LifeEvents({ user }) {
  return (
    <Box sx={{ padding: "8px" }}>
      <Box>
        <AddItem
          title="Sự kiện trong đời"
          content="Viết một số điều về chính bạn"
        />

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
