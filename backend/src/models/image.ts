import { IImage } from "types/interfaces";
import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema<IImage>({
  image: {type: String, required: true},
  user: {type: mongoose.Schema.ObjectId,
    ref: "User",
  required: true}
});


const Image = mongoose.model("Image", imageSchema);

export default Image;

