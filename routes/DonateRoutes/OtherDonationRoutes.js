const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

// Model
const OtherDonation = require("../../model/OtherDonation");

// GET
// get all other donation
router.get("/other", async (req, res) => {
  const otherDonation = await OtherDonation.find();

  try {
    res.status(200).json(otherDonation);
  } catch (error) {
    res.status(404).json({ status: 404 });
    console.log(error.message);
  }
});

// get specific other donation
router.get("/other/:id", async (req, res) => {
  const otherDonation = await OtherDonation.findById(req.params.id);

  try {
    res.status(200).json(otherDonation);
  } catch (error) {
    res.status(400).json({ message: "can't get other donation", status: 400 });
    console.error(error.message);
  }
});

// POST
// create other donation
router.post("/other/post", async (req, res) => {
  const otherDonation = new OtherDonation({
    name: req.body.name,
    amount: req.body.amount,
    number: req.body.number,
    residence: req.body.residence,
  });

  try {
    const newOtherDonation = await otherDonation.save();
    res.status(201).json(newOtherDonation);
  } catch (error) {
    res
      .status(400)
      .json({ message: "can't create other donation", status: 400 });
    console.error(error.message);
  }
});

// DELETE
// delete other donation
router.delete("/other/delete/:id", async (req, res) => {
  try {
    const deletedOtherDonation = await OtherDonation.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(deletedOtherDonation);
  } catch (error) {
    res
      .status(400)
      .json({ message: "can't delete other donation", status: 400 });
    console.error(error.message);
  }
});

module.exports = router;
