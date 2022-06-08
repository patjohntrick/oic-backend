const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Model
const User = require("./model/User");
const MoneyDonation = require("./model/MoneyDonation");
const OtherDonation = require("./model/OtherDonation");
const Activities = require("./model/ActivitiesModel");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const UserRouter = require("./routes/UserRoutes");
const MoneyDonationRouter = require("./routes/DonateRoutes/MoneyDonationRoutes");
const OtherDonationRouter = require("./routes/DonateRoutes/OtherDonationRoutes");
const ActivitiesRouter = require("./routes/Activities/ActivitiesRoutes");

// Routes middleware
app.use("/user", UserRouter);
app.use("/donation", MoneyDonationRouter);
app.use("/donation", OtherDonationRouter);
app.use("/activity", ActivitiesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is listening to port ${PORT}`));