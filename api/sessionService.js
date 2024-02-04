import {
    deleteCookie,
    getSignedCookie,
    setSignedCookie,
  } from "./deps.js";
  
  const secret = "secret";
  
  const WEEK_IN_MILLISECONDS = 604800000;

  const createSession = async (c, user) => {
    const sessionId = crypto.randomUUID();
    await setSignedCookie(c, "sessionId", sessionId, secret, {
      path: "/",
    });
  
    const kv = await Deno.openKv();
    await kv.set(["sessions", sessionId], user, {
        expireIn: WEEK_IN_MILLISECONDS,
      });
  };
  const getUserFromSession = async (c) => {
    const sessionId = await getSignedCookie(c, secret, "sessionId");
    if (!sessionId) {
      return null;
    }
  
    const kv = await Deno.openKv();
    const user = await kv.get(["sessions", sessionId]);
    const foundUser = user?.value ?? null;
    if (!foundUser) {
      return null;
    }
  
    await kv.set(["sessions", sessionId], foundUser, {
      expireIn: WEEK_IN_MILLISECONDS,
    });
  
    return foundUser;
}

  const deleteSession = async (c) => {
    const sessionId = await getSignedCookie(c, secret, "sessionId");
    if (!sessionId) {
      return;
    }
  
    deleteCookie(c, "sessionId", {
      path: "/",
    });
  
    const kv = await Deno.openKv();
    await kv.delete(["sessions", sessionId]);
  };
  

  export { createSession , getUserFromSession, deleteSession };