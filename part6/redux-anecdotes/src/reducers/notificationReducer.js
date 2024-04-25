import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    createNotification(_state, action) {
      return action.payload;
    },
    deleteNotification() {
      return "";
    },
  },
});

export const { createNotification, deleteNotification } =
  notificationSlice.actions;

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(createNotification(content));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
