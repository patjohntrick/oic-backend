const express = require("express");
const router = express.Router();

// Model
const MoneyDonation = require("../../model/MoneyDonation");

// GET
// get all money donation
router.get("/money", async (req, res) => {
  const moneyDonation = await MoneyDonation.find();

  try {
    res.status(200).json(moneyDonation);
  } catch (error) {
    res.status(404).json({ status: 404 });
    console.log(error.message);
  }
});

// get specific money donation
router.get("/money/:id", async (req, res) => {
  const moneyDonation = await MoneyDonation.findById(req.params.id);

  try {
    res.status(200).json(moneyDonation);
  } catch (error) {
    res.status(400).json({ message: "can't get money donation", status: 400 });
    console.error(error.message);
  }
});

// POST
// create money donation
router.post("/money/post", async (req, res) => {
  const moneyDonation = new MoneyDonation({
    name: req.body.name,
    amount: req.body.amount,
    number: req.body.number,
    residence: req.body.residence,
  });

  try {
    const newMoneyDonation = await moneyDonation.save();
    res.status(201).json(newMoneyDonation);
  } catch (error) {
    res
      .status(400)
      .json({ message: "can't create money donation", status: 400 });
    console.error(error.message);
  }
});

// DELETE
// delete money donation
router.delete("/money/delete/:id", async (req, res) => {
  try {
    const deletedMoneyDonation = await MoneyDonation.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(deletedMoneyDonation);
  } catch (error) {
    res
      .status(400)
      .json({ message: "can't delete money donation", status: 400 });
    console.error(error.message);
  }
});

module.exports = router;
