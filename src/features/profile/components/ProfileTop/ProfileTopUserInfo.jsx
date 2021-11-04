import { Box } from "@mui/system";
import React from "react";
import { style } from "./profileTopStyle";

function ProfileTopUserInfo({ user }) {
  return (
    <Box
      sx={{
        ...style.flexAlignItemCenter,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box component="h1" sx={{ mt: "4px", textTransform: "capitalize" }}>
        {user?.username}
      </Box>
      <Box component="span" sx={{ fontWeight: 300 }}>
        {user?.desc || "..."}
      </Box>
      <Box component="span" sx={{ fontWeight: 400, color: "blue" }}>
        Chỉnh sửa
      </Box>
    </Box>
  );
}

export default ProfileTopUserInfo;
