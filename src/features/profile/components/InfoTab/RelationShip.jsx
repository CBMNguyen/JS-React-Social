import CreateIcon from "@mui/icons-material/Create";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PublicIcon from "@mui/icons-material/Public";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import AddItem from "../AddItem/AddItem";
import { style } from "./infoTabStyle";
import InfoItem from "../InfoItem/InfoItem";

function RelationShip({ user }) {
  return (
    <Box sx={{ padding: "8px" }}>
      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Mối quan hệ
        </Box>

        <InfoItem
          startIcon={
            <IconButton sx={{ ...style.icon }}>
              <FavoriteIcon />
            </IconButton>
          }
          title={<Box>{user?.relationship || "..."}</Box>}
          end1Icon={<PublicIcon />}
          end2Icon={<CreateIcon sx={{ color: "#555" }} />}
        />
      </Box>

      <AddItem
        title="Thành viên trong gia đình"
        content="Thêm một thành viên gia đình"
      />
    </Box>
  );
}

export default RelationShip;
