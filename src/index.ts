import app from "./app";
import { connectDB } from "./utils/connectDB";
import { PORT } from "./config";

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
