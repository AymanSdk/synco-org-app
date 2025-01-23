import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth", "/"]);
const isAuthPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request) => {
  const isHomePage = request.nextUrl.pathname === "/";

  if (isHomePage) {
    return;
  }

  if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  // if (isAuthPage(request) && isAuthenticatedNextjs()) {
  //   return nextjsMiddlewareRedirect(request, "/workspace");
  // }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
