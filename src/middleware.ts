// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/scrape", "/search"],
// };

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async authorized({ req }) {
      // token can be achieved from authorized parameter, code below "const token"
      // is used because for some reason next auth change the name of cookie in production
      // this lead to token = null from authorized parameter.
      // I've been debugging for this thing whole day :)
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName:
          process.env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token",
      });
      if (
        (req.nextUrl.pathname.startsWith("/scrape") ||
          req.nextUrl.pathname.startsWith("/search")) &&
        token === null
      )
        return false;
      return true;
    },
  },
});
