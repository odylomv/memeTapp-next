import { withClerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default withClerkMiddleware(() => {
  console.log('Middleware is running');
  return NextResponse.next();
});

// Stop Middleware running on static files
// TODO: Fix matcher string to work with tRPC
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next
//      * - static (static files)
//      * - favicon.ico (favicon file)
//      */
//     '/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)',
//   ],
// };
