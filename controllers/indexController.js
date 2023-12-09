const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  res.render('index', {
    block_content: 'home',
    nav_content: 'index_nav',
    title: 'Members Only',
    user: res.locals.currentUser,
  });
});
