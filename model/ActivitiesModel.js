const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App is connected to the activity DB collection ");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

const activitiesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowerase: true,
    },
    description: {
      type: String,
      required: true,
      lowerase: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    attendee: {
      type: String,
      required: true,
      lowercase: true,
    },
    done: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Activities = mongoose.model("Activities", activitiesSchema);

module.exports = Activities;
