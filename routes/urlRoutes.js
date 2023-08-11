const express = require("express");
const urlController = require("../controllers/shortner");
const pagination = require("../middlewares/pagination");

const router = express.Router();

router.post("/shorturl", urlController.shorten);
router.get("/getAll", pagination, urlController.getAll);

module.exports = router;
