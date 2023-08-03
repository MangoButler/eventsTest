import { Fragment, use, useContext } from "react";
import MainHeader from "./MainHeader";
import StatusNotification from "../UI/StatusNotification";
import NotificationContext from "../../store/notification-context";

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const { notification: activeNotification } = notificationCtx;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <StatusNotification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
