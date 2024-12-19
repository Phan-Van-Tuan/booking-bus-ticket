import app from "./app";
import { config } from "./config/env";

const PORT = config.PORT || 4500;

app.listen(PORT, () => {
  console.log(`[SETUP] Server is running on http://localhost:${PORT}`);
});
