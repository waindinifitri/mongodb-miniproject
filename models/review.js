const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    review: {
      type: Text,
      lowercase: true,
      trim: true,
    },
    rating: {
      type: Integer,
      min: 0,
      max: 10,
      isNumeric: true,
    },
    review: [{ type: Schema.Types.ObjectId, ref: "Review", default: null }],
  },
  { timestamps: true, versionKey: false }
);

const review = mongoose.model("Review", reviewSchema);

exports.Review = review;