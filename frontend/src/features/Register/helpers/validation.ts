import { z } from "zod";

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
        {
          message:
            "Passsword must have at least one uppercase letter, one lowercase letter, one number and a special character",
        },
      ),
    passwordConfirm: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
        {
          message:
            "Passsword must have at least one uppercase letter, one lowercase letter, one number and a special character",
        },
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type RegisterFormData = z.infer<typeof schema>;

export default schema;
