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
export default notificationSlice.reducer;
