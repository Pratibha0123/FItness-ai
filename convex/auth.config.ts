import { ConvexJwtAuth } from "convex/server";

export default ConvexJwtAuth({
  // Clerk Dashboard → JWT Templates → Convex
  issuer: "https://neat-wallaby-17.clerk.accounts.dev", 

  audience: "convex", // keep this same as applicationID you used

  // Accept Clerk's JWT tokens
  getToken: (req) => {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return null;
    return authHeader.replace("Bearer ", "");
  },
});
