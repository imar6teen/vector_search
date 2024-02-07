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
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      console.log(token);
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
