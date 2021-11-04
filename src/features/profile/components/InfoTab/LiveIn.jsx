import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PublicIcon from "@mui/icons-material/Public";
import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import CityImg from "../../../../assets/orther/city.jpg";
import NativeImg from "../../../../assets/orther/native.jpg";
import AddItem from "../AddItem/AddItem";
import InfoItem from "../InfoItem/InfoItem";

function LiveIn({ user }) {
  return (
    <Box
      sx={{
        padding: "8px",
        justifyContent: "flex-start",
        alignContent: "flex-start",
      }}
    >
      <AddItem title="Nơi từng sống" content="Thêm thành phố" />

      {/* Current City Live in */}

      <InfoItem
        startIcon={<Avatar src={CityImg} sx={{ mr: 2, ml: 1 / 3 }} />}
        title={<Box component="b">{user?.city || "..."}</Box>}
        content="Tỉnh/Thành phố hiện tại"
        end1Icon={<PublicIcon />}
        end2Icon={<MoreHorizIcon />}
      />

      {/* Current Village Live in */}
      <InfoItem
        startIcon={<Avatar src={NativeImg} sx={{ mr: 2, ml: 1 / 3 }} />}
        title={<Box component="b">{user?.from || "..."}</Box>}
        content="Quê quán"
        end1Icon={<PublicIcon />}
        end2Icon={<MoreHorizIcon />}
      />
    </Box>
  );
}

export default LiveIn;
