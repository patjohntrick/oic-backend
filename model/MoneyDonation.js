const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    console.log(`App is connected to the money donation DB collection`)
  );

const moneyDonationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    number: {
      type: String,
      required: true,
    },
    residence: {
      type: String,
      required: true,
      lowercase: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    createdAt: String,
    updatedAt: String,
  },
  {
    timestamps: true,
  }
);

const MoneyDonation = mongoose.model("MoneyDonation", moneyDonationSchema);

module.exports = MoneyDonation;
