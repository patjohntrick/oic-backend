const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// model
const Admin = require("../../model/AdminModel");

// GET
router.get("/", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "can't found", status: 404 });
  }
});
// specific
router.get("/:id", async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "can't find admin", status: 404 });
  }
});

// POST
// register
router.post("/register", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const registerAdmin = {
      name: req.body.name,
      password: hashPassword,
    };
    const admin = await Admin.create(registerAdmin);
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "can't create", status: 400 });
  }
});
// login
router.post("/login", async (req, res) => {
  try {
    const adminName = await Admin.findOne({ name: req.body.name });
    console.log(adminName);
    if (!adminName) {
      res.status(409).json({ message: "name not found", status: 409 });
    }
    const validPass = await bcrypt.compare(
      adminName.password,
      req.body.password
    );
    console.log(validPass);
    if (validPass) {
      const token = jwt.sign(
        {
          name: adminName.name,
        },
        "sikretongmalupet"
      );
      res.status(201).json({ admin: token });
    } else {
      res.status(400).json({ message: "can't login", status: 400 });
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "user can't found", status: 404 });
  }
});

module.exports = router;
