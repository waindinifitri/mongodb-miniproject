const { User } = require("../models/user");

const { decryptPassword } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");

exports.Register = async (req, res, next) => {
  try {
    let data = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "Registration completed!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username: username });

    if (!user)
      return next({
        message: `User with username:${username} is not found!`,
      });

    if (decryptPassword(password, user.password)) {
      const token = tokenGenerator(user);

      res.status(200).json({
        success: true,
        message: "Successfully logged in!",
        token: token,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.GetAll = async (req, res, next) => {
  try {
    let users = await User.find().select("-password").populate({
      path: "review",
      populate: "users",
    });

    res.status(200).json({
      success: true,
      message: "Successfully retrieve the data!",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.Edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID Params" });

    const updatedData = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated!",
      data: updatedData,
    });
  } catch (err) {
    next(err);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next({ message: "Missing ID Params" });

    await User.findByIdAndRemove(id, (error, doc, result) => {
      if (error) throw "Failed to delete";
      if (!doc)
        return res.status(400).json({ success: false, err: "Data not found!" });

      res.status(200).json({
        success: true,
        message: "Successfully delete data!",
        data: doc,
      });
    });
  } catch (err) {
    next(err);
  }
};
