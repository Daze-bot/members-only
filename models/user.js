const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, maxLength: 25 },
  username_lower: { type: String, required: true },
  password: { type: String, required: true, minLength: 8 },
  status: [{ type: Schema.Types.ObjectId, ref: "Status" }],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
