import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateIcon from "@mui/icons-material/Create";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PublicIcon from "@mui/icons-material/Public";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import { style } from "./infoTabStyle";

function RelationShip({ user }) {
  return (
    <Box sx={{ padding: "8px" }}>
      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Mối quan hệ
        </Box>
        <Box sx={style.flex}>
          <IconButton sx={{ ...style.icon }}>
            <FavoriteIcon />
          </IconButton>
          <Box>{user?.relationship || "..."}</Box>
          <Box sx={{ ...style.flex, ml: "auto" }}>
            <IconButton>
              <PublicIcon />
            </IconButton>

            <IconButton
              sx={{
                ...style.wrappedIcon,
              }}
            >
              <CreateIcon sx={{ color: "#555" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Thành viên trong gia đình
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm một thành viên gia đình</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RelationShip;
