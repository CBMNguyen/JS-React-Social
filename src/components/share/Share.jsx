import React from "react";
import { shareList } from "../../constants/global";
import "./share.css";
import noAvatarImg from "../../assets/person/noAvatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import {
  capitalizeFirstLetter,
  showToastError,
  showToastSuccess,
} from "utils/common";
import { createPost } from "app/postSlice";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, Paper } from "@mui/material";

function Share(props) {
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const desc = useRef(null);
  const dispatch = useDispatch();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      data.append("file", file);
      newPost.img = file.name;

      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await showToastSuccess(dispatch(createPost(newPost)));
      desc.current.value = "";
      setFile(null);
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <Paper elevation={1} sx={{ mb: "25px", mt: "20px", borderRadius: "8px" }}>
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user?.profilePicture || noAvatarImg}
            alt="avatar"
          />

          <input
            ref={desc}
            type="text"
            placeholder={`${capitalizeFirstLetter(
              user?.username || ""
            )} ơi bạn đang nghĩ gì thế ?`}
            className="shareInput"
          />
        </div>

        <div className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <IconButton
              sx={{
                position: "absolute",
                top: "5px",
                right: "25px",
                color: "#fff",
                opacity: 0.6,
                transition: "all 0.2s ease-in-out 0s",
              }}
              onClick={() => setFile(null)}
            >
              <CancelIcon />
            </IconButton>
          </div>
        )}
        <form
          encType="multipart/form-data"
          onSubmit={handlePostSubmit}
          className="shareBottom"
        >
          <div className="shareOptions">
            {shareList.map((item, index) => (
              <label
                htmlFor={index === 1 ? "file" : ""}
                key={item.name}
                className="shareOption"
              >
                {item.icon}
                <span className="shareOptionText">{item.name}</span>
              </label>
            ))}
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </Paper>
  );
}

export default Share;
