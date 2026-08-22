/** Edge + Node compatible signed admin session tokens (HMAC-SHA256). */

export const ADMIN_COOKIE = "berrays_admin_session";
const TOKEN_VERSION = "v1";
const SESSION_TTL_SEC = 60 * 60 * 24; // 24 hours

type SessionPayload = {
  v: number;
  exp: number;
  iat: number;
  nonce: string;
};

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function importKey(secret: string): Promise<CryptoKey> {
  const encoded = new TextEncoder().encode(secret);
  return crypto.subtle.importKey(
    "raw",
    encoded,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signPayload(payloadB64: string, secret: string): Promise<string> {
  const key = await importKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  return base64UrlEncode(new Uint8Array(signature));
}

export async function createSessionToken(secret: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    v: 1,
    iat: now,
    exp: now + SESSION_TTL_SEC,
    nonce: crypto.randomUUID(),
  };
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await signPayload(payloadB64, secret);
  return `${TOKEN_VERSION}.${payloadB64}.${signature}`;
}

export async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  if (!token || !secret) return false;

  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) return false;

  const [, payloadB64, signature] = parts;
  if (!payloadB64 || !signature) return false;

  try {
    const expected = await signPayload(payloadB64, secret);
    if (signature.length !== expected.length) return false;

    const a = new TextEncoder().encode(signature);
    const b = new TextEncoder().encode(expected);
    if (a.length !== b.length) return false;

    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
    if (diff !== 0) return false;

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(payloadB64)),
    ) as SessionPayload;

    if (payload.v !== 1) return false;
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE_SEC = SESSION_TTL_SEC;
