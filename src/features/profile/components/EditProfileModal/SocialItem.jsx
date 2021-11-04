import PublicIcon from "@mui/icons-material/Public";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { BlackTooltip } from "constants/mui";
import React from "react";
import { style } from "../InfoTab/infoTabStyle";
import editProfileModalStyle from "./editProfileModal";

function SocialItem({ title, content }) {
  return (
    <Box sx={{ mb: 2, ml: 1 }}>
      <Box component="h3" sx={{ fontWeight: 500 }}>
        {title}
      </Box>

      <Box sx={{ ...style.flex, mt: 0 }}>
        <Box sx={{ fontSize: "15px" }}>{content}</Box>
        <BlackTooltip
          placement="left"
          title="Tính năng này hiện tại vẫn chưa hoàn thành"
        >
          <Button
            disableElevation
            disableRipple
            variant="contained"
            startIcon={<PublicIcon sx={{ color: "#888" }} />}
            sx={editProfileModalStyle.lightgrayButton}
          >
            Công khai
          </Button>
        </BlackTooltip>
      </Box>
    </Box>
  );
}

export default SocialItem;
