import "../styles/Notification.css";
import { useSelector } from "react-redux";

const Notification = () => {
  const { notification } = useSelector((state) => state);

  if (notification === "") {
    return null;
  }

  if (notification.includes("ERROR")) {
    return <div className="error_message">{notification}</div>;
  } else {
    return <div className="success_message">{notification}</div>;
  }
};

export default Notification;
