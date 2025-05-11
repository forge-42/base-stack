import { createCookie } from "react-router";
import { getServerEnv } from "~/env.server";

const env = getServerEnv()

export const localeCookie = createCookie("lng", {
  path: "/",
  sameSite: "lax",
  secure: env.NODE_ENV === "production",
  httpOnly: true,
});