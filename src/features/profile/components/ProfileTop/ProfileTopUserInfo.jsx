import PublicIcon from "@mui/icons-material/Public";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { style } from "./profileTopStyle";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { updateUser } from "features/auth/userSlice";

function ProfileTopUserInfo({ user }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(user?.desc || "");
  const [openEditDesc, setOpenEditDesc] = useState(false);

  const handleCloseEditDesc = () => {
    setOpenEditDesc(false);
    setValue(user.desc);
  };

  const handleEditDescClick = () => {
    setOpenEditDesc(true);
    setValue(user.desc);
  };

  const handleSaveEditDesc = async () => {
    try {
      await dispatch(updateUser({ id: user._id, user: { desc: value } }));
      setOpenEditDesc(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        ...style.flexAlignItemCenter,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box component="h1" sx={{ mt: "4px", textTransform: "capitalize" }}>
        {user?.username}
      </Box>

      {!openEditDesc && (
        <Typography color="textSecondary" variant="body1">
          {user?.desc || "..."}
        </Typography>
      )}

      {openEditDesc && (
        <Box>
          <Box
            sx={style.profileTopTextArea}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            component="textarea"
            maxLength={100}
            placeholder="Mô tả về bạn"
          />
          <Box
            sx={{
              textAlign: "right",
              fontSize: "12px",
              marginY: 1 / 2,
            }}
          >{`Còn ${100 - value.length} kí tự`}</Box>
          <Box
            sx={{
              ...style.flexAlignItemCenter,
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box sx={style.flexAlignItemCenter}>
              <PublicIcon sx={{ color: "#000", mr: 1 / 2 }} />

              <Box sx={{ fontSize: "15px" }}>Công khai</Box>
            </Box>
            <Box>
              <Box
                onClick={handleCloseEditDesc}
                sx={style.profileTopCancelButton}
                component="button"
              >
                Hủy
              </Box>
              <Box
                onClick={handleSaveEditDesc}
                sx={style.profileTopSaveButton}
                disabled={value === user.desc}
                component="button"
              >
                Lưu
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {!openEditDesc && (
        <Box
          onClick={handleEditDescClick}
          component="span"
          sx={{
            color: "#1976d2",
            "&:hover": { cursor: "pointer", textDecoration: "underline" },
          }}
        >
          Chỉnh sửa
        </Box>
      )}
    </Box>
  );
}

export default ProfileTopUserInfo;
