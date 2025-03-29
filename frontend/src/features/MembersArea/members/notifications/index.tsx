import "./notification.css";
import Notification from "../../../../components/notification";
import { useNotifications } from "../../../../hooks/useNotifications";
import { ToastContainer } from "react-toastify";

const Notifications = () => {
  const {
    notifications,
    error,
    loading,
    handleRead,
    handleReadAll,
    handleDeleteNotification,
    handleDeleteAllNotifications,
  } = useNotifications();

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div>
        <span
          onClick={handleReadAll}
          style={{ cursor: "pointer", marginRight: "10px" }}
        >
          Mark all Read
        </span>
        <span
          onClick={handleDeleteAllNotifications}
          style={{ cursor: "pointer", color: "red" }}
        >
          Delete All
        </span>
      </div>

      {/* Render notifications */}
      <div>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.map((notif) => (
            <Notification
              key={notif.id}
              notification={notif}
              onRead={() => handleRead(notif.id, notif.type, notif.relatedUser)}
              onDelete={() => handleDeleteNotification(notif.id)}
            />
          ))
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Notifications;
