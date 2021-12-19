import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { List, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import ChatOnline from "components/chatOnline/ChatOnline";
import { BlackTooltip } from "constants/mui";
import React from "react";
import giftImg from "../../../../assets/gift.png";
import sponsorImg from "../../../../assets/sponsor.png";
import rightbarStyle from "./rightbar";

function Rightbar({ onlineUsers, currentUser }) {
  return (
    <Box sx={rightbarStyle.container}>
      <Box sx={rightbarStyle.wrapper}>
        <Paper elevation={1} sx={rightbarStyle.birthdayBox}>
          <Box
            component="img"
            sx={rightbarStyle.birthdayLogo}
            src={giftImg}
            alt="birthdayImg"
          />
          <Box>
            <b>Pola Foster</b> and <b>3 orther friend</b> have a birth day today
          </Box>
        </Paper>

        <Box sx={{ margin: "20px 0" }} component="h4">
          Được tài trợ
        </Box>

        <Box
          sx={rightbarStyle.sponsorBox}
          component="a"
          href="https://shoestore-7857c.web.app/"
          rel="noopener noreferrer"
          target="blank"
        >
          <Paper elevation={2} sx={rightbarStyle.sponsorWrapper}>
            <Box
              sx={rightbarStyle.sponsorImg}
              component="img"
              src={sponsorImg}
              alt="sponsorImg"
            />

            <Box sx={rightbarStyle.sponsorLeftWrapper}>
              <Box component="h3">Website ShoesStore | Sale Off</Box>
              <Box sx={{ fontSize: "12px" }} component="span">
                shoestore-7857c.web.app
              </Box>
            </Box>
          </Paper>
        </Box>

        <Divider sx={{ mb: 1 }} />

        <Box sx={rightbarStyle.flexBetween}>
          <Box component="h4">Người liên hệ</Box>

          <Box>
            <BlackTooltip title="Phòng họp mặt mới">
              <IconButton>
                <VideoCallIcon fontSize="small" />
              </IconButton>
            </BlackTooltip>

            <BlackTooltip title="Tìm kiếm theo tên hoặc nhóm">
              <IconButton>
                <SearchIcon fontSize="small" />
              </IconButton>
            </BlackTooltip>

            <BlackTooltip title="Tùy chọn">
              <IconButton>
                <MoreHorizIcon fontSize="small" />
              </IconButton>
            </BlackTooltip>
          </Box>
        </Box>

        <List>
          {currentUser?.friends?.map((friendId) => (
            <ChatOnline
              key={friendId}
              onlineUsers={onlineUsers}
              friendId={friendId}
              currentUser={currentUser}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Rightbar;
