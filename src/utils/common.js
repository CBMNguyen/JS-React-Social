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
