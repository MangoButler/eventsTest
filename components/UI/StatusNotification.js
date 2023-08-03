import { useContext } from "react";
import classes from "./StatusNotification.module.css";
import NotificationContext from "../../store/notification-context";
import Loader from "./Loader";


const StatusNotification = (props) => {
  const statusCtx = useContext(NotificationContext);

  const { status, title, message } = props;
  let statusClasses = "";


  if (status === "pending") {
    statusClasses = classes.pending;
  }
  if (status === "success") {
    statusClasses = classes.success;
  }
  if (status === "error") {
    statusClasses = classes.error;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={statusCtx.hideNotification}>
      <h2>{title}</h2>
      {status === 'pending' && <Loader/> }
      <p>{message}</p>
    </div>
  );
};

export default StatusNotification;

// onClick={statusCtx.hideNotification}
