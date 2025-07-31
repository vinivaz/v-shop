import { NextRequest, NextResponse, type MiddlewareConfig} from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = [
  {path: "/sign-in", whenAuthenticated: "redirect"},
  {path: "/sign-up", whenAuthenticated: "redirect"},
  {path: "/reset-password", whenAuthenticated: "redirect"},
  {path: "/", whenAuthenticated: "next"},
  {path: "/cart", whenAuthenticated: "next"},
  {path: "/search", whenAuthenticated: "next"},
  {path: "/products", whenAuthenticated: "next"},
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export function middleware(request: NextRequest){

  const path = request.nextUrl.pathname;


  const authToken = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");
  // const token = await getToken({ req:request, secret: process.env.NEXTAUTH_SECRET });

  const isPublic = publicRoutes.find((route) =>
    path === route.path || path.startsWith(route.path + "/")
  );


  if(!authToken && isPublic){
    return NextResponse.next()
  }


  if(!authToken && !isPublic){
    const redirectURL = request.nextUrl.clone()

    redirectURL.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectURL);
  }

  if(authToken && isPublic && isPublic.whenAuthenticated === "redirect"){
    const redirectURL = request.nextUrl.clone()

    redirectURL.pathname = "/";
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|ad|icons|illustrations|logo.svg).*)',
  ],
}