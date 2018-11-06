const User = require("../models/User");
const bcrypt = require("bcryptjs");

function createHash(password) {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    resolve(hash);
  });
}

function isPasswordMatch(hashedPassword, password) {
  return new Promise(async (resolve, reject) => {
    isMatch = await bcrypt.compare(hashedPassword, password);
    resolve(isMatch);
  });
}

module.exports = {
  index: async (req, res) => {
    res.json(await User.find());
  },
  show: async (req, res) => {
    res.json(await User.findById(req.params._id));
  },
  store: async (req, res) => {
    let { user } = req.body;
    user.password = await createHash(user.password);
    res.json(await User.create(user));
  },
  update: async (req, res) => {
    const { user } = req.body;
    const { _id } = req.params;
    res.json(await User.findOneAndUpdate({ _id }, { $set: user }));
  },
  destroy: async (req, res) => {
    res.json(await User.findOneAndDelete({ _id: req.params._id }));
  },
  authenticate: async (req, res) => {
    let { user } = req.body;
    userFromDb = await User.findOne({ username: user.username });
    res.json(
      (await isPasswordMatch(userFromDb.password, user.password)) ? true : false
    );
  }
};
