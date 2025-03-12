import { createAuthClient } from "better-auth/react";
 const authClient = createAuthClient({
  baseURL: import.meta.env.BETTER_AUTH_URL, // the base url of your auth server
});

export default authClient;