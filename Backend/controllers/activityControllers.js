const Activity = require("../models/activityModel");

exports.addActivity = async (req, res) => {
  try {
        if (
      !(
        req.body.title &&
        req.body.description &&
        req.body.skills
      )
    ) {
      return res
        .status(404)
        .json({ status: "Invalid details", data: req.body });
    }
    const newActivity = await Activity.create({
      title: req.body.title,
      description: req.body.description,
      ownerId: req.user.id,
      skills: req.body.skills,
    });
    if (!newActivity) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({
      status: "success",
      data: {
        newActivity,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "error", data: { err } });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    
    const strictIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!req.params.id || !strictIdRegex.test(req.params.id)) {
      return res.status(404).json({ status: "Invalid id", data: {} });
    }
const id=req.params.id;
const userId=req.user.id;
    const doc = await Activity.findById(id);
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    console.log(doc.ownerId, userId);
    
    if (doc.ownerId != userId) {
      return res.status(404).json({ status: "Not authorized", data: {} });
    }
    if (!req.body.title&&!req.body.description &&!req.body.skills) {
      return res.status(404).json({ status: "Missing title", data: {} });
    }

    const newActivity = await Activity.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
      skills: req.body.skills,
      ownerId: req.user.id,

    },
  {
    new :true,
    runValidators: true,
  });
    if (!newActivity) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({
      status: "success",
      data: {
        newActivity,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const strictIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!req.params.id || !strictIdRegex.test(req.params.id)) {
      return res.status(404).json({ status: "Invalid id", data: {} });
    }
    const id=req.params.id;
const userId=req.user.id;
    let doc = await Activity.findById(id);
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    console.log(doc.ownerId, userId);
    if (doc.ownerId != userId) {
      return res.status(404).json({ status: "Not authorized", data: {} });
    }
     doc = await Activity.deleteOne({ _id: id });
    if (doc.deletedCount === 0) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "Deleted", data: { doc } });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};

exports.getallActivity = async (req, res) => {
  try {
    const id = req.user.id;
    const doc = await Activity.find({ ownerId: { $ne: id } });
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "success", data:  doc  });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};

exports.getownedActivity = async (req, res) => {
  try {
    const id = req.user.id;
    const doc = await Activity.find({ ownerId: { $eq: id } });
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "success", data:  doc  });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};

exports.getActivity = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ status: "Missing id", data: {} });
    }
    const strictIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!strictIdRegex.test(req.params.id)) {
      return res.status(404).json({ status: "Invalid id", data: {} });
    }
    const id = req.params.id;
    const doc = await Activity.findById(id);
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "success", data:  doc  });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};
