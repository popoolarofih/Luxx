import redis from './index';

export async function rateLimit(identifier: string, limit: number = 10, window: number = 60) {
  const key = `ratelimit:${identifier}`;
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, window);
  }

  return {
    success: current <= limit,
    current,
    remaining: Math.max(0, limit - current),
  };
}
