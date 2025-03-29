import { MdDelete } from "react-icons/md";

const Notification = ({ notification, onRead, onDelete }: any) => {
  return (
    <div className="notification-container" onClick={onRead}>
      <div className={notification.isRead ? "read" : "unRead"}>
        <p>{notification.message}</p>
        <MdDelete size={24} color="red" onClick={onDelete} />
      </div>
    </div>
  );
};

export default Notification;
