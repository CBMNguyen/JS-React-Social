import { Paper } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { TabPanel } from "utils/common";

function StateTabs({ post }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={2}>
      <Tabs sx={{ mb: "20px" }} value={value} onChange={handleChange}>
        <Tab disableRipple value={0} label="Tất cả" />
        <Tab disableRipple value={1} label="Bạn chung" />
        <Tab disableRipple value={2} label="Tỉnh/Thành phố hiện tại" />
        <Tab disableRipple value={3} label="Quê quán" />
        <Tab disableRipple value={4} label="Người Theo dõi" />
        <Tab disableRipple value={5} label="Đang theo dỗi" />
      </Tabs>

      <TabPanel value={value} index={1}>
        <Alert severity="warning">
          <AlertTitle>Facebook</AlertTitle>
          Xin lỗi bạn tính năng này sẽ sớm được hoàn thành
        </Alert>
      </TabPanel>
    </Paper>
  );
}

export default StateTabs;
