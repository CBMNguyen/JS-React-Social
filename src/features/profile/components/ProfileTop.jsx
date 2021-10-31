import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CreateIcon from "@mui/icons-material/Create";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Divider, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/system";
import React from "react";
import { profileTabItemStyle } from "utils/common";
import NoAvatarImg from "../../../assets/person/noAvatar.png";
import coverImg from "../../../assets/post/9.jpeg";

function ProfileTop({
  user,
  currentUser,
  userId,
  value,
  handleChange,
  handleFollowClick,
}) {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg,rgba(170, 167, 168, 1) 0%,rgba(227, 224, 224, 1) 19%,rgba(255, 255, 255, 1) 39%)",
      }}
    >
      <Box
        sx={{
          width: "970px",
          margin: "0 auto",
        }}
      >
        {/* Profile Top Cover Img & Profile Picture */}
        <Box
          sx={{
            height: "340px",
            position: "relative",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
            src={coverImg}
            alt=""
          />

          <Box
            component="img"
            sx={{
              position: "absolute",
              top: "180px",
              left: 0,
              right: 0,

              width: "150px",
              height: "150px",
              margin: "auto",
              border: "4px solid white",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={user.profilePicture || NoAvatarImg}
            alt=""
          />
        </Box>
        {/* Profile Top User Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box component="h1" sx={{ mt: "8px", textTransform: "capitalize" }}>
            {user?.username}
          </Box>
          <Box component="span" sx={{ fontWeight: 300 }}>
            {user?.desc || "..."}
          </Box>
          <Box component="span" sx={{ fontWeight: 400, color: "blue" }}>
            Chỉnh sửa
          </Box>
        </Box>

        <Divider sx={{ marginY: 1 / 2 }} />

        {/* Profile Top Tabs  */}
        <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
          <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
          >
            <Tab
              sx={profileTabItemStyle(value, 0)}
              disableRipple
              value={0}
              label="Bài Viết"
            />
            <Tab
              sx={profileTabItemStyle(value, 1)}
              disableRipple
              value={1}
              label="Giới thiệu"
            />
            <Tab
              sx={profileTabItemStyle(value, 2)}
              disableRipple
              value={2}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>Bạn bè</Box>
                  <Box sx={{ fontSize: "12px", ml: 1 }}>
                    {user?.followings?.length}
                  </Box>
                </Box>
              }
            />
            <Tab
              sx={profileTabItemStyle(value, 3)}
              disableRipple
              value={3}
              label="Ảnh"
            />
            <Tab
              sx={profileTabItemStyle(value, 4)}
              disableRipple
              value={4}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>Xem thêm</Box>
                  <ArrowDropDownIcon />
                </Box>
              }
            />
          </Tabs>
          {/* Profile Top Follow & Unfollow Button */}

          {currentUser?.user?._id !== userId ? (
            <Button
              sx={{
                padding: "2px 16px",
                pr: "20px",
                margin: "0 8px",
                textTransform: "initial",
              }}
              onClick={handleFollowClick}
              color="primary"
              variant="contained"
              disableElevation
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
              sx={{
                textTransform: "initial",
                marginX: 1,
              }}
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
              mr: 1,
              textTransform: "initial",
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
              "&:hover": { backgroundColor: "lightgray" },
            }}
            color="inherit"
            disableElevation
            variant="contained"
          >
            <MoreHorizIcon />
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ marginY: 1 / 2 }} />
    </Box>
  );
}

export default ProfileTop;
