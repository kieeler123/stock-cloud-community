import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { connectDb } from "./core/db";
import { registerRoutes } from "./api";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

registerRoutes(app);

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Stock Cloud API running on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
});
