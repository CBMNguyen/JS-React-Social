import { Avatar, Paper } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function ProfileBottomImageList({ openImg, setOpenImg, user, posts }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const imageInPost = posts.filter((post) => post.img);

  const imageList = [].concat(
    user?.coverPicture,
    user?.profilePicture,
    imageInPost.map((post) => post.img)
  );

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
          <Box sx={{ textDecoration: "none", color: "blue" }}>
            Xem tất cả hình ảnh
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
            {imageList.map((item, index) => (
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
                    height: "104px",
                    borderRadius: "0",
                    cursor: "pointer",
                  }}
                  src={`${process.env.REACT_APP_API_URL}/${item}`}
                  alt={item}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        {imageList.length === 0 && <Box>Empty Image</Box>}
      </Paper>

      {openImg && (
        <Lightbox
          mainSrc={`${process.env.REACT_APP_API_URL}/${imageList[photoIndex]}`}
          nextSrc={`${process.env.REACT_APP_API_URL}/${[
            (photoIndex + 1) % imageList.length,
          ]}`}
          prevSrc={`${process.env.REACT_APP_API_URL}/${[
            (photoIndex + imageList.length - 1) % imageList.length,
          ]}`}
          onCloseRequest={() => setOpenImg(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + imageList.length - 1) % imageList.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % imageList.length)
          }
        />
      )}
    </Box>
  );
}

export default ProfileBottomImageList;
