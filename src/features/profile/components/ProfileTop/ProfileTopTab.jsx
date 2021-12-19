import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CreateIcon from "@mui/icons-material/Create";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Stack } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/system";
import { BlackTooltip, LightTooltip } from "constants/mui";
import React, { useState } from "react";
import EditPerSonImg from "../../../../assets/EditPerson.png";
import FollowImg from "../../../../assets/follow.png";
import FriendImg from "../../../../assets/friendd.png";
import MesssengerImg from "../../../../assets/mess.png";
import StarImg from "../../../../assets/Starr.png";
import { profileTopTabStyle, style } from "./profileTopStyle";

function ProfileTopTab({
  user,
  value,
  userId,
  currentUser,
  handleChange,
  handleChatClick,
  handleFollowClick,
  handleUnFriendClick,
  handleRequireFriendClick,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
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
                {user?.friends?.length}
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
      <Box>
        {currentUser?.user?._id !== userId ? (
          !currentUser?.user?.friends.includes(userId) && (
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
          )
        ) : (
          <Button
            sx={style.profileTopButton}
            color="primary"
            variant="contained"
            disableElevation
            startIcon={<AddCircleIcon />}
          >
            Thêm vào tin
          </Button>
        )}

        {/* Profile Top Edit Button */}
        {currentUser?.user?._id === userId ? (
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
        ) : !currentUser?.requiredFriends?.includes(user?._id) &&
          currentUser?.user.friends?.includes(user?._id) ? (
          <LightTooltip
            open={open}
            onClose={() => setOpen(false)}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            enterTouchDelay={700}
            arrow
            title={
              <List>
                <ListItem disablePadding>
                  <BlackTooltip
                    placement="left"
                    title="Tính năng này hiện tại chưa được hoàn thành"
                  >
                    <ListItemButton sx={{ paddingY: 1 / 2 }}>
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: "18px",
                            height: "18px",
                            objectFit: "cover",
                          }}
                          component="img"
                          src={StarImg}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Yêu thích" />
                    </ListItemButton>
                  </BlackTooltip>
                </ListItem>
                <ListItem disablePadding>
                  <BlackTooltip
                    placement="left"
                    title="Tính năng này hiện tại chưa được hoàn thành"
                  >
                    <ListItemButton sx={{ paddingY: 1 / 2 }}>
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: "18px",
                            height: "18px",
                            objectFit: "cover",
                          }}
                          component="img"
                          src={EditPerSonImg}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Chỉnh sữa danh sách bạn bè" />
                    </ListItemButton>
                  </BlackTooltip>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleFollowClick}
                    sx={{ paddingY: 1 / 2 }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: "18px",
                          height: "18px",
                          objectFit: "cover",
                        }}
                        component="img"
                        src={FollowImg}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        currentUser.user.followings.includes(userId)
                          ? "Bỏ theo dõi"
                          : "Theo dõi"
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ paddingY: 1 / 2 }}
                    onClick={handleUnFriendClick}
                  >
                    <ListItemIcon>
                      <PersonAddDisabledIcon sx={{ color: "#333" }} />
                    </ListItemIcon>
                    <ListItemText primary="Hủy kết bạn" />
                  </ListItemButton>
                </ListItem>
              </List>
            }
          >
            <Button
              onClick={() => setOpen(!open)}
              sx={{
                ...style.profileTopButton,
                "&:hover": { backgroundColor: "lightgray" },
              }}
              disableElevation
              variant="contained"
              color="inherit"
              startIcon={
                <Box
                  sx={{ width: "18px", height: "18px", objectFit: "cover" }}
                  component="img"
                  src={FriendImg}
                />
              }
            >
              Bạn bè
            </Button>
          </LightTooltip>
        ) : (
          <Button
            onClick={handleRequireFriendClick}
            disableElevation
            color="primary"
            variant="contained"
            sx={style.profileTopButton}
            startIcon={
              currentUser?.requiredFriends?.includes(user?._id) ? (
                <PersonRemoveIcon />
              ) : (
                <PersonAddAlt1Icon />
              )
            }
          >
            {currentUser?.requiredFriends?.includes(user?._id)
              ? "Hủy lời mời"
              : "Thêm bạn bè"}
          </Button>
        )}
        {currentUser?.user._id !== userId &&
          (currentUser?.user?.friends.includes(userId) ||
            currentUser?.user?.followings.includes(userId)) && (
            <Button
              sx={style.profileTopButton}
              onClick={handleChatClick}
              color="primary"
              variant="contained"
              disableElevation
              startIcon={
                <Box
                  sx={{
                    width: "15px",
                    height: "15px",
                    filter: "brightness(0) invert(1)",
                    objectFit: "cover",
                  }}
                  component="img"
                  src={MesssengerImg}
                />
              }
            >
              Nhắn tin
            </Button>
          )}
        {/* Profile Top More Button */}
        <Button
          sx={{
            ml: 1 / 2,
            padding: "5px 12px",
            "&:hover": { backgroundColor: "lightgray" },
            "&:active": { transform: "scale(0.98)" },
          }}
          color="inherit"
          disableElevation
          variant="contained"
        >
          <MoreHorizIcon />
        </Button>
      </Box>
    </Stack>
  );
}

export default ProfileTopTab;
