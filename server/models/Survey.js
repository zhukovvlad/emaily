const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema = new Schema({
  tille: String,
  body: String,
  subject: String,
  recipients: [String],
});

mongoose.model("surveys", surveySchema);
