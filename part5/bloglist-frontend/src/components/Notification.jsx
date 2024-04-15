import "../styles/Notification.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message.includes("ERROR")) {
    return <div className="error_message">{message}</div>;
  } else {
    return <div className="success_message">{message}</div>;
  }
};

export default Notification;
