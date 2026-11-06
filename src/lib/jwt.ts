// src/lib/jwt.ts

// Reads the expiry time (seconds since 1970) from a JWT. It does NOT verify the signature:
// it is only used to decide "should we ask for a fresh token?", never to trust the token.
export function getTokenExpiry(token: string): number | null {
  try {
    const payloadPart = token.split(".")[1];
    const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8")) as { exp?: unknown };
    return typeof payload.exp === "number" ? payload.exp : null;
  } catch {
    return null;
  }
}

// True when the token still has more than `marginSeconds` left to live
export function isTokenFresh(token: string, marginSeconds = 60): boolean {
  const expiry = getTokenExpiry(token);
  return expiry !== null && expiry - Date.now() / 1000 > marginSeconds;
}
