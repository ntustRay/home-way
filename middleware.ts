import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server'; // Import necessary functions from Clerk's Next.js server package

const isProtectedRoute = createRouteMatcher([ // Create a route matcher for protected routes
  '/bookings(.*)', // Match any route starting with /bookings
  '/checkout(.*)', // Match any route starting with /checkout
  '/favorites(.*)', // Match any route starting with /favorites
  '/profile(.*)', // Match any route starting with /profile
  '/rentals(.*)', // Match any route starting with /rentals
  '/reviews(.*)', // Match any route starting with /reviews
]);

export default clerkMiddleware((auth, req) => { // Export the default middleware function
  if (isProtectedRoute(req))
    auth().protect(); // Protect the route if it matches the protected routes
});

export const config = { // Export the configuration object
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], // Define the routes to apply the middleware to
};