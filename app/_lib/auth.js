import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

// Define the configuration for the NextAuth authentication middleware
const authConfig = {
  // Define the authentication providers
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // Define the callback functions for various events in the authentication process
  callbacks: {
    // Check if the user is authorized to access the application
    authorized({ auth, request }) {
      // Return true if the user is authenticated
      return !!auth?.user;
    },
    // Handle the sign-in event
    async signIn({ user, account, profile }) {
      try {
        // Check if the user already exists in the guest database
        const existingGuest = await getGuest(user.email);

        // If the user does not exist, create a new guest record
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        // Return true to indicate successful sign-in
        return true;
      } catch {
        // Return false to indicate failed sign-in
        return false;
      }
    },
    // Handle the session creation event
    async session({ session, user }) {
      try {
        // Get the guest record from the database based on the user's email
        const guest = await getGuest(session.user.email);

        // Add the guest ID to the session object
        session.user.guestId = guest.id;

        // Return the updated session object
        return session;
      } catch {
        // Return null to indicate failed session creation
        return null;
      }
    },
  },
  // Define the URLs for the authentication pages
  pages: {
    signIn: '/login', // URL for the sign-in page
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
