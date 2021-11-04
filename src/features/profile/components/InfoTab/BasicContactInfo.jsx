import { EmailOutlined } from "@mui/icons-material";
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
import AddItem from "../AddItem/AddItem";
import InfoItem from "../InfoItem/InfoItem";
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
      <AddItem title="Thông tin liên hệ cơ bản" content="Thêm thành phố" />

      <InfoItem
        sx={{ mb: 2 }}
        startIcon={
          <IconButton sx={{ ...style.icon }}>
            <PhoneIcon sx={style.icon} />
          </IconButton>
        }
        title={<Box>{user?.phone || "..."}</Box>}
        content="Di động"
        end1Icon={<GroupIcon />}
        end2Icon={<CreateIcon sx={{ color: "#555" }} />}
      />

      <InfoItem
        sx={{ mb: 2 }}
        startIcon={
          <IconButton sx={{ ...style.icon }}>
            <EmailOutlined sx={style.icon} />
          </IconButton>
        }
        title={<Box>{user?.email || "..."}</Box>}
        content="Email"
        end1Icon={<LockIcon />}
        end2Icon={<CreateIcon sx={{ color: "#555" }} />}
      />

      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Các trang mạng xã hội
        </Box>
        <AddItem content="Thêm một trang web" />
        <AddItem content="Thêm một liên kết xã hội" />
      </Box>

      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Thông tin cơ bản
        </Box>
        <AddItem content="Thêm một ngôn ngữ" />
        <AddItem content="Thêm quan điểm tôn giáo của bạn" />
        <AddItem content="Thêm quan điểm chính trị của bạn" />
        <AddItem content="Thêm người mà bạn thích" />
      </Box>

      <InfoItem
        sx={{ mb: 2 }}
        startIcon={
          <IconButton sx={{ ...style.icon }}>
            <TransgenderIcon sx={style.icon} />
          </IconButton>
        }
        title={<Box>{user?.gender || "..."}</Box>}
        content="Giới tính"
        end1Icon={<GroupIcon />}
        end2Icon={<CreateIcon sx={{ color: "#555" }} />}
      />

      <InfoItem
        sx={{ mb: 2 }}
        startIcon={
          <IconButton sx={{ ...style.icon }}>
            <CakeIcon sx={style.icon} />
          </IconButton>
        }
        title={
          <Box>
            {user?.birthday
              ? `${new Date(user?.birthday)?.getDay()} Tháng ${
                  new Date(user?.birthday)?.getMonth() + 1
                } Năm ${new Date(user?.birthday)?.getFullYear()}`
              : `${new Date().getDay()} Tháng ${
                  new Date().getMonth() + 1
                } Năm ${new Date().getFullYear()}`}
          </Box>
        }
        content="Ngày sinh"
        end1Icon={<PublicIcon />}
        end2Icon={<CreateIcon sx={{ color: "#555" }} />}
      />
    </Box>
  );
}

export default BasicContactInfo;
