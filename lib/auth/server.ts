import { auth } from "./";
import { headers } from "next/headers";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  return session;
};
