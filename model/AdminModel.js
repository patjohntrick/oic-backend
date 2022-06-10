const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App is connected to the admin DB collection ");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

const adminLoginSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
    lowercase: true,
  },
});

const AdminLogin = mongoose.model("AdminLogin", adminLoginSchema);

module.exports = AdminLogin;
