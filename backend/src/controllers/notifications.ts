import { Request, Response } from 'express';
import { deleteAllNotifications, deleteNotificationById, getAllNotifications, getNotificationById, readAllNotifications, readNotification, sendNotification } from "../services/notification";


export const controlGetAllNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const result = await getAllNotifications(userId);
    res.status(201).send(result);
    return;
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
  }
};

export const controlGetNotificationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const id = parseInt(req.params.id)
    const result = await getNotificationById(userId,id);
    res.status(201).send(result);
    return;
  } catch (error: any) {
    res.status(400).send(error.message || "server error");
  }
}; 

export const controlDeleteNotificationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const id = parseInt(req.params.id)
    const result = await deleteNotificationById(userId,id);
    if(!result.success){
      res.status(400).send(result.error)
    }
    res.status(200).send("successfully deleted");
    return;
  } catch (error: any) {
    res.status(400).send(error.message || "server error");
  }
};
export const controlDeleteAllNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const result = await deleteAllNotifications(userId);
    if(!result.success){
      res.status(400).send(result.error)
    }
    res.status(200).send("successfully deleted");
    return;
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
  }
};
export const controlReadNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const id = parseInt(req.params.id)
    const result = await readNotification(userId,id);
    if(!result.success){
      res.status(400).send(result.error)
    }
    res.status(200).send("successfully Read");
    return;
  } catch (error: any) {
    res.status(400).send(error.message || "server error");
  }
};
export const controlReadAllNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const result = await readAllNotifications(userId);
    if(!result.success){
      res.status(400).send(result.error)
    }
    res.status(200).send("successfully Read");
    return;
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
  }
};

export const controlSendNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { receiverId, message, type } = req.body;
    const result = await sendNotification({ receiverId, message, type, relatedUser:userId });
    if(!result.success){
      res.status(400).send(result.error)
    }
    res.status(200).send("sent successfully");
    return;
  } catch (error: any) {
    res.status(400).send(error.message || "server error");
  }
};
