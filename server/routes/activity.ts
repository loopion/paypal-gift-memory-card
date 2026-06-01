import { Router } from 'express';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '../lib/session.js';
import type { SessionData } from '../lib/session.js';
import { sampleTransactions, filterByDateRange } from '../lib/sampleData.js';
import { fetchActivityList } from '../lib/paypal.js';

const router = Router();

const ACTIVITY_MODE = process.env.ACTIVITY_MODE ?? 'sample';

router.get('/', async (req, res) => {
  const { start, end } = req.query as { start?: string; end?: string };

  if (ACTIVITY_MODE === 'internal') {
    try {
      const session = await getIronSession<SessionData>(req, res, sessionOptions);
      if (!session.user) return res.status(401).json({ error: 'Not authenticated' });

      const { payerId, accessToken } = session.user;
      const transactions = await fetchActivityList(payerId, start ?? '', end ?? '', accessToken);
      res.setHeader('X-Activity-Source', 'internal');
      return res.json({ transactions });
    } catch (err) {
      console.error('[activity] Internal fetch failed, falling back to sample:', err);
      res.setHeader('X-Activity-Source', 'fallback');
    }
  }

  const filtered = filterByDateRange(sampleTransactions, start, end);
  res.setHeader('X-Activity-Source', 'sample');
  return res.json({ transactions: filtered });
});

export default router;
