import NoAvatarImg from "../../../../assets/person/noAvatar.png";
import { Avatar, Paper } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function ProfileBottomImageList({ openImg, setOpenImg }) {
  const [photoIndex, setPhotoIndex] = useState(0);

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
        <ImageList
          sx={{
            width: "100%",
            borderRadius: "8px",
            marginTop: "8px",
          }}
          cols={3}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <ImageListItem onClick={() => setOpenImg(true)} key={index}>
              <Avatar
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "0",
                }}
                src={`${NoAvatarImg}`}
                srcSet={`${NoAvatarImg}`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>

      {openImg && (
        <Lightbox
          mainSrc={NoAvatarImg}
          nextSrc={NoAvatarImg}
          prevSrc={NoAvatarImg}
          onCloseRequest={() => setOpenImg(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + 9 - 1) % 9)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % 9)}
        />
      )}
    </Box>
  );
}

export default ProfileBottomImageList;
