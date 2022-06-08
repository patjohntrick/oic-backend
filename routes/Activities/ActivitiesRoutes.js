const express = require("express");
const router = express.Router();

// model
const Activity = require("../../model/ActivitiesModel");

// GET
router.get("/", async (req, res) => {
  try {
    const activity = await Activity.find();
    res.status(200).json(activity);
  } catch (error) {
    res.status(404).json({ status: 404, message: "can't found activity." });
    console.log(error.message);
  }
});

// POST
router.post("/post", async (req, res) => {
  try {
    const newActivity = {
      title: req.body.title,
      description: req.body.description,
      time: req.body.time,
      date: req.body.date,
      attendee: req.body.attendee,
      done: false,
    };
    const activity = await new Activity(newActivity);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: 400, message: "can't add a   ctivity" });
  }
});

// PUT
router.put("/put/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id);
    activity.title = req.body.title;
    activity.description = req.body.description;
    activity.time = req.body.time;
    activity.date = req.body.date;
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: 400, message: "can't edit activity" });
  }
});
// done activity
router.get("/done/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id);
    activity.done = !activity.done;
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: 400, message: "can't done activity" });
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    res.status(201).json(activity);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: 400, message: "can't delete user" });
  }
});

module.exports = router;
