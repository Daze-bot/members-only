const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, maxLength: 25 },
  username_lower: { type: String, required: true },
  password: { type: String, required: true, minLength: 8 },
  status: { type: String, required: true, default: "Guest" },
  admin: { type:  Boolean, required: true, default: false },
}, { timestamps: true });

UserSchema.virtual("url").get(function () {
  return `/users/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
