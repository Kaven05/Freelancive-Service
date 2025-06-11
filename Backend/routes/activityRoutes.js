const express = require("express");
const ActivityControllers = require("../controllers/activityControllers");
const authControllers= require('../controllers/authControllers')
const router = express.Router();

router.post("/",authControllers.protect, ActivityControllers.addActivity);
router.get("/myjobs",authControllers.protect, ActivityControllers.getownedActivity);
router.delete("/:id",authControllers.protect, ActivityControllers.deleteActivity);
router.get("/:id",authControllers.protect, ActivityControllers.getActivity);

router.get("/",authControllers.protect, ActivityControllers.getallActivity);
router.patch("/:id", authControllers.protect,ActivityControllers.updateActivity);

module.exports = router;