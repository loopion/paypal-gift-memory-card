import { Router } from 'express';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '../lib/session.js';
import type { SessionData } from '../lib/session.js';
import {
  generatePKCE,
  buildAuthorizationUrl,
  exchangeCode,
  getUserInfo,
} from '../lib/paypal.js';

const router = Router();

router.get('/login', async (req, res) => {
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    const { state, verifier, challenge } = generatePKCE();
    session.pkce = { state, verifier };
    await session.save();
    res.redirect(302, buildAuthorizationUrl(state, challenge));
  } catch (err) {
    console.error('[auth/login]', err);
    res.status(500).json({ error: 'Login initiation failed' });
  }
});

router.get('/callback', async (req, res) => {
  const { code, state, error } = req.query as Record<string, string>;

  if (error) {
    console.error('[auth/callback] OAuth error:', error);
    return res.redirect('/?auth_error=cancelled');
  }

  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if (!session.pkce || session.pkce.state !== state) {
      return res.redirect('/?auth_error=state_mismatch');
    }

    const { verifier } = session.pkce;
    const { accessToken, expiresAt } = await exchangeCode(code, verifier);
    const userInfo = await getUserInfo(accessToken);

    session.pkce = undefined;
    session.user = { ...userInfo, accessToken, expiresAt };
    await session.save();

    return res.redirect('/dashboard');
  } catch (err) {
    console.error('[auth/callback]', err);
    return res.redirect('/?auth_error=exchange_failed');
  }
});

router.get('/me', async (req, res) => {
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (!session.user) {
      return res.status(401).json({ authenticated: false });
    }
    const { name, email, payerId } = session.user;
    return res.json({ authenticated: true, name, email, payerId });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.destroy();
    return res.json({ ok: true });
  } catch {
    return res.json({ ok: true });
  }
});

export default router;
