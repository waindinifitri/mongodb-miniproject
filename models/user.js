const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

// hashing password
const { encryptPassword } = require("../helpers/bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 4,
      trim: true,
      uniqueCaseInsensitive: true,
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password minimum eight characters, at least one letter and one number",
      ],
    },
    review: [{ type: Schema.Types.ObjectId, ref: "Review", default: null }],
  },
  { timestamps: true, versionKey: false }
);

// pre, post hooks
userSchema.pre("save", async function (next) {
  let user = this;

  if (user.password && user.isModified("password")) {
    user.password = await encryptPassword(user.password);
  }
  next();
});

// unique validator
userSchema.plugin(uniqueValidator);

const user = mongoose.model("User", studentSchema);

exports.User = user;
