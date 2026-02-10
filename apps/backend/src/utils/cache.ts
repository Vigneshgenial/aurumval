import { Redis } from '@upstash/redis';

if (!process.env.REDIS_URL) {
  console.warn('REDIS_URL not set, caching disabled');
}

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get<T>(key);
    return data || null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function setCachedData(
  key: string,
  value: any,
  ttl: number = 300
): Promise<void> {
  try {
    await redis.set(key, value, { ex: ttl });
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function deleteCachedData(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

export async function cacheGoldRate(usd: number, inr: number): Promise<void> {
  await setCachedData('gold_rate:usd', usd, 300); // 5 min
  await setCachedData('gold_rate:inr', inr, 300);
}

export async function getCachedGoldRate(): Promise<{ usd: number; inr: number } | null> {
  const usd = await getCachedData<number>('gold_rate:usd');
  const inr = await getCachedData<number>('gold_rate:inr');
  
  if (usd && inr) {
    return { usd, inr };
  }
  return null;
}
