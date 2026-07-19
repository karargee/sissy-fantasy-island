import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://prepared-mullet-163270.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "gQAAAAAAAn3GAAIgcDI3NDM1ZTNlNmRiNWE0MTQ5OWY5NGE3Y2FkYmY2OWFiNw",
});

export default redis;
