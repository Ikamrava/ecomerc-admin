import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        // clientId: process.env.GOOGLE_CLIENT_ID,
        // clientSecret: process.env.GOOGLE_CLIENT_SECRET
        clientId:"563942810554-4m2boqne55ruptq2j77ffj96bcnenbrk.apps.googleusercontent.com",
        clientSecret:"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"
      }),
    
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET,
}
export default NextAuth(authOptions)