import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PublicIcon from "@mui/icons-material/Public";
import { Avatar, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import CityImg from "../../../../assets/orther/city.jpg";
import NativeImg from "../../../../assets/orther/native.jpg";
import { style } from "./infoTabStyle";

function LiveIn({ user }) {
  return (
    <Box
      sx={{
        padding: "8px",
        justifyContent: "flex-start",
        alignContent: "flex-start",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Nơi từng sống
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm thành phố</Box>
        </Box>
      </Box>

      {/* Current City Live in */}

      <Box sx={style.flex}>
        <Avatar src={CityImg} sx={{ mr: 2, ml: 1 / 3 }} />

        <Box>
          <Box component="b">{user?.city || "..."}</Box>
          <Box sx={{ ...style.subTitle }}>Tỉnh/Thành phố hiện tại</Box>
        </Box>
        <Box sx={{ ...style.flex, ml: "auto" }}>
          <IconButton>
            <PublicIcon />
          </IconButton>

          <IconButton
            sx={{
              ...style.wrappedIcon,
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Current Village Live in */}

      <Box sx={style.flex}>
        <Avatar src={NativeImg} sx={{ mr: 2, ml: 1 / 3 }} />

        <Box>
          <Box component="b">{user?.from || "..."}</Box>
          <Box sx={{ ...style.subTitle }}>Quê quán</Box>
        </Box>
        <Box sx={{ ...style.flex, ml: "auto" }}>
          <IconButton>
            <PublicIcon />
          </IconButton>

          <IconButton
            sx={{
              ...style.wrappedIcon,
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default LiveIn;
