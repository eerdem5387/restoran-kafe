import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE_SEC,
  createSessionToken,
  verifySessionToken,
} from "@/lib/session-token";

const WEAK_SECRETS = new Set([
  "larome-admin-session-v1",
  "change-me-to-a-long-random-string",
  "berrays-admin-session-v1",
]);

const WEAK_PASSWORDS = new Set(["admin123", "password", "admin"]);

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (process.env.NODE_ENV === "production") {
    if (!secret || secret.length < 32 || WEAK_SECRETS.has(secret)) {
      throw new Error(
        "ADMIN_SESSION_SECRET must be a unique random string (32+ chars) in production.",
      );
    }
    return secret;
  }
  return secret || "dev-insecure-session-secret-not-for-production";
}

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (process.env.NODE_ENV === "production") {
    if (!password || password.length < 12 || WEAK_PASSWORDS.has(password)) {
      throw new Error("ADMIN_PASSWORD must be a strong password (12+ chars) in production.");
    }
    return password;
  }
  return password || "admin123";
}

export function verifyPassword(password: string): boolean {
  const expected = getAdminPassword();
  const hash = (value: string) => createHash("sha256").update(value, "utf8").digest();
  return timingSafeEqual(hash(password), hash(expected));
}

export async function createSession(): Promise<void> {
  const token = await createSessionToken(getSessionSecret());
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  if (!session?.value) return false;

  try {
    return await verifySessionToken(session.value, getSessionSecret());
  } catch {
    return false;
  }
}

export { ADMIN_COOKIE, verifySessionToken, getSessionSecret };
