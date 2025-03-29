import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(3, { message: "at least 3 alphabets" }).optional(),
  lastName: z.string().min(3, { message: "at least 3 alphabets" }).optional(),
  hobbies: z.string().min(3, { message: "at least 3 alphabets" }).optional(),
  location: z.string().min(3, { message: "at least 3 alphabets" }).optional(),
  dob: z
    .union([z.string(), z.date()])
    .refine(
      (val) => !val || !isNaN(new Date(val).getTime()),
      "Invalid date format",
    )
    .optional(),
  gender: z.enum(["male", "female"]).optional(),
});

export type ProfileFormData = z.infer<typeof schema>;

export default schema;
