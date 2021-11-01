import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateIcon from "@mui/icons-material/Create";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import { style } from "./infoTabStyle";

function Overview({ user }) {
  return (
    <Box sx={{ padding: "8px" }}>
      <Box sx={{ ...style.flex, ...style.blue }}>
        <IconButton sx={{ ...style.icon }}>
          <AddCircleOutlineIcon sx={style.blue} />
        </IconButton>
        <Box>Thêm nơi làm việc</Box>
      </Box>

      <Box sx={{ ...style.flex, ...style.blue }}>
        <IconButton sx={{ ...style.icon }}>
          <AddCircleOutlineIcon sx={{ ...style.blue }} />
        </IconButton>
        <Box>Thêm trường trung học</Box>
      </Box>

      <Box sx={{ ...style.flex, ...style.blue }}>
        <IconButton sx={{ ...style.icon }}>
          <AddCircleOutlineIcon sx={{ ...style.blue }} />
        </IconButton>
        <Box>Thêm trường cao đẳng</Box>
      </Box>

      {/*  City */}

      <Box sx={style.flex}>
        <IconButton sx={{ ...style.icon }}>
          <HouseIcon />
        </IconButton>

        <Box>
          Sống tại <b>{user?.city || "..."}</b>{" "}
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

      {/*  From */}

      <Box sx={style.flex}>
        <IconButton sx={{ ...style.icon }}>
          <LocationOnIcon />
        </IconButton>
        <Box>
          Đến từ <b>{user?.from || "..."}</b>{" "}
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

      {/*  Relationship */}

      <Box sx={style.flex}>
        <IconButton sx={{ ...style.icon }}>
          <FavoriteIcon />
        </IconButton>
        <Box>Độc thân</Box>
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

      {/*  Phone Number */}

      <Box sx={style.flex}>
        <IconButton sx={{ ...style.icon }}>
          <PhoneIcon sx={style.icon} />
        </IconButton>
        <Box>
          <Box sx={{ ...style.flex }}>{user?.phone || "..."}</Box>
          <Box sx={{ ...style.subTitle }}>Di động</Box>
        </Box>
        <Box sx={{ ...style.flex, ml: "auto" }}>
          <IconButton>
            <GroupIcon />
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
  );
}

export default Overview;
