import { Avatar, Paper } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/system";
import React from "react";
import "react-image-lightbox/style.css";

function ProfileBottomImageList({
  setOpenImg,
  setPhotoIndex,
  imageList,
  setValue,
}) {
  return (
    <Box>
      <Paper
        elevation={2}
        sx={{
          padding: "16px",
          mb: "16px",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box component="h2">Ảnh</Box>
          <Box
            sx={{
              fontWeight: "400",
              padding: "8px",
              borderRadius: "8px",
              color: "#1877f2",
              "&:hover": {
                backgroundColor: "#f0f2f5",
                cursor: "pointer",
              },
            }}
            onClick={() => setValue(3)}
          >
            Xem tất cả ảnh
          </Box>
        </Box>
        {/* Images List */}
        {imageList.length > 0 && (
          <ImageList
            sx={{
              width: "100%",
              borderRadius: "8px",
              marginTop: "8px",
            }}
            cols={3}
          >
            {imageList.slice(0, 8).map((item, index) => (
              <ImageListItem
                onClick={() => {
                  setOpenImg(true);
                  setPhotoIndex(index);
                }}
                key={index}
              >
                <Avatar
                  sx={{
                    width: "100%",
                    height: "110px",
                    borderRadius: "0",
                    cursor: "pointer",
                    marginBottom: 1 / 2,
                  }}
                  src={item}
                  alt={item}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        {imageList.length === 0 && <Box>Empty Image</Box>}
      </Paper>
    </Box>
  );
}

export default ProfileBottomImageList;
