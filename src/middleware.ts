import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
export default authMiddleware({
  afterAuth(auth, req) {
    if (req.nextUrl.pathname !== '/') return NextResponse.next();
    
    if(auth.userId){
      const exploreUrl = new URL('/explore', req.url);
      return NextResponse.redirect(exploreUrl);
    }
  }
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};