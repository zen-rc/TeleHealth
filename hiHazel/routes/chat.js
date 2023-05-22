const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");
const { ensureAuth } = require("../middleware/auth"); //do i need this? I wish I knew.


router.get("/getChat/:userName", ensureAuth, chatController.getChat); // to get to the chat you need the username.
router.get("/startChat", ensureAuth, chatController.startChat);

module.exports = router;