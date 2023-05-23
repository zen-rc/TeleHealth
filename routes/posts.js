const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.put("/:id", ensureAuth, postsController.updatePost); //had ? after ID

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/updatePost/:id", postsController.updatePost);

router.delete("/deletePost/:id", postsController.deletePost);

router.get("/edit/:id", postsController.getEdit); //had a question mark after ID

router.put("/edit/:id", postsController.editPost); //had ? after ID



module.exports = router;
