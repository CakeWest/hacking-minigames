const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AIGameSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  state: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  failCount: {
    type: Number,
    required: true
  },
  countdownStart: {
    type: Number,
    required: true
  },
  countdownDuration: {
    type: Number,
    required: true
  },
  callbackIndex: {
    type: Number,
    required: true
  },
  roundIndex: {
    type: Number,
    required: true
  },
  targetFrequency: {
    type: Number,
    required: true
  },
  rounds: {
    type: Array,
    required: true
  }
});

module.exports = AIGame = mongoose.model("game", AIGameSchema);
