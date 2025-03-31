import { useState, useEffect } from "react";
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
  readAllNotifications,
  readNotification,
} from "../services/notificationService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data ?? []);
      } catch (err) {
        setError("Error fetching notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []); 

  
  useEffect(() => {
    setUnread(notifications.filter((n) => !n.isRead).length);
  }, [notifications]);


  const handleRead = async (id: number, type: string, relatedUser: string) => {
    try {
      await readNotification(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif,
        ),
      );

      navigate(type === "ReceivedRequest" ? "/" : `/profile/${relatedUser}`);
      toast.success("Notification marked as read!");
    } catch (error: any) {
      setError(error.message || "An error occurred");
      toast.error(error.message || "Failed to mark as read");
    }
  };

  
  const handleReadAll = async () => {
    try {
      await readAllNotifications();
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
      toast.success("All notifications marked as read!");
    } catch (error: any) {
      setError(error.message || "An error occurred");
      toast.error(error.message || "Failed to mark all as read");
    }
  };

  
  const handleDeleteNotification = async (id: number) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      toast.success("Notification deleted successfully!");
    } catch (error: any) {
      setError(error.message || "An error occurred");
      toast.error(error.message || "Failed to delete notification");
    }
  };

 
  const handleDeleteAllNotifications = async () => {
    try {
      await deleteAllNotifications();
      setNotifications([]); 
      toast.success("All notifications deleted successfully!");
    } catch (error: any) {
      setError(error.message || "An error occurred");
      toast.error(error.message || "Failed to delete notifications");
    }
  };

  return {
    notifications,
    error,
    loading,
    unread,
    handleRead,
    handleReadAll,
    handleDeleteNotification,
    handleDeleteAllNotifications,
  };
};
