import type { SessionOptions } from 'iron-session';

export interface SessionUser {
  name: string;
  email: string;
  payerId: string;
  accessToken: string;
  expiresAt: number; // unix ms
}

export interface SessionData {
  user?: SessionUser;
  pkce?: {
    state: string;
    verifier: string;
  };
}

const password = process.env.SESSION_PASSWORD;
if (!password || password.length < 32) {
  console.warn('[session] SESSION_PASSWORD missing or too short — using insecure dev default');
}

export const sessionOptions: SessionOptions = {
  cookieName: 'gmb_session',
  password: password ?? 'dev-only-insecure-password-change-me-32c',
  ttl: 60 * 60 * 24 * 7, // 7 days
  cookieOptions: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  },
};
