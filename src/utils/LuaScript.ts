import Redis from "ioredis";

const luaScript = `
    local exists = redis.call("EXISTS", KEYS[1])
    if exists == 0 then
        redis.call("SET", KEYS[1], ARGV[1])
        return 1
    else
        return 0
    end
`;

async function runLuaScript(
  redis: Redis,
  key: string,
  value: string
): Promise<any> {
  try {
    // Nạp script và lấy hash
    const scriptSha = await (redis as any).script("load", luaScript);
    // Chạy script thông qua evalsha
    const result: number = (await redis.evalsha(
      scriptSha,
      1,
      key,
      value
    )) as number;

    // if (result === 1) {
    //   console.log("Key was set");
    // } else {
    //   console.log("Key already exists");
    // }
    return result;
  } catch (err) {
    console.error("Error running Lua script:", err);
    //   } finally {
    //     redis.quit();
  }
}
