import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const res = NextResponse.next();

  res.headers.append("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow frontend origin
  res.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow methods
  res.headers.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
