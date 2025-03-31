import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.number().min(18, "Must be at least 18").optional(),
  dob: z.string().optional(),
  hobbies: z.string().optional(),
  gender: z.enum(["male", "female"], { message: "Select a valid gender" }).nullable().optional(),
  location: z.string().optional(),
  image: z
  .custom<File | null | undefined>((file) => {
    if (!file) return true; // Allow empty file (optional)
    return file instanceof File && file.type.startsWith("image/");
  }, { message: "Invalid file format. Only images are allowed." })
  .optional(),
});

export type FormData = z.infer<typeof formSchema>;

export default formSchema;
