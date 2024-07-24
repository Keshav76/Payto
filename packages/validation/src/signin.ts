import z from "zod";

const signinSchema = z
  .object({
    number: z
      .number()
      .min(1000000000, "Incorrect Phone Number")
      .max(9999999999, "Incorrect Phone Number"),
    password: z.string().min(6, "Password too short!"),
  })
  .strict();

export default signinSchema;
