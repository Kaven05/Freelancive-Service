const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/create', chatController.createChatRoom);
router.get('/:roomId/messages', chatController.getMessages);
