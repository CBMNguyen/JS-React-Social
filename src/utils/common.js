import { Badge } from "@mui/material";
import { styled } from "@mui/system";
import { unwrapResult } from "@reduxjs/toolkit";
import { PRODUCT_TOAST_OPTIONS } from "constants/global";
import { toast } from "react-toastify";
import DanderImg from "../assets/dander.svg";
import FavouriteImg from "../assets/favourite.svg";
import HahaImg from "../assets/haha.svg";
import LoveImg from "../assets/love.svg";
import SadImg from "../assets/sad.svg";
import WowImg from "../assets/wow.svg";

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const pendingState = (state) => {
  state.loading = true;
};

export const rejectedState = (state, action) => {
  state.loading = false;
  state.error = action.payload.message;
};

export const showToastSuccess = async (asyncAction) => {
  const result = await asyncAction;
  if (!unwrapResult(result)) return;
  toast.success(result.payload.message, {
    ...PRODUCT_TOAST_OPTIONS,
  });
  return result.payload;
};

// Show Toast Error

export const showToastError = (error) => {
  toast.error(error.message, {
    ...PRODUCT_TOAST_OPTIONS,
  });
};

// format date full VN

export const formatDateFull = (date) => {
  const thu = date.getDay() + 1;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `Thứ ${thu}, ${day} Tháng ${month}, ${year} lúc ${hour}:${minute}`;
};

const color = " rgb(247, 177, 37)";

export const currentState = (state) => {
  switch (state) {
    case 0:
      return { name: "Thích", color: "rgb(32, 120, 244)" };
    case 1:
      return { name: "Yêu thích", color: "rgb(243, 62, 88)" };
    case 2:
      return { name: "Thương Thương", color };
    case 3:
      return { name: "HaHa", color };
    case 4:
      return { name: "Wow", color };
    case 5:
      return { name: "Buồn", color };
    case 6:
      return { name: "Phẫn nộ", color: "rgb(233, 113, 15)" };
    default:
      return { name: "Thích", color: "#555" };
  }
};

export const currentStateAvatar = (state) => {
  switch (state) {
    case 1:
      return {
        name: "Yêu thích",
        img: FavouriteImg,
        color: "rgb(243, 62, 88)",
      };
    case 2:
      return { name: "Thương Thương", img: LoveImg, color };
    case 3:
      return { name: "HaHa", img: HahaImg, color };
    case 4:
      return { name: "Wow", img: WowImg, color };
    case 5:
      return { name: "Buồn", img: SadImg, color };
    case 6:
      return { name: "Phẫn nộ", img: DanderImg, color: "rgb(233, 113, 15)" };
    default:
      return { name: "Thích", img: "", color: "inherit" };
  }
};

export const countState = (likes, state) => {
  return likes.filter((item) => item.state === state).length;
};

export const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    width: "12px",
    height: "12px",
    border: "2px solid #fff",
    borderRadius: "50%",
  },
});
