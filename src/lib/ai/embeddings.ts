import { pipeline } from '@xenova/transformers';
import redis from '@/lib/redis';

let extractor: any = null;

export async function getEmbedding(text: string) {
  const cacheKey = `embedding:${text}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('Redis embedding error:', e);
  }

  if (!extractor) {
    // We use a small, fast model for low-latency edge performance
    extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  const output = await extractor(text, {
    pooling: 'mean',
    normalize: true,
  });

  const result = Array.from(output.data) as number[];

  try {
    await redis.set(cacheKey, JSON.stringify(result), 'EX', 86400); // Cache for 24 hours
  } catch (e) {
    console.warn('Redis embedding set error:', e);
  }

  return result;
}
