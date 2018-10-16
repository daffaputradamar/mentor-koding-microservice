const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  headline: {
    type: String,
    default: null
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  job: {
    type: String,
    default: null
  },
  isMentor: {
    type: Boolean,
    default: false
  },
  socialMedia: {
    github: {
      type: String,
      default: null
    },
    linkedin: {
      type: String,
      default: null
    },
    facebook: {
      type: String,
      default: null
    },
    instagram: {
      type: String,
      default: null
    }
  },
  skills: {
    type: [String],
    default: null
  }
});

module.exports = mongoose.model("User", UserSchema);
