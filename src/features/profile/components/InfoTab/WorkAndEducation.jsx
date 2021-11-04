import { Box } from "@mui/system";
import { default as React } from "react";
import AddItem from "../AddItem/AddItem";

function WorkAndEducation({ user }) {
  return (
    <Box
      sx={{
        padding: "8px",
        justifyContent: "flex-start",
        alignContent: "flex-start",
      }}
    >
      <AddItem sx={{ mb: 3 }} title="Công việc" content="Thêm nơi làm việc" />

      {/* Add University School */}
      <AddItem
        sx={{ mb: 3 }}
        title="Đại học"
        content="Thêm trường cao đẳng/đại học"
      />

      {/* Add Secondary School */}
      <AddItem
        sx={{ mb: 3 }}
        title="Trường trung học"
        content="Thêm trường trung học"
      />
    </Box>
  );
}

export default WorkAndEducation;
