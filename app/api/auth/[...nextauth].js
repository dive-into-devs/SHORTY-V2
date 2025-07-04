import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import { verifyPassword } from "@/lib/auth";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if(!user) {
          throw new Error("No user found with this email");
        }
        const isValid = await verifyPassword(credentials.password, user.password);
        if(!isValid) {
          throw new Error("Invalid password");
        }
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
