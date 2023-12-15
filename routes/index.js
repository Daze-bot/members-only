const express = require('express');
const router = express.Router();
const index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', index_controller.index);

router.get('/new-message', index_controller.new_message_get);
router.post('/new-message', index_controller.new_message_post);

router.get('/all-messages', index_controller.all_messages);

router.get('/member-request', index_controller.member_request_get);
router.post('/member-request', index_controller.member_request_post);

module.exports = router;
