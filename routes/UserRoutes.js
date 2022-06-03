const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

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
// query user
// router.get("/search/:search", async (req, res) => {
//   try {
//     const name = await User.find({ name: req.params.search });
//     const ministry = await User.find({ name: req.params.search });
//     res.status(200).json(name);
//   } catch (error) {
//     res.status(400).json({ message: "can't get user", status: 400 });
//     console.error(error.message);
//   }
// });

// // another query
// router.get("/search", async (req, res) => {
//   try {
//     const query = req.query.query;
//     res.json({ query });
//     console.log(req.query);
//   } catch (error) {
//     res.status(400).json({ message: "can't get user", status: 400 });
//     console.error(error.message);
//   }
// });

// router.get("/:name", async (req, res) => {
//   const user = await User.find(req.params.name);

//   try {
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ message: "can't get user", status: 400 });
//     console.error(error.message);
//   }
// });

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
