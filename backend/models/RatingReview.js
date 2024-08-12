import mongoose, { Schema } from "mongoose";

const ratingReviewSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    comments: { type: String },
    productImages: [{ type: String }], // Array of image URLs or paths
    rating: {
      type: Number,
      min: [0, "Rating must be between 0 and 5"],
      max: [5, "Rating must be between 0 and 5"],
    }, // Assuming a 5-star rating system
  },
  { timestamps: true }
);

const RatingReview =
  mongoose.models.RatingReview ||
  mongoose.model("RatingReview", ratingReviewSchema, "ratingsReviews");
export default RatingReview;
