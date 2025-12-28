import mongoose, { Schema } from "mongoose";

import { IContent } from "../types";

const ContentSchema = new Schema<IContent>(
  {
    section: {
      type: String,
      trim: true,
    },
    subsection: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "video", "json"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IContent>("Content", ContentSchema);
