import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with real database logic
        const user = { id: "1", name: "User", email: "user@example.com" };

        if (
          credentials.email === "user@example.com" &&
          credentials.password === "password123"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom Sign In page
  },
};

export default NextAuth(authOptions);
