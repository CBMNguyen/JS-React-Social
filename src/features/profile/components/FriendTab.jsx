import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Paper } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/system";
import { default as React } from "react";
import { profileTabItemStyle, TabPanel } from "utils/common";
import FriendTabItems from "./FriendTabItems";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function FriendTab({ user, friends }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      elevation={2}
      sx={{ padding: "16px", mt: "20px", borderRadius: "8px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box component="h2">Bạn bè</Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "200px",
              height: "38px",
              mx: 1 / 2,
              borderRadius: "20px",
              backgroundColor: "#f0f2f5",
            }}
          >
            <SearchIcon fontSize="small" sx={{ mx: 1 / 2, color: "#606770" }} />
            <Box
              sx={{
                border: "none",
                background: "inherit",
                "&:focus": { outline: "none" },
              }}
              component="input"
              placeholder="Tìm kiếm"
            />
          </Box>
          <Box
            sx={{
              mx: 1 / 2,
              fontWeight: "600",
              padding: "8px",
              borderRadius: "8px",
              color: "#1877f2",
              "&:hover": {
                backgroundColor: "#f0f2f5",
                cursor: "pointer",
              },
            }}
          >
            Lời mời kết bạn
          </Box>
          <Box
            sx={{
              mx: 1 / 2,
              fontWeight: "600",
              padding: "8px",
              borderRadius: "8px",
              color: "#1877f2",
              "&:hover": {
                backgroundColor: "#f0f2f5",
                cursor: "pointer",
              },
            }}
          >
            Tìm bạn bè
          </Box>
          <Button
            sx={{
              ml: 1,
              padding: "2px 8px",
              "&:hover": { backgroundColor: "lightgray" },
            }}
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
          sx={profileTabItemStyle(value, 0)}
          disableRipple
          value={0}
          label="Tất cả bạn bè"
        />
        <Tab
          sx={profileTabItemStyle(value, 1)}
          disableRipple
          value={1}
          label="Bạn chung"
        />
        <Tab
          sx={profileTabItemStyle(value, 2)}
          disableRipple
          value={2}
          label="Tỉnh/Thành phố hiện tại"
        />
        <Tab
          sx={profileTabItemStyle(value, 3)}
          disableRipple
          value={3}
          label="Quê quán"
        />
        <Tab
          sx={profileTabItemStyle(value, 4)}
          disableRipple
          value={4}
          label="Người Theo dõi"
        />
        <Tab
          sx={profileTabItemStyle(value, 5)}
          disableRipple
          value={5}
          label="Đang theo dỗi"
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <FriendTabItems user={user} friends={friends} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Alert severity="warning">
          <AlertTitle>Facebook</AlertTitle>
          Xin lỗi bạn tính năng này sẽ sớm được hoàn thành
        </Alert>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Alert severity="warning">
          <AlertTitle>Facebook</AlertTitle>
          Xin lỗi bạn tính năng này sẽ sớm được hoàn thành
        </Alert>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Alert severity="warning">
          <AlertTitle>Facebook</AlertTitle>
          Xin lỗi bạn tính năng này sẽ sớm được hoàn thành
        </Alert>
      </TabPanel>

      <TabPanel value={value} index={4}>
        <Alert severity="warning">
          <AlertTitle>Facebook</AlertTitle>
          Xin lỗi bạn tính năng này sẽ sớm được hoàn thành
        </Alert>
      </TabPanel>

      <TabPanel value={value} index={5}>
        <FriendTabItems user={user} friends={friends} />
      </TabPanel>
    </Paper>
  );
}

export default FriendTab;
