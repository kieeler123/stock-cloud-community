import { Router } from "express";
import { PostModel } from "../modules/posts/post.model";

export const router = Router();

router.get("/", async (_req, res) => {
  const posts = await PostModel.find().sort({ createdAt: -1 }).limit(50);
  res.json(posts);
});
