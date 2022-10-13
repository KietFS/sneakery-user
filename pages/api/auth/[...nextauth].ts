import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        "976697095375-u83u23muf77g5dbn38geegp4mkkm5t5m.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
