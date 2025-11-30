import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    authorId: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    stockSymbols: [String], // 관련 종목 (JP, US, KR 다 쓸 수 있게)
    locale: { type: String, default: "ja" }, // "ja", "ko", "en"
  },
  { timestamps: true }
);

export const PostModel = model("Post", postSchema);
