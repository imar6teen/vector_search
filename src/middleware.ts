// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/scrape", "/search"],
// };

import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized({ req, token }) {
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
