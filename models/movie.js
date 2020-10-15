const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
    },
    year: {
      type: Integer,
      isNumeric: true,
    },
    imageMovie: {
      type: String,
      default:
        "https://res.cloudinary.com/waindinifitri/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png",
    },
    user: [{ type: Schema.Types.ObjectId, ref: "User", default: null }],
  },
  { timestamps: true, versionKey: false }
);

const movie = mongoose.model("Movie", movieSchema);

exports.Movie = movie;
