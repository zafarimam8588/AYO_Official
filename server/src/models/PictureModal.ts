import mongoose, { Document, Schema } from "mongoose";

export interface IPicture extends Document {
  pageToDisplay: string;
  positionOnPage: number;
  imageDescription: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PictureSchema: Schema = new Schema(
  {
    pageToDisplay: {
      type: String,
      required: [true, "Page to display is required"],
      default: "gallery",
      enum: [
        "home",
        "about",
        "programs",
        "gallery",
        "contact",
        "donate",
        "team",
        "partnership",
        "events",
        "achievements",
        "testimonials",
        "other",
      ],
      index: true,
    },
    positionOnPage: {
      type: Number,
      required: [true, "Position on page is required"],
      default: 1,
      min: [1, "Position must be at least 1"],
      max: [100, "Position cannot exceed 100"],
    },
    imageDescription: {
      type: String,
      required: [true, "Image description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    cloudinaryPublicId: {
      type: String,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
PictureSchema.index({ pageToDisplay: 1, positionOnPage: 1 });
PictureSchema.index({ pageToDisplay: 1, createdAt: -1 });

export default mongoose.model<IPicture>("Picture", PictureSchema);
