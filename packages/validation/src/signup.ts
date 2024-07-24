import z from "zod";

const signupSchema = z
  .object({
    name: z.string().min(5, "Name too short"),
    email: z.string().email("Must be valid email"),
    password: z.string().min(6, "Password too short!"),
    number: z
      .number({ message: "Wrong " })
      .min(1000000000, "Incorrect Phone Number")
      .max(9999999999, "Incorrect Phone Number"),
  })
  .strict();

export default signupSchema;
