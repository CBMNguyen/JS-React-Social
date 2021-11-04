import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CreateIcon from "@mui/icons-material/Create";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/system";
import React from "react";
import { profileTopTabStyle, style } from "./profileTopStyle";

function ProfileTopTab({
  value,
  handleChange,
  handleFollowClick,
  user,
  userId,
  currentUser,
}) {
  return (
    <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
      >
        <Tab
          sx={profileTopTabStyle(value, 0)}
          disableRipple
          value={0}
          label="Bài Viết"
        />
        <Tab
          sx={profileTopTabStyle(value, 1)}
          disableRipple
          value={1}
          label="Giới thiệu"
        />
        <Tab
          sx={profileTopTabStyle(value, 2)}
          disableRipple
          value={2}
          label={
            <Box sx={style.flexAlignItemCenter}>
              <Box>Bạn bè</Box>
              <Box sx={{ fontSize: "12px", ml: 1 }}>
                {user?.followings?.length}
              </Box>
            </Box>
          }
        />
        <Tab
          sx={profileTopTabStyle(value, 3)}
          disableRipple
          value={3}
          label="Ảnh"
        />
        <Tab
          sx={profileTopTabStyle(value, 4)}
          disableRipple
          value={4}
          label={
            <Box sx={style.flexAlignItemCenter}>
              <Box>Xem thêm</Box>
              <ArrowDropDownIcon />
            </Box>
          }
        />
      </Tabs>
      {/* Profile Top Follow & Unfollow Button */}

      {currentUser?.user?._id !== userId ? (
        <Button
          disableElevation
          color="primary"
          variant="contained"
          sx={style.profileTopButton}
          onClick={handleFollowClick}
          startIcon={
            currentUser.user.followings.includes(user?._id) ? (
              <RemoveIcon />
            ) : (
              <AddIcon />
            )
          }
        >
          {currentUser.user.followings.includes(user?._id)
            ? "Unfollow"
            : "Follow"}
        </Button>
      ) : (
        <Button
          sx={style.profileTopButton}
          onClick={handleFollowClick}
          color="primary"
          variant="contained"
          disableElevation
          startIcon={<AddCircleIcon />}
        >
          Thêm vào tin
        </Button>
      )}
      {/* Profile Top Edit Button */}
      <Button
        sx={{
          ...style.profileTopButton,
          "&:hover": { backgroundColor: "lightgray" },
        }}
        disableElevation
        variant="contained"
        color="inherit"
        startIcon={<CreateIcon />}
      >
        Chỉnh sửa trang cá nhân
      </Button>
      {/* Profile Top More Button */}
      <Button
        sx={{
          ml: 1 / 2,
          "&:hover": { backgroundColor: "lightgray" },
          "&:active": { transform: "scale(0.98)" },
        }}
        color="inherit"
        disableElevation
        variant="contained"
      >
        <MoreHorizIcon />
      </Button>
    </Stack>
  );
}

export default ProfileTopTab;
