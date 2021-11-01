import { EmailOutlined } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CakeIcon from "@mui/icons-material/Cake";
import CreateIcon from "@mui/icons-material/Create";
import GroupIcon from "@mui/icons-material/Group";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import { style } from "./infoTabStyle";

function BasicContactInfo({ user }) {
  return (
    <Box
      sx={{
        padding: "8px",
        justifyContent: "flex-start",
        alignContent: "flex-start",
      }}
    >
      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Thông tin liên hệ cơ bản
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm thành phố</Box>
        </Box>
      </Box>

      <Box sx={{ ...style.flex, mb: 2 }}>
        <IconButton sx={{ ...style.icon }}>
          <PhoneIcon sx={style.icon} />
        </IconButton>

        <Box>
          <Box>{user?.phone || "..."}</Box>
          <Box sx={{ ...style.subTitle }}>Di động</Box>
        </Box>
        <Box sx={{ ...style.flex, ml: "auto" }}>
          <IconButton>
            <GroupIcon />
          </IconButton>

          <IconButton
            sx={{
              ...style.wrappedIcon,
            }}
          >
            <CreateIcon sx={{ color: "#555" }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ ...style.flex, mb: 2 }}>
        <IconButton sx={{ ...style.icon }}>
          <EmailOutlined sx={style.icon} />
        </IconButton>

        <Box>
          <Box>{user?.email || "..."}</Box>
          <Box sx={{ ...style.subTitle }}>Email</Box>
        </Box>
        <Box sx={{ ...style.flex, ml: "auto" }}>
          <IconButton>
            <LockIcon />
          </IconButton>

          <IconButton
            sx={{
              ...style.wrappedIcon,
            }}
          >
            <CreateIcon sx={{ color: "#555" }} />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Các trang mạng xã hội
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm một trang web</Box>
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm một liên kết xã hội</Box>
        </Box>
      </Box>

      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Thông tin cơ bản
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm một ngôn ngữ</Box>
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm quan điểm tôn giáo của bạn</Box>
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm quan điểm chính trị của bạn</Box>
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm người mà bạn thích</Box>
        </Box>
      </Box>

      <Box sx={{ ...style.flex, mb: 2 }}>
        <IconButton sx={{ ...style.icon }}>
          <TransgenderIcon sx={style.icon} />
        </IconButton>

        <Box>
          <Box>{user?.gender || "..."}</Box>
          <Box sx={{ ...style.subTitle }}>Giới tính</Box>
        </Box>
        <Box sx={{ ...style.flex, ml: "auto" }}>
          <IconButton>
            <GroupIcon />
          </IconButton>

          <IconButton
            sx={{
              ...style.wrappedIcon,
            }}
          >
            <CreateIcon sx={{ color: "#555" }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ ...style.flex, mb: 2 }}>
        <IconButton sx={{ ...style.icon }}>
          <CakeIcon sx={style.icon} />
        </IconButton>

        <Box>
          <Box>
            {user?.birthday
              ? `${new Date(user?.birthday)?.getDay()} Tháng ${
                  new Date(user?.birthday)?.getMonth() + 1
                } Năm ${new Date(user?.birthday)?.getFullYear()}`
              : `${new Date().getDay()} Tháng ${
                  new Date().getMonth() + 1
                } Năm ${new Date().getFullYear()}`}
          </Box>
          <Box sx={{ ...style.subTitle }}>Ngày sinh</Box>
        </Box>
        <Box sx={{ ...style.flex, ml: "auto" }}>
          <IconButton>
            <PublicIcon />
          </IconButton>

          <IconButton
            sx={{
              ...style.wrappedIcon,
            }}
          >
            <CreateIcon sx={{ color: "#555" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default BasicContactInfo;
