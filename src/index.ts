import app from "./app";
import { config } from "./configs/env.config";

app.listen(config.PORT, () => {
  console.log(`[SETUP] Server is running on http://localhost:${config.PORT}`);
});
