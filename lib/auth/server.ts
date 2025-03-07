import { auth } from "./";
import { headers } from "next/headers";

export const session = await auth.api.getSession({
  headers: headers(),
});
