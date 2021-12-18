import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Alert, AlertTitle, Button, Paper, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { BlackTooltip } from "constants/mui";
import React from "react";
import { TabPanel } from "utils/common";
import NotComplete from "../NotComplete/NotComplete";
import { profileTopTabStyle } from "../ProfileTop/profileTopStyle";
import ImageTabItem from "./ImageTabItem";
import { style } from "./imageTabStyle";

function ImageTab({ imageList, setPhotoIndex, setOpenImg }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={2} sx={style.imageTabWrapper}>
      <Box sx={style.imageTabHeader}>
        <Box component="h2">Ảnh</Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <BlackTooltip title="Tính năng này hiện tại chưa hoàn thành">
            <Box sx={style.imageTabHeaderItem}>Thêm ảnh/video</Box>
          </BlackTooltip>

          <Button
            sx={style.imageTabHeaderItemMoreIcon}
            color="inherit"
            disableElevation
            variant="contained"
          >
            <MoreHorizIcon />
          </Button>
        </Box>
      </Box>

      <Tabs sx={{ mb: "20px" }} value={value} onChange={handleChange}>
        <Tab
          sx={profileTopTabStyle(value, 0)}
          disableRipple
          value={0}
          label="Ảnh của bạn"
        />
        <Tab
          sx={profileTopTabStyle(value, 1)}
          disableRipple
          value={1}
          label="Ảnh có mặt bạn"
        />
        <Tab
          sx={profileTopTabStyle(value, 2)}
          disableRipple
          value={2}
          label="Album"
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        {imageList.length > 0 &&
          imageList.map((src, index) => (
            <ImageTabItem
              setOpenImg={setOpenImg}
              setPhotoIndex={setPhotoIndex}
              index={index}
              src={src}
              key={src}
            />
          ))}
        {imageList.length === 0 && (
          <Alert severity="info">
            <AlertTitle>Facebook</AlertTitle>
            Bạn chưa có hình ảnh nào, hãy thêm hình ảnh của bạn !
          </Alert>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <NotComplete />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <NotComplete />
      </TabPanel>
    </Paper>
  );
}

export default ImageTab;
