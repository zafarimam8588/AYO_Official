import mongoose, { Document, Schema } from "mongoose";

import {
  GALLERY_CATEGORIES,
  PAGE_OPTIONS,
  type GalleryCategory,
  type PageOption,
} from "../constants/pictureConstants";

export type { GalleryCategory, PageOption };

export interface IPicture extends Document {
  page: PageOption;
  category?: GalleryCategory;
  imageNumber: number;
  imageUrl: string;
  cloudinaryPublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PictureSchema: Schema = new Schema(
  {
    page: {
      type: String,
      required: [true, "Page is required"],
      enum: {
        values: PAGE_OPTIONS,
        message: "Invalid page option",
      },
      index: true,
    },
    category: {
      type: String,
      enum: {
        values: GALLERY_CATEGORIES,
        message: "Invalid gallery category",
      },
      index: true,
      // Category is only used for gallery page
    },
    imageNumber: {
      type: Number,
      required: [true, "Image number is required"],
      min: [1, "Image number must be at least 1"],
      // No upper limit
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    cloudinaryPublicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Unique compound index for page + category + imageNumber
// This ensures no duplicate slots
PictureSchema.index({ page: 1, category: 1, imageNumber: 1 }, { unique: true });

// Index for faster page queries with ordering
PictureSchema.index({ page: 1, imageNumber: 1 });

// Index for gallery category queries
PictureSchema.index({ page: 1, category: 1, imageNumber: 1 });

export default mongoose.model<IPicture>("Picture", PictureSchema);
