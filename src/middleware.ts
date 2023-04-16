import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default withClerkMiddleware(request => {
  console.log('Middleware is running');

  if (request.nextUrl.pathname !== '/') return NextResponse.next();

  const { userId } = getAuth(request);

  if (userId) {
    const exploreUrl = new URL('/explore', request.url);
    return NextResponse.redirect(exploreUrl);
  }

  return NextResponse.next();
});

// Stop Middleware running on static files
// TODO: Fix matcher string to work with tRPC
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/(.*?trpc.*?|(?!_next/image|_next/static|favicon.ico).*)',
    '/',
  ],
};
