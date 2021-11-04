import { Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import { default as React } from "react";
import { PersonalInformation } from "../../../../constants/global";

function ProfileBottomInfo({ user, setOpenModal, profileState }) {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: "16px",
        mb: "16px",
        borderRadius: "8px",
      }}
    >
      <Box component="h2">Giới Thiệu</Box>

      <List>
        {PersonalInformation(
          <Box>
            Sống tại <b>{user?.city || "..."}</b>
          </Box>,
          <Box>
            Đến từ <b>{user?.from || "......"}</b>
          </Box>,
          user?.relationship?.length === 1
            ? "Độc thân"
            : user?.relationship
            ? user?.relationship
            : ".........",
          `Tham gia vào tháng ${
            new Date(user?.createdAt).getMonth() + 1
          } năm ${new Date(new Date(user?.createdAt)).getFullYear()}`,
          <Box>
            Có <b>{user?.followers?.length}</b> người theo dỗi
          </Box>
        ).map((item, index) => {
          if (profileState[index] !== 1) return "";
          return (
            <ListItem sx={{ paddingLeft: 0 }} key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
      {/* Profile Left Bottom Info Button */}
      <Box
        onClick={() => setOpenModal(true)}
        component="button"
        sx={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
          fontWeight: 500,
          fontSize: "15px",
          backgroundColor: "#ddd",
          transition: "all 0.4s easy-in-out 0s",
          "&:hover": {
            backgroundColor: "#ccc",
            cursor: "pointer",
          },
          "&:active": { transform: "scale(0.98)" },
        }}
      >
        Chỉnh sửa chi tiết
      </Box>
    </Paper>
  );
}

export default ProfileBottomInfo;
