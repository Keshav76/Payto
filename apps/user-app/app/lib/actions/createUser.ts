"use server";

import db, { Prisma } from "@repo/db/client";
import bcrypt from "bcryptjs";
import signupSchema from "@repo/validation/signup";

interface UserSchema {
  number: number;
  password: string;
  email: string;
  name: string;
}

type CreateUserFunction = (
  userData: UserSchema
) => Promise<{ msg: string; id: number }>;

const createUser: CreateUserFunction = async (userData) => {
  const { success, data, error } = signupSchema.safeParse(userData);
  if (!success) return { id: -1, msg: error.errors[0]?.message || "" };

  try {
    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        number: data.number.toString(),
        password: await bcrypt.hash(data.password, 10),
      },
    });
    return { id: newUser.id, msg: "success" };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          msg: "User already exists.",
          id: -1,
        };
      }
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      return createUser(data);
    }
    console.log("error: ", e);
    return {
      msg: "Something went wrong",
      id: -1,
    };
  }
};

const verifyUser = async (id: number) => {
  try {
    await db.user.update({
      where: { id },
      data: { verified: true },
    });
    return true;
  } catch (err) {
    return false;
  }
};

const deleteUser = async (id: number) => {
  try {
    await db.user.delete({
      where: { id },
    });
    return true;
  } catch (err) {
    return false;
  }
};

export { createUser, verifyUser, deleteUser };
