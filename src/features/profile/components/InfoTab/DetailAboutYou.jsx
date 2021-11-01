import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import { style } from "./infoTabStyle";

function DetailAboutYou({ user }) {
  return (
    <Box sx={{ padding: "8px" }}>
      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Giới thiệu về bản thân
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Viết một số điều về chính bạn</Box>
        </Box>
      </Box>

      {/* Add pronunciation */}

      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Cách phát âm tên
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm cách đọc tên</Box>
        </Box>
      </Box>

      {/* Add other name */}

      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Cách tên khác
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm biệt danh, tên thường gọi...</Box>
        </Box>
      </Box>

      {/* Add favorite Qoute */}

      <Box>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Trích dẫn yêu thích
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm câu trích dẫn yêu thích của bạn</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DetailAboutYou;
