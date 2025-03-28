import User from "../models/user";


export const getAllNotifications= async (userId:string)=>{
  const user = await User.findById(userId).select("notifications");
  const result = user?.notifications;
  
  return result;
}

export const getNotificationById= async (userId:string,notificationId: number)=>{
  const user = await User.findById(userId).select("notifications");
  const result = user?.notifications.find((e) => e.id === notificationId);
  
  return result;
}

export const deleteNotificationById = async (userId: string, notificationId: number)=>{
 try {
  const user = await User.findById(userId).select("notifications");
  if(!user){
    return {success: false, error: "user not found"}
  }
  user.notifications = user.notifications.filter((e)=>(e.id!==notificationId));
  await user.save();
  return {success: true}
 } catch (error: any) {
  return {success: false, error: error.message}
 }
}
export const deleteAllNotifications = async (userId:string)=>{
 try {
  const user = await User.findById(userId).select("notifications");
  if(!user){
    return {success: false, error: "user not found"};
  }
  user.notifications=[];
  return {success: true}
 } catch (error: any) {
  return {success: false, error: error.message};
 }
}

export const readNotification = async (userId: string, notificationId: number) => {
  const user = await User.findById(userId).select("notifications");
  if (!user) {
    return { success: false, error: "User not found" };
  }
  const notification = user?.notifications.find((e) => e.id === notificationId);
  if (!notification) {
    return { success: false, error: "Notification not found" };
  }
  notification.isRead = true;
  await user.save();

  return { success: true };
};

export const readAllNotifications = async (userId: string)=>{
  try {
    const user = await User.findById(userId).select("notifications");
    if (!user){
      return {success: false, error: "User not found"}
    }
    user?.notifications.forEach(e => {
      e.isRead=true;
    });
    await user.save();
    return {success: true}
  } catch (error: any) {
    return {success: false, error: error.message|| "unknown error"}
  }
}

export const sendNotification = async ({ receiverId, message, type, relatedUser }: any) => {
  try {
    const user = await User.findById(receiverId).select("notifications");
    if (!user) {
      return { success: false, error: "User not found" };
    }
    const lastNotification = user.notifications[user.notifications.length - 1];
    const newId = lastNotification ? lastNotification.id + 1 : 1;  
    const newNotification: any = {
      id: newId,
      message: message,
      type: type,
      relatedUser,
    };
    user.notifications.push(newNotification)
    await user.save();

    return { success: true, notification: newNotification };
  } catch (error:any) {
    return { success: false, error: error.message };
  }
};