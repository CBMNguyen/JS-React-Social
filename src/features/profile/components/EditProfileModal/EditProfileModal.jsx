import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { StyledModal } from "constants/mui";
import React, { useState } from "react";
import AddItem from "../AddItem/AddItem";
import editProfileModalStyle from "./editProfileModal";
import InfoItem from "./InfoItem";
import SocialItem from "./SocialItem";

function EditProfileModal({
  profileState,
  setProfileState,
  user,
  openModal,
  setOpenModal,
  setValue,
  setInfoTabValue,
}) {
  const editSchool = () => {
    setOpenModal(false);
    setValue(1);
    setInfoTabValue(1);
  };

  const editAddress = () => {
    setOpenModal(false);
    setValue(1);
    setInfoTabValue(2);
  };

  const editRelationship = () => {
    setOpenModal(false);
    setValue(1);
    setInfoTabValue(4);
  };

  const [currentProfileState, setCurrentProfileState] = useState(profileState);

  const handleChange = (index) => {
    let newState = currentProfileState.slice();
    newState[index] *= -1;
    setCurrentProfileState(newState);
  };

  return (
    <StyledModal open={openModal} onClose={() => setOpenModal(false)}>
      <Paper sx={editProfileModalStyle.modal}>
        <Box>
          <Box sx={editProfileModalStyle.header}>
            <Box component="h2" sx={editProfileModalStyle.title}>
              Chỉnh sửa bài viết
            </Box>

            <Divider />

            <IconButton
              onClick={() => setOpenModal(false)}
              sx={editProfileModalStyle.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={editProfileModalStyle.main}>
            <Box sx={{ ml: 1, mb: 3 }}>
              <Box component="h3" sx={{ fontWeight: 500 }}>
                Chỉnh sửa phần giới thiệu
              </Box>

              <Box sx={{ color: "#65676b", fontSize: "14px" }} component="span">
                Chi tiết bạn chọn sẽ hiển thị công khai.
              </Box>
            </Box>

            <AddItem
              onClick={editSchool}
              component="h3"
              sx={{ mb: 2 }}
              title="Công việc"
              content="Thêm nơi làm việc"
              fontSize="large"
            />

            <AddItem
              onClick={editSchool}
              component="h3"
              title="Học vấn"
              content="Thêm trường trung học"
              fontSize="large"
            />

            <AddItem
              onClick={editSchool}
              component="h3"
              sx={{ mb: 2 }}
              content="Thêm trường cao đẳng/đại học"
              fontSize="large"
            />

            <InfoItem
              currentProfileState={currentProfileState[0]}
              onChange={() => handleChange(0)}
              onClick={editAddress}
              title="Tỉnh/Thành phố hiện tại"
              content={`Sống tại ${user?.city || "..."}`}
            />

            <InfoItem
              currentProfileState={currentProfileState[1]}
              onChange={() => handleChange(1)}
              onClick={editAddress}
              title="Quê quán"
              content={`Đến từ ${user?.from || "......"}`}
            />

            <InfoItem
              currentProfileState={currentProfileState[2]}
              onChange={() => handleChange(2)}
              onClick={editRelationship}
              title="Mối quan hệ"
              content={user?.relationship}
            />

            <InfoItem
              sx={{ mb: 3 }}
              currentProfileState={currentProfileState[3]}
              onChange={() => handleChange(3)}
              title="Tham gia Facebook"
              content={`Tham gia vào Tháng ${
                new Date(user?.createdAt).getMonth() + 1
              } năm ${new Date(user?.createdAt).getFullYear()}`}
              showEditIcon={false}
            />

            <InfoItem
              sx={{ mb: 3 }}
              currentProfileState={currentProfileState[4]}
              onChange={() => handleChange(4)}
              title="Người theo dõi"
              content={`Có ${user?.followings?.length} người theo dõi`}
              showEditIcon={false}
            />

            <SocialItem
              title="Trang web"
              content=" Để hiển thị liên kết trên trang cá nhân, hãy đặt đối tượng
                  thành Công khai."
            />

            <SocialItem
              title="Liên kết xã hội"
              content=" Để hiển thị liên kết trên trang cá nhân, hãy đặt đối tượng
                  thành Công khai."
            />
          </Box>

          <Divider />

          <Box sx={editProfileModalStyle.footer}>
            <Box
              onClick={() => {
                setOpenModal(false);
                setValue(1);
                setInfoTabValue(0);
              }}
              sx={editProfileModalStyle.updateInfoButton}
            >
              Cập nhật thông tin
            </Box>
            <Box>
              <Box
                onClick={() => setOpenModal(false)}
                component="button"
                sx={editProfileModalStyle.cancelButton}
              >
                Hủy
              </Box>

              <Box
                onClick={() => {
                  setProfileState(currentProfileState);
                  localStorage.setItem(
                    "profileState",
                    JSON.stringify(currentProfileState)
                  );
                  setOpenModal(false);
                }}
                component="button"
                sx={editProfileModalStyle.saveButton}
              >
                Lưu
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </StyledModal>
  );
}

export default EditProfileModal;
