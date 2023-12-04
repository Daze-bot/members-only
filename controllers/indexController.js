const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  res.render('index', {
    block_content: 'home',
    title: 'Members Only',
    user: res.locals.currentUser,
  });
});
