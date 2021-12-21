import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StoreIcon from "@mui/icons-material/Store";
import { Badge } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { BlackTooltip } from "constants/mui";
import React, { useState } from "react";
import { style } from "./TopBarCenter";

function TopBarCenter() {
  const [value, setValue] = useState("one");

  // handle Tab Change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={style.container}>
      <Tabs
        sx={style.tabs}
        centered
        value={value}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        onChange={handleChange}
      >
        <Tab
          disableRipple
          value="one"
          label={
            <BlackTooltip title="Trang chủ">
              <Badge>
                <HomeIcon sx={style.iconItem} />
              </Badge>
            </BlackTooltip>
          }
        />

        <Tab
          disableRipple
          value="two"
          label={
            <BlackTooltip title="Watch">
              <Badge sx={style.badge} badgeContent={99} max={10} color="error">
                <OndemandVideoIcon sx={style.iconItem} />
              </Badge>
            </BlackTooltip>
          }
        />

        <Tab
          disableRipple
          value="three"
          label={
            <BlackTooltip title="MarketPlace">
              <Badge sx={style.badge} badgeContent={1} max={10} color="error">
                <StoreIcon sx={style.iconItem} />
              </Badge>
            </BlackTooltip>
          }
        />

        <Tab
          disableRipple
          value="four"
          label={
            <BlackTooltip title="Nhóm">
              <GroupsIcon sx={style.iconItem} />
            </BlackTooltip>
          }
        />

        <Tab
          disableRipple
          value="five"
          label={
            <BlackTooltip title="Trò Chơi">
              <Badge sx={style.badge} badgeContent={99} max={10} color="error">
                <SportsEsportsIcon sx={style.iconItem} />
              </Badge>
            </BlackTooltip>
          }
        />
      </Tabs>
    </Box>
  );
}

export default TopBarCenter;
