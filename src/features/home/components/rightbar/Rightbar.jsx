import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import ChatOnline from "components/chatOnline/ChatOnline";
import { BlackTooltip } from "constants/mui";
import React from "react";
import giftImg from "../../../../assets/gift.png";
import sponsorImg from "../../../../assets/sponsor.png";

function Rightbar({ onlineUsers, currentUserId }) {
  return (
    <Box
      sx={{
        flex: 3.5,
        height: "calc(100vh - 62px)",
        overflow: "scroll",
        position: "sticky",
        top: "62px",
      }}
    >
      <Box
        sx={{
          padding: "20px 20px 0 0",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            padding: 2,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
            }}
            src={giftImg}
            alt="birthdayImg"
          />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 orther friend</b> have a birth day today
          </span>
        </Paper>

        <Box sx={{ margin: "20px 0" }} component="h4">
          Được tài trợ
        </Box>

        <Box
          sx={{
            display: "block",
            textDecoration: "none",
            color: "inherit",
            mb: "20px",
          }}
          component="a"
          href="https://shoestore-7857c.web.app/"
          rel="noopener noreferrer"
          target="blank"
        >
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              padding: 1,
              borderRadius: "8px",
            }}
          >
            <Box
              component="img"
              sx={{
                width: "150px",
                height: "80px",
                borderRadius: "8px",
                objectFit: "cover",
                boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.1)",
              }}
              src={sponsorImg}
              alt="sponsorImg"
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 2,
              }}
            >
              <Box component="h3" sx={{}}>
                Website ShoesStore | Sale Off
              </Box>
              <Box sx={{ fontSize: "12px" }} component="span">
                shoestore-7857c.web.app
              </Box>
            </Box>
          </Paper>
        </Box>

        <Divider sx={{ mb: 1 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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

        <ChatOnline onlineUsers={onlineUsers} currentUserId={currentUserId} />
      </Box>
    </Box>
  );
}

export default Rightbar;
