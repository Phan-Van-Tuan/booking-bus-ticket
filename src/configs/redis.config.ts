import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379", // Địa chỉ Redis của bạn
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient
  .connect()
  .then(() => {
    console.log("[SETUP] Connected to Redis");
  })
  .catch((err) => {
    console.error("Redis connection error:", err);
  });

export { redisClient };
