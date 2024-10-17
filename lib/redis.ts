import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL); // Use your Redis URL from Upstash or Redis Cloud

export default redis;