import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  afterAuth(auth, req) {
    if (req.nextUrl.pathname === '/' && auth.userId) {
      const exploreUrl = new URL('/explore', req.url);
      return NextResponse.redirect(exploreUrl);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
