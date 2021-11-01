import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { default as React } from "react";
import { style } from "./infoTabStyle";

function WorkAndEducation({ user }) {
  return (
    <Box
      sx={{
        padding: "8px",
        justifyContent: "flex-start",
        alignContent: "flex-start",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Công việc
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={style.blue} />
          </IconButton>

          <Box>Thêm nơi làm việc</Box>
        </Box>
      </Box>

      {/* Add University School */}

      <Box sx={{ mb: 3 }}>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Đại học
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={{ ...style.blue }} />
          </IconButton>
          <Box>Thêm trường trung học</Box>
        </Box>
      </Box>

      {/* Add Secondary School */}

      <Box sx={{ mb: 3 }}>
        <Box component="h4" sx={{ fontWeight: 500, ml: 1 }}>
          Trường trung học
        </Box>
        <Box sx={{ ...style.flex, ...style.blue }}>
          <IconButton sx={{ ...style.icon }}>
            <AddCircleOutlineIcon sx={{ ...style.blue }} />
          </IconButton>
          <Box>Thêm trường cao đẳng</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WorkAndEducation;
