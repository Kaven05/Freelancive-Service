const express=require("express");
const router=express.Router()
const requestControllers=require('../controllers/requestControllers')
const authControllers= require('../controllers/authControllers')

router.post("/",authControllers.protect, requestControllers.addRequest);
router.get("/:id",authControllers.protect, requestControllers.getAllRequestByOwner);

module.exports =router;