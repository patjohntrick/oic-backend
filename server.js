const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Model
const User = require("./model/User");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // query user
// app.get("/search", async (req, res) => {
//   try {
//     // const query = await User.find({ name: req.query.q });

//     // res.status(200).res.json(query);
//     // res.json({ query: req.query.query });
//     console.log(req.query);
//   } catch (error) {
//     res.status(400).json({ message: "can't get user", status: 400 });
//     console.error(error.message);
//   }
// });

// Routes
const UserRouter = require("./routes/UserRoutes");

app.use("/user", UserRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is listening to port ${PORT}`));
