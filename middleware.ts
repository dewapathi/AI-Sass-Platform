// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // Define routes that should be protected
// const isProtectedRoute = createRouteMatcher(["/", "/credits"]);

// export default clerkMiddleware((auth, req) => {
//   const publicRoutes = ["/api/webhooks/clerk"];
//   const currentPath = req.nextUrl.pathname;

//   if (!publicRoutes.includes(currentPath) && isProtectedRoute(req)) {
//     auth().protect(); // Protect the route if it matches the defined criteria
//   }
// });

// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// import { clerkMiddleware } from '@clerk/nextjs/server';

// // Make sure that the `/api/webhooks/(.*)` route is not protected here
// export default clerkMiddleware()

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\\.[\\w]+$)", "/"],
  publicRoutes: ['/', '/api/webhooks/clerk', 'api/webhooks/stripe'],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
