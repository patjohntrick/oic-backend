const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    console.log(`App is connected to the other donation DB collection`)
  );

const otherDonationSchema = mongoose.Schema(
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
    offer: {
      type: String,
      required: true,
      lowercase: true,
    },
    createdAt: String,
    updatedAt: String,
  },
  {
    timestamps: true,
  }
);

const OtherDonation = mongoose.model("OtherDonation", otherDonationSchema);

module.exports = OtherDonation;
