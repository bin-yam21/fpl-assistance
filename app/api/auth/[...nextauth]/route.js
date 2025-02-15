import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
// Database connection file
import bcrypt from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";

// Configure NextAuth
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise), // MongoDB adapter for session persistence
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Email/Password Authentication
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const db = (await clientPromise).db();
        const user = await db.collection("users").findOne({ email });

        if (!user) throw new Error("User not found!");
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error("Invalid credentials!");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  // pages: {
  //   signIn: "/auth/signin", // Custom sign-in page route
  // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
