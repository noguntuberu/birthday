import { Request, Response } from "express";
import ImageService from "../services/image";


export const controlAddImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if(!req.file){
      res.status(400).send("No file uploaded");
      return;
    }
    const imageBase64 = req.file.buffer.toString("base64");
    const senderId = (req as any).user.userId;
    const result = await ImageService.addImage(imageBase64, senderId);
    if (!result.success) {
      res.status(400).send(result.error);
      return;
    }
    res.status(201).send("Image uploaded successfully");
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
  }
};

export const controlGetImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const result = await ImageService.getImage(userId);
    if(!result){
      res.status(404).send("Image not found")
    }
    res.status(201).send({image: `data:image/png;base64,${result}`});
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
  }
};

export const controlGetOthersImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.id;
    const result = await ImageService.getImage(userId);
    if(!result){
      res.status(404).send("Image not found")
    }
    res.status(201).send({image: `data:image/png;base64,${result}`});
  } catch (error: any) {
    res.status(500).send(error.message || "server error");
  }
};