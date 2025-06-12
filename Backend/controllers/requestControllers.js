const Request = require("../models/requestModel");
const Activity = require("../models/activityModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
exports.getAllRequestByOwner = async (req, res) => {
  try {
    const strictIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!req.params.id || !strictIdRegex.test(req.params.id)) {
      return res.status(404).json({ status: "Missing id", data: {} });
    }
    const id = req.params.id;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ status: "Invalid id", data: {} });
    }
    if (activity.ownerId != req.user.id) {
      return res.status(404).json({ status: "Not owner", data: {} });
    }
    const doc = await Request.find(
      { activityId: id },
      { userId: 1 ,_id:0}
    );
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "success", data:  doc  });
  } catch (error) {
    res.status(404).json({ status: "error", data: { error } });
  }
};

exports.addRequest = async (req, res) => {
  try {
    if (!req.body.activityId || !req.body.activityId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ status: "Invalid details", data: req.body });
    }
    
    const activityId=req.body.activityId;
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ status: "Invalid details", data: req.body });
    }
    if(activity.ownerId == req.user.id) {
      return res.status(404).json({ status: "Can't apply", data: req.body });
    }
    const newRequest = await Request.create({
      userId: req.user.id,
      activityId: activityId,
    });

    const email=await User.findById(activity.ownerId, { email: 1 });
    console.log("e:",email);
    const transporter= nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'ravenrox07@gmail.com',
            pass: 'kavin12345678'
          }
        });
        const mailOptions = {
          from: 'No Reply <ravenrox07@gmail.com>',
          to: email.email, 
          subject: 'New Job Application',
          data: {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            resume: formData.resume
          }
        };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.error(error);
      console.log('Email sent: ' + info.response);
    });

    if (!newRequest) {
      return res.status(404).json({ status: "Invalid" });
    }
 
    await Activity.findByIdAndUpdate(activityId, { $inc: { count: 1 } });
    
    res.status(201).json({
      status: "success",
      data: {
        newRequest,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};
