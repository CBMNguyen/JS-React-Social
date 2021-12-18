import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Paper } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/system";
import { profileTopTabStyle } from "features/profile/components/ProfileTop/profileTopStyle";
import { default as React } from "react";
import { TabPanel } from "utils/common";
import NotComplete from "../NotComplete/NotComplete";
import FriendTabItems from "./FriendTabItems";
import { style } from "./friendTabStyle";

function FriendTab({ user, friends }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={2} sx={style.friendTabWrapper}>
      <Box sx={style.friendTabHeader}>
        <Box component="h2">Bạn bè</Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={style.friendTabSearchBox}>
            <SearchIcon fontSize="small" sx={style.friendTabSearchIcon} />
            <Box
              sx={style.friendTabSearchInput}
              component="input"
              placeholder="Tìm kiếm"
            />
          </Box>
          <Box sx={style.friendTabHeaderItem}>Lời mời kết bạn</Box>
          <Box sx={style.friendTabHeaderItem}>Tìm bạn bè</Box>
          <Button
            sx={style.friendTabHeaderItemMoreIcon}
            color="inherit"
            disableElevation
            variant="contained"
          >
            <MoreHorizIcon />
          </Button>
        </Box>
      </Box>

      <Tabs sx={{ mb: "20px" }} value={value} onChange={handleChange}>
        <Tab
          sx={profileTopTabStyle(value, 0)}
          disableRipple
          value={0}
          label="Tất cả bạn bè"
        />
        <Tab
          sx={profileTopTabStyle(value, 1)}
          disableRipple
          value={1}
          label="Bạn chung"
        />
        <Tab
          sx={profileTopTabStyle(value, 2)}
          disableRipple
          value={2}
          label="Tỉnh/Thành phố hiện tại"
        />
        <Tab
          sx={profileTopTabStyle(value, 3)}
          disableRipple
          value={3}
          label="Quê quán"
        />
        <Tab
          sx={profileTopTabStyle(value, 4)}
          disableRipple
          value={4}
          label="Người Theo dõi"
        />
        <Tab
          sx={profileTopTabStyle(value, 5)}
          disableRipple
          value={5}
          label="Đang theo dỗi"
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <FriendTabItems user={user} friends={friends} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <NotComplete />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <NotComplete />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <NotComplete />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <NotComplete />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <FriendTabItems user={user} friends={friends} />
      </TabPanel>
    </Paper>
  );
}

export default FriendTab;
