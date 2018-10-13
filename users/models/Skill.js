const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const SkillSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Skill", SkillSchema);
