import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PeopleIcon from "@mui/icons-material/People";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Avatar, Divider, IconButton, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createPost } from "app/postSlice";
import { BlackTooltip, StyledModal } from "constants/mui";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capitalizeFirstLetter,
  showToastError,
  showToastSuccess,
} from "utils/common";
import BoxColorImg from "../../assets/BoxColorImg.png";
import noAvatarImg from "../../assets/person/noAvatar.png";
import { shareList, shareListIcon } from "../../constants/global";

function Share(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [showEmoji, setShowEmoji] = useState(false);

  const handlePickEmoji = (e, { emoji }) => {
    const ref = inputRef.current;
    ref.focus();
    const start = value.substring(0, ref.selectionStart);
    const end = value.substring(ref.selectionStart);
    const text = start + emoji + end;
    setValue(text);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("desc", value);
    try {
      await showToastSuccess(dispatch(createPost(data)));
      setValue("");
      setFile(null);
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <Paper elevation={1} sx={{ mb: "25px", mt: "20px", borderRadius: "8px" }}>
      <Box sx={{ padding: "10px", paddingTop: "20px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ width: "42px", height: "42px", mr: "10px" }}
            src={
              user?.profilePicture?.length > 0
                ? `${process.env.REACT_APP_API_URL}/${
                    user?.profilePicture[user?.profilePicture?.length - 1]
                  }`
                : noAvatarImg
            }
            alt="avatar"
          />

          <Box
            component="input"
            sx={{
              backgroundColor: "#f5f5f5",
              width: "90%",
              height: "38px",
              padding: "0 16px",
              borderRadius: "20px",
              border: "none",

              transition: "all 0.2s ease-in-out 0s",
              "&:focus": {
                outline: "none",
              },
              "&:hover": {
                backgroundColor: "#edeff1",
                cursor: "pointer",
              },
            }}
            onClick={handleOpenModal}
            type="text"
            placeholder={`${capitalizeFirstLetter(
              user?.username || ""
            )} ơi bạn đang nghĩ gì thế ?`}
          />
        </Box>

        <Divider sx={{ marginY: "16px" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              opacity: "0.7",
            }}
          >
            {shareList.map((item, index) => (
              <Box
                key={item.name}
                onClick={handleOpenModal}
                sx={{ display: "flex", cursor: "pointer" }}
              >
                {item.icon}
                <Box
                  component="span"
                  sx={{ fontSize: "14px", fontWeight: 500 }}
                >
                  {item.name}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <StyledModal open={openModal} onClose={handleCloseModal}>
        <Box
          component="form"
          encType="multipart/form-data"
          onSubmit={handlePostSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "500px",
            bgcolor: "background.paper",
            paddingBottom: 2,
            borderRadius: "12px",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
          }}
        >
          <Box
            component="input"
            sx={{ display: "none" }}
            type="file"
            id="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: "10px",
              right: "20px",
              backgroundColor: "#f0f2f5",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box>
            <Box
              component="h2"
              sx={{ textAlign: "center", p: 2, fontSize: "22px" }}
            >
              Tạo bài viết
            </Box>

            <Divider />

            <Box sx={{ p: 2, maxHeight: "400px", overflowY: "scroll" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ width: "40px", height: "40px", mr: 1 / 2 }}
                  src={
                    user?.profilePicture?.length > 0
                      ? `${process.env.REACT_APP_API_URL}/${
                          user?.profilePicture[user?.profilePicture?.length - 1]
                        }`
                      : noAvatarImg
                  }
                  alt="avatar"
                />
                <Box>
                  <Box sx={{ textTransform: "capitalize", fontWeight: 500 }}>
                    {user?.username}
                  </Box>
                  <BlackTooltip title="Hiện tại chỉ có thể chia sẻ với bạn bè của bạn">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#e4e6eb",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <PeopleIcon
                        sx={{
                          fontSize: "14px",
                          mr: 1 / 2,
                        }}
                      />
                      <Box>Bạn bè</Box>
                      <ArrowDropDownIcon
                        sx={{
                          fontSize: "14px",
                        }}
                      />
                    </Box>
                  </BlackTooltip>
                </Box>
              </Box>

              <Box
                component="textarea"
                ref={inputRef}
                value={value}
                onClick={() => setShowEmoji(false)}
                onChange={(e) => setValue(e.target.value)}
                sx={{
                  border: "none",
                  resize: "none",
                  width: "100%",
                  height: "64px",
                  fontSize: "22px",
                  marginY: "20px",
                  "&:focus": {
                    outline: "none",
                  },
                }}
                placeholder={`${capitalizeFirstLetter(
                  user?.username || ""
                )} ơi, bạn đang nghĩ gì thế ?`}
              />

              {file && (
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                      borderRadius: "8px",
                      objectFit: "contain",
                    }}
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "#fff",
                      opacity: 0.6,
                      transition: "all 0.2s ease-in-out 0s",
                    }}
                    onClick={() => setFile(null)}
                  >
                    <CancelIcon fontSize="large" />
                  </IconButton>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: "4px",
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: "rgb(240, 242, 245, 0.6)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "34px",
                        height: "34px",
                        padding: "4px",

                        borderRadius: "50%",
                        backgroundColor: "#e4e6eb",
                      }}
                    >
                      <PhoneAndroidIcon />
                    </Box>
                    <Box component="span" sx={{ fontSize: "12px", ml: "14px" }}>
                      Thêm ảnh từ thiết bị di động
                    </Box>

                    <BlackTooltip title="Tính năng này sẽ sóm được hoàn thành">
                      <Box
                        sx={{
                          display: "block",
                          ml: "auto",
                          border: "none",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          fontWeight: 500,
                          fontSize: "16px",
                          backgroundColor: "#e4e6eb",
                          cursor: "pointer",
                        }}
                      >
                        Thêm
                      </Box>
                    </BlackTooltip>
                  </Box>
                </Box>
              )}
              {!file && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <BlackTooltip title="Tính năng này sẽ sóm được hoàn thành">
                    <Box
                      component="img"
                      sx={{ width: "40px", height: "40px", cursor: "pointer" }}
                      src={BoxColorImg}
                      SettingsVoiceIcon
                    />
                  </BlackTooltip>

                  <BlackTooltip placement="top" title="Biểu tượng cảm xúc">
                    <InsertEmoticonIcon
                      onClick={() => setShowEmoji(!showEmoji)}
                      sx={{
                        color: "#ccc",
                        "&:hover": { color: "#bbb", cursor: "pointer" },
                      }}
                    />
                  </BlackTooltip>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-100px",
                      right: "-100px",
                    }}
                  >
                    {showEmoji && <Picker onEmojiClick={handlePickEmoji} />}
                  </Box>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                border: "1px solid lightgray",
                borderRadius: "8px",
                marginBottom: "20px",
                marginX: 2,
              }}
            >
              <Box sx={{ fontWeight: 500 }}>Thêm vào bài viết</Box>
              <Box>
                {shareListIcon.map((item, index) => (
                  <BlackTooltip
                    key={index}
                    placement="top"
                    title={
                      index === 0
                        ? "Ảnh/Video"
                        : "Tính năng này sẽ sóm được hoàn thành"
                    }
                  >
                    <Box
                      sx={{ cursor: "pointer" }}
                      component="label"
                      htmlFor={index === 0 ? "file" : ""}
                    >
                      {item.icon}
                    </Box>
                  </BlackTooltip>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                mx: 2,
                cursor: !file && !value ? "not-allowed" : "pointer",
              }}
            >
              <Button
                disabled={!file && !value}
                onClick={(e) => {
                  handlePostSubmit(e);
                  setOpenModal(false);
                }}
                color="primary"
                variant="contained"
                fullWidth
              >
                Đăng
              </Button>
            </Box>
          </Box>
        </Box>
      </StyledModal>
    </Paper>
  );
}

export default Share;
