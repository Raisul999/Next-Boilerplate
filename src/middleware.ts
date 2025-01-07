import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define public routes that do not require authentication
  const publicRoutes = ["/auth/signin", "/auth/registration"];

  // Check if the current path is a public route
  const pathname = new URL(req.url).pathname;
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Allow access to public routes or if the user has a valid session token
  if (isPublicRoute || token) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the sign-in page
  return NextResponse.redirect(new URL("/auth/signin", req.url));
}

// Apply the middleware to all routes
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"], // Match all routes except _next, API, and static assets
};
