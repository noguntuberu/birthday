import Joi from "joi";

export interface IUser {
  email: string;
  username: string;
  password: string;
  [key: string]: any; // Allows additional unknown properties
}

function validateUser(user: IUser) {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(500).required(),
  }).unknown(true);

  return Schema.validate(user, { abortEarly: false });
}


export default validateUser;