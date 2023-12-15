const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  const recentMessages = await Message.find().populate("user").sort({ dateAdded: -1 }).limit(40).exec();
  const messageCount = await Message.find().count().exec();

  res.render('index', {
    block_content: 'home',
    nav_content: 'index_nav',
    title: 'Members Only',
    user: res.locals.currentUser,
    messages: recentMessages,
    count: messageCount,
  });
});

exports.new_message_get = asyncHandler(async (req, res, next) => {
  res.render('index', {
    block_content: 'new_message',
    nav_content: 'user_nav',
    title: "Create New Message",
    user: res.locals.currentUser,
    errors: undefined,
    message_title: "",
    user_message: "",
  });
});

exports.new_message_post = [
  body('messageTitle', "Title must not be empty")
    .trim()
    .isLength({ min: 1 }),
  body('userMessage', "Message must not be empty")
    .trim()
    .isLength({ min: 1 }),
  body('messageTitle', "Title can not be more than 60 characters")
    .trim()
    .isLength({ max: 60 }),
  body('userMessage', "Message can not be more than 1400 characters")
    .trim()
    .isLength({ max: 1400 }),

  asyncHandler(async (req, res, next) => {
    const errors = [];

    const message = new Message({
      title: req.body.messageTitle,
      text: req.body.userMessage,
      user: res.locals.currentUser,
    });

    const validationErrors = validationResult(req).array();
    validationErrors.forEach(err => {
      errors.push(err.msg);
    });

    if (errors.length > 0) {
      res.render('index', {
        block_content: 'new_message',
        nav_content: 'user_nav',
        title: "Create New Message",
        user: res.locals.currentUser,
        errors: errors,
        message_title: message.title,
        user_message: message.text,
      });
      return;
    } else {
      await message.save();
      res.redirect('/');
    }
  }),
];

exports.all_messages = asyncHandler(async (req, res, next) => {
  res.send("Not Yet Implemented");
});

exports.member_request_get = asyncHandler(async (req, res, next) => {
  res.send("Not Yet Implemented");
});

exports.member_request_post = asyncHandler(async (req, res, next) => {
  res.send("Not Yet Implemented");
});
