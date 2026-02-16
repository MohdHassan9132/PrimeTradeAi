import { ENV } from "./env.js";

export const cookieOptions = {
  httpOnly: true,
  secure: ENV.COOKIE.SECURE,
  sameSite: ENV.COOKIE.SAME_SITE,
  path: "/",
  maxAge: 31 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
};
