import { Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import { default as React } from "react";
import { PersonalInformation } from "../../../constants/global";

function ProfileBottomInfo({ user }) {
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
          user?.city || "...",
          user?.from || "......",
          user?.relationship?.length === 1
            ? "Độc thân"
            : user?.relationship?.length === 2
            ? "Married"
            : ".........",
          `Tham gia vào tháng ${
            new Date(user?.createdAt).getMonth() + 1
          } năm ${new Date(new Date(user?.createdAt)).getFullYear()}`,
          `Có ${user?.followers?.length} người theo dỗi`
        ).map((item, index) => (
          <ListItem sx={{ paddingLeft: 0 }} key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      {/* Profile Left Bottom Info Button */}
      <Box
        component="button"
        sx={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
          fontWeight: 500,
          fontSize: "15px",
          backgroundColor: "#f0f2f5",
          transition: "all 0.4s easy-in-out 0s",
          "&:hover": {
            backgroundColor: "#e0e4e7",
            cursor: "pointer",
          },
        }}
      >
        Chỉnh sửa chi tiết
      </Box>
    </Paper>
  );
}

export default ProfileBottomInfo;
