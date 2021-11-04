import CreateIcon from "@mui/icons-material/Create";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import { Box } from "@mui/system";
import { default as React } from "react";
import AddItem from "../AddItem/AddItem";
import InfoItem from "../InfoItem/InfoItem";
import { style } from "./infoTabStyle";
import { IconButton } from "@mui/material";

function Overview({ user }) {
  return (
    <Box sx={{ padding: "8px" }}>
      <AddItem content="Thêm nơi làm việc" />
      <AddItem content="Thêm trường trung học" />
      <AddItem content="Thêm trường cao đẳng/đại học" />

      {/*  City */}
      <InfoItem
        startIcon={
          <IconButton sx={{ ...style.icon }}>
            <HouseIcon />
          </IconButton>
        }
        title={<Box>Sống tại {<b>{user?.city || "..."}</b>}</Box>}
        end1Icon={<PublicIcon />}
        end2Icon={<MoreHorizIcon />}
      />

      {/*  From */}

      <InfoItem
        startIcon={
          <IconButton sx={{ ...style.icon }}>
            <LocationOnIcon />
          </IconButton>
        }
        title={
          <Box>
            Đến từ <b>{user?.from || "..."}</b>
          </Box>
        }
        end1Icon={<PublicIcon />}
        end2Icon={<MoreHorizIcon />}
      />

      {/*  Relationship */}

      <InfoItem
        startIcon={
          <IconButton sx={{ ...style.icon }}>
            <FavoriteIcon />
          </IconButton>
        }
        title={<Box>{user?.relationship}</Box>}
        end1Icon={<PublicIcon />}
        end2Icon={<CreateIcon sx={{ color: "#555" }} />}
      />

      {/*  Phone Number */}

      <InfoItem
        startIcon={
          <IconButton sx={{ ...style.icon }}>
            <PhoneIcon />
          </IconButton>
        }
        title={<Box>{user?.phone}</Box>}
        content="Di động"
        end1Icon={<GroupIcon />}
        end2Icon={<CreateIcon sx={{ color: "#555" }} />}
      />
    </Box>
  );
}

export default Overview;
