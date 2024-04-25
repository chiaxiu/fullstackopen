/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import { createContext, useReducer } from "react";

const NotificationContext = createContext();
const initialState = {
  message: "",
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { message: action.payload };
    case "CLEAR_NOTIFICATION":
      return { message: "" };
    default:
      return state;
  }
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );
  console.log("message: ", notification.message);

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export const useNotification = () => {
  const notificationContext = useContext(NotificationContext);
  return notificationContext;
};
