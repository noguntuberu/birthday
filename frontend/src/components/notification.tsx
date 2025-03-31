import { MdDelete } from "react-icons/md";

const Notification = ({ notification, onRead, onDelete }:any) => {
 
  return (
    <div className="notification-container" onClick={onRead}>
      <div className={notification?.isRead ? "read flex-not" : "unRead flex-not"}>
        <div className="circle">
        </div>
        <div className="message-cont">
          <p className="e1">{notification.message}</p>
          <p className="e2">{notification.createdAt}</p>
        </div>
        <div className="delete-cont" >
          <MdDelete size={24} color="grey" onClick={onDelete}/>
        </div>
      </div>
    </div>
  );
};

export default Notification;
