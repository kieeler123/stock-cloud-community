import { Express } from "express";
import { router as healthRouter } from "./health";
import { router as postsRouter } from "./posts";

export const registerRoutes = (app: Express) => {
  app.use("/health", healthRouter);
  app.use("/posts", postsRouter);
};
