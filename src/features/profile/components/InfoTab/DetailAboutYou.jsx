import { Box } from "@mui/system";
import { default as React } from "react";
import AddItem from "../AddItem/AddItem";

function DetailAboutYou({ user }) {
  return (
    <Box sx={{ padding: "8px" }}>
      <AddItem
        sx={{ mb: 2 }}
        title="Giới thiệu về bản thân"
        content="Viết một số điều về chính bạn"
      />

      {/* Add pronunciation */}
      <AddItem
        sx={{ mb: 2 }}
        title="Cách phát âm tên"
        content="Thêm cách đọc tên"
      />

      {/* Add other name */}
      <AddItem
        sx={{ mb: 2 }}
        title="Các tên khác"
        content="Thêm biệt danh, tên thường gọi..."
      />

      {/* Add favorite Qoute */}
      <AddItem
        sx={{ mb: 2 }}
        title="Trích dẫn yêu thích"
        content="Thêm câu trích dẫn yêu thích của bạn"
      />
    </Box>
  );
}

export default DetailAboutYou;
