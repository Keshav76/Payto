import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "phone",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        // Do zod validation, OTP validation here
        if (!credentials) return null;
        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        if (!existingUser) throw new Error("No such users");
        const passwordValidation = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordValidation) throw new Error("Wrong password");
        if (!existingUser.verified) throw new Error("User Not Verified");
        return {
          id: existingUser.id.toString(),
          name: existingUser.name,
          email: existingUser.number,
          number: existingUser.number,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        Object.assign(session.user, {
          id: token.sub,
          number: token.number,
        });
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export default authOptions;

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    number: number;
  };
} | null;
