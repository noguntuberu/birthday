import Joi from "joi";
import { IUser } from "types/interfaces";

export function validateUser(user: IUser) {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(500).required(),
  }).unknown(true);

  return Schema.validate(user, { abortEarly: false });
}
