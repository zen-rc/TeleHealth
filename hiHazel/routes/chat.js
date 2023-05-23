const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");
const { ensureAuth } = require("../middleware/auth"); //do i need this? I wish I knew.

router.get("/getChat", ensureAuth, chatController.getChat); // to get to the chat you need the username.

module.exports = router