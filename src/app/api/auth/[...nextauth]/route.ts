import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define proper types for our user data
interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

// Mock users with additional properties
const mockUsers: MockUser[] = [
  {
    id: 1,
    name: "User One",
    email: "user1@example.com",
    password: "password123",
    role: "user",
    isActive: true,
  },
  {
    id: 2,
    name: "User Two",
    email: "user2@example.com",
    password: "password456",
    role: "admin",
    isActive: true,
  },
];

// Move authOptions to a separate constant but don't export it
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please provide both email and password");
          }

          const { email, password } = credentials;

          // Simulate user authentication using mock data
          const user = mockUsers.find(
            (u) => u.email === email && u.password === password
          );

          if (!user) {
            throw new Error("Invalid email or password");
          }

          if (!user.isActive) {
            throw new Error("User account is deactivated");
          }

          // Return user data (excluding sensitive information)
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };

          // For real API implementation:
          /*
          const response = await fetch("https://api.example.com/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }

          const user = await response.json();
          return user;
          */
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add custom claims to the JWT token
        token.role = (user as unknown as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        // Add custom claims to the session
        (session.user as any).role = token.role as string;
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",

  // Custom error messages
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user.email);
    },
    async signOut({ token }) {
      console.log("User signed out:", token.email);
    },
  },
};

// Create the handler
const handler = NextAuth(authOptions);

// Only export the HTTP method handlers
export { handler as GET, handler as POST };