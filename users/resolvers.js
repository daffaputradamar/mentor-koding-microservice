const User = require("./models/User");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (root, _id) => {
      console.log(_id);
      return await User.findById(_id);
    }
  }
};

module.exports = resolvers;
