const express = require("express");
const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers");
const router = express.Router();

router.post("/signin", userControllers.signIn);
router.post("/signup", userControllers.signUp);
router.get("/", authControllers.protect,userControllers.getUser);
router.get("/:id", authControllers.protect,userControllers.getspecificUser);
router.patch("/",authControllers.protect, userControllers.updateUser);
router.get("/getall", userControllers.getallUser);

module.exports = router;