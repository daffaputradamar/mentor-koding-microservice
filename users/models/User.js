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
    required: true
  },
  email: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
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
    required: true
  },
  isMentor: {
    type: Boolean,
    required: true
  },
  socialMedia: {
    github: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: true
    },
    facebook: {
      type: String,
      required: true
    },
    instagram: {
      type: String,
      required: true
    }
  },
  skills: [
    {
      skill: {
        type: String,
        required: true
      },
      precentage: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
