const Request = require("../models/requestModel");
const Activity = require("../models/activityModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const { Resend } = require("resend");

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
    const doc = await Request.distinct("userId", {
      activityId: id,
    })
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "success", data: doc });
  } catch (error) {
    res.status(404).json({ status: "error", data: { error } });
  }
};

exports.addRequest = async (req, res) => {
  try {
    if (
      !req.body.activityId ||
      !req.body.activityId.match(/^[0-9a-fA-F]{24}$/)
    ) {
      return res
        .status(404)
        .json({ status: "Invalid details", data: req.body });
    }

    const activityId = req.body.activityId;
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res
        .status(404)
        .json({ status: "Invalid details", data: req.body });
    }
    if (activity.ownerId == req.user.id) {
      return res.status(404).json({ status: "Can't apply", data: req.body });
    }
    const newRequest = await Request.create({
      userId: req.user.id,
      activityId: activityId,
    });

    const email = await User.findById(activity.ownerId, { email: 1 });

    // const emailid=process.env.EMAILID;
    // const emailpass=process.env.EMAILPASS;
    // const transporter = nodemailer.createTransport({
    //  host: "send.api.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: emailid,
    //     pass: emailpass,
    //   }
    // });

    // console.log("To email:", email.email,req.body);

    // let info = await transporter.sendMail({
    //   from: 'info@mailtrap.com',
    //   to: '126014022@sastra.ac.in',
    //   subject: 'New Job Application',
    //     text: `New job application received!
    //   Name: ${req.body.name}
    //   Email: ${req.body.email}
    //   Message: ${req.body.message}
    //   Resume: ${req.body.resume || 'No resume provided'}`
    // });
    // console.log("Message sent: %s", info.messageId);

    // const resend = new Resend(process.env.RESEND_API_KEY);

    // const inf = await resend.emails.send({
    //   from: "Freelancive-service-frontend <onboarding@resend.dev>",
    //   to: '126014022@sastra.ac.in',
    //   subject: "New Job Application",
    //   html: `
    //     <h3>New Job Application</h3>
    //     <p><strong>Name:</strong> ${req.body.name}</p>
    //     <p><strong>Email:</strong> ${req.body.email}</p>
    //     <p><strong>Message:</strong> ${req.body.message}</p>
    //     <p><strong>Resume:</strong> ${req.body.resume || "No resume provided"}</p>
    //   `,
    // });
    // console.log("Message sent:", inf);
    // if (!newRequest) {
    //   return res.status(404).json({ status: "Invalid" });
    // }

    await Activity.findByIdAndUpdate(activityId, { $inc: { count: 1 } });

    res.status(201).json({
      status: "success",
      data: {
        newRequest,
      },
    });
  } catch (err) {
    console.error("Error in addRequest:", err);
    res.status(404).json({ status: "error", data: { err } });
  }
};
