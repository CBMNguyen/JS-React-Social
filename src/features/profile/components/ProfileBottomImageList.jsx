import NoAvatarImg from "..././../assets/person/noAvatar.png";
import { Paper } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/system";
import { default as React } from "react";

function ProfileBottomImageList(props) {
  return (
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
          mt: "16px",
        }}
        cols={3}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <ImageListItem key={index}>
            <img
              sx={{ width: "100px", height: "100px" }}
              src={`${NoAvatarImg}`}
              srcSet={`${NoAvatarImg}`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Paper>
  );
}

export default ProfileBottomImageList;
