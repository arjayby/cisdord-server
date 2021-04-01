// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { rateLimit } from 'feathers-fletching';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// 100 requests every 2 minutes
const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 120
});

const rateLimitHook = rateLimit(rateLimiter);

export default {
  before: {
    all: [rateLimitHook],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
