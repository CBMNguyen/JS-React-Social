import { unwrapResult } from "@reduxjs/toolkit";
import { PRODUCT_TOAST_OPTIONS } from "constants/global";
import { toast } from "react-toastify";

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
      return { name: "Yêu thích", color: "red" };
    case 2:
      return { name: "Thương Thương", color };
    case 3:
      return { name: "HaHa", color };
    case 4:
      return { name: "Wow", color };
    case 5:
      return { name: "Buồn", color: "rgb(243, 62, 88)" };
    case 6:
      return { name: "Phẫn nộ", color: "rgb(233, 113, 15)" };
    default:
      return { name: "Thích", color: "#555" };
  }
};

export const countState = (likes, state) => {
  return likes.filter((item) => item.state === state).length;
};
