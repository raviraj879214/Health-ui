import { NextResponse } from 'next/server';




export function middleware(req) {
  
  console.log("Middleware running at:", req.nextUrl.pathname);

  



  return NextResponse.next();
}
