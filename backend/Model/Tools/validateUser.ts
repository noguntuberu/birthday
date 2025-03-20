import Joi from "joi";

export interface IUser {
  firstName: string;
  lastName: string;
  gender?: "male" | "female";
  email: string;
  dob: Date;
  username: string;
  password: string;
  [key: string]: any; // Allows additional unknown properties
}

function validateUser(user: IUser) {
  const Schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    gender: Joi.string().valid("male", "female"),
    email: Joi.string().email().required(),
    dob: Joi.date().less("now").required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(500).required(),
  }).unknown(true);

  return Schema.validate(user, { abortEarly: false });
}


export default validateUser;