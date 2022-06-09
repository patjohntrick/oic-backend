const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

// Model
const User = require("../model/User");

// GET
// get all user
router.get("/", async (req, res) => {
  const user = await User.find();

  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ status: 404 });
    console.log(error.message);
  }
});
// get dashboard user
router.get("/dashboard", async (req, res) => {
  try {
    const user = await User.find();
    const limit = req.query.limit;
    const resultUser = user.slice(0, limit);
    res.status(200).json(resultUser);
  } catch (error) {
    res.status(404).json({ status: 404 });
    console.log(error.message);
  }
});
// get specific user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "can't get user", status: 400 });
    console.error(error.message);
  }
});

// POST
router.post("/add", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const validEmail = await User.findOne({ email: req.body.email });
    const newUser = {
      name: req.body.name,
      gender: req.body.gender,
      number: req.body.number,
      residence: req.body.residence,
      birthday: req.body.birthday,
      ministry: req.body.ministry,
      email: req.body.email,
      password: hashPassword,
    };
    if (validEmail == null) {
      const user = await User.create(newUser);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Email already exists", status: 400 });
    }
  } catch (error) {
    res.status(400).json({ message: "can't create new user", status: 400 });
    console.log(error.message);
  }
});
// add money donation
router.post("/:id/moneydonation", async (req, res) => {
  try {
    const moneyDonation = {
      uuid: uuid.v1(),
      name: req.body.name,
      number: req.body.number,
      residence: req.body.residence,
      createdAt: req.body.date,
      amount: req.body.amount,
    };
    const { id } = req.params;
    const user = await User.findById(id);
    user.moneydonation.push(moneyDonation);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: 400, message: "can't add money donation" });
  }
});
// add other donation
router.post("/:id/otherdonation", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    // date
    const otherDonation = {
      uuid: uuid.v1(),
      name: req.body.name,
      number: req.body.number,
      residence: req.body.residence,
      createdAt: req.body.date,
      offer: req.body.offer,
    };
    user.otherdonation.push(otherDonation);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: 400, message: "can't add other donation" });
  }
});

// PUT
router.put("/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.name = req.body.name;
    user.gender = req.body.gender;
    user.residence = req.body.residence;
    user.birthday = req.body.birthday;
    user.email = req.body.email;
    user.ministry = req.body.ministry;
    // user.password = req.body.password;
    user.number = req.body.number;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "can't edit user", status: 400 });
    console.log(error.message);
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "can't delete user", status: 400 });
    console.log(error.message);
  }
});

module.exports = router;
