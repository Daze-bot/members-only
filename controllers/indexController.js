const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const User = require('../models/user');
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
    nav_content: 'index_nav',
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
        nav_content: 'index_nav',
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
  const allMessages = await Message.find().populate("user").sort({ dateAdded: -1 }).exec();

  res.render('index', {
    block_content: 'all_messages',
    nav_content: 'index_nav',
    title: 'All Messages',
    user: res.locals.currentUser,
    messages: allMessages,
  });
});

exports.member_request_get = asyncHandler(async (req, res, next) => {
  res.render('index', {
    block_content: 'member-request',
    nav_content: 'index_nav',
    title: "Member Request",
    errors: undefined,
    user: res.locals.currentUser,
  });
});

exports.member_request_post = [
  body('memberCode', "Incorrect Code")
    .trim()
    .custom(value => {
      if (value.toLowerCase() === "pizza") {
        return true;
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = [];

    const activeUser = await User.findById(res.locals.currentUser._id);

    const validationErrors = validationResult(req).array();
    validationErrors.forEach(err => {
      errors.push(err.msg);
    });

    if (errors.length > 0) {
      res.render('index', {
        block_content: 'member-request',
        nav_content: 'index_nav',
        title: "Member Request",
        errors: errors,
        user: res.locals.currentUser,
      });
      return;
    } else {
      activeUser.status = "Member";
      await activeUser.save();
      res.redirect('/');
    }
  }),
];

exports.edit_message_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).populate("user").exec();

  if (message === null) {
    const err = new Error("Message not found");
    err.status = 404;
    return next(err);
  }

  res.render('index', {
    block_content: 'edit_message',
    nav_content: 'index_nav',
    title: "Edit Message",
    message: message,
    user: res.locals.currentUser,
    errors: undefined
  });
});

exports.edit_message_post = [
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

    const updatedMessage = new Message({
      title: req.body.messageTitle,
      text: req.body.userMessage,
      user: req.body.messageUser,
      _id: req.params.id,
    });

    const validationErrors = validationResult(req).array();
    validationErrors.forEach(err => {
      errors.push(err.msg);
    });

    if (errors.length > 0) {
      res.render('index', {
        block_content: 'edit_message',
        nav_content: 'index_nav',
        title: "Edit Message",
        message: updatedMessage,
        user: res.locals.currentUser,
        errors: errors
      });
      return;
    } else {
      await Message.findByIdAndUpdate(req.params.id, updatedMessage, {});
      res.redirect('/');
    }
  }),
];

exports.delete_message_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).populate("user").exec();

  if (message === null) {
    res.redirect('/');
  }

  res.render('index', {
    block_content: 'delete_message',
    nav_content: 'index_nav',
    title: "Delete Message",
    message: message,
    user: res.locals.currentUser,
  })
});

exports.delete_message_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.body.messageID);
  res.redirect('/');
});

