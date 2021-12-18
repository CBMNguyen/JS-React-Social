import { Alert, AlertTitle } from "@mui/material";
import React from "react";

function NotComplete(props) {
  return (
    <Alert severity="info">
      <AlertTitle>Facebook</AlertTitle>
      Xin lỗi bạn tính năng này sẽ sớm được hoàn thành
    </Alert>
  );
}

export default NotComplete;
