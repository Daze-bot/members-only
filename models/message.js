const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 60 },
  text: { type: String, required: true, maxLength: 1400 },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  dateAdded: { type: Date, default: Date.now },
}, { timestamps: true });

MessageSchema.virtual('formatDate').get(function () {
  return moment(this.dateAdded).format('MMM D, YYYY [at] h:mma');
});

MessageSchema.virtual('url').get(function () {
  return `/message/${this._id}`;
});

MessageSchema.virtual('editMessage').get(function () {
  return `/message/${this._id}/edit`;
});

MessageSchema.virtual('deleteMessage').get(function () {
  return `/message/${this._id}/delete`;
});

module.exports = mongoose.model("Message", MessageSchema);
