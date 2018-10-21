const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { AuthenticationError } = require("apollo-server-express");

const User = require("./models/User");

const resolvers = {
  Query: {
    skills: async (root, args) => {
        const response = await axios.get(
          "https://trendyskills.com/service?q=keywords&key=z738YCPEjn4eySf9"
        );
        return response.data.keywords;
    },
    users: async (root, args, context) => {
      if (context.data) {
        return await User.find();
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    myProfile: async (root, args, context) => {
      if (context.data) {
        return await User.findById(context.data);
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    user: async (root, _id, context) => {
      if (context.data) {
        return await User.findById(_id);
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    search: async (root, args, context) => {
      if (context.data) {
        return User.find({
          skills: args.skill
        });
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      let newUser = args.user;
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      return await User.create(newUser);
    },
    login: async (root, args) => {
      const loginUser = {
        username: args.username,
        password: args.password
      };
      let user = await User.findOne({
        username: loginUser.username
      });

      if (!user) {
        return "";
      }

      let isMatch = await bcrypt.compare(loginUser.password, user.password);

      if (isMatch) {
        return await jwt.sign(
          {
            _id: user._id
          },
          "mentorkodingpw",
          { expiresIn: "1d" }
        );
      } else {
        return "";
      }
    },
    deleteUser: async (root, args, context) => {
      if (context.data) {
        return await User.findByIdAndRemove(context.data);
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    updateUser: async (root, args, context) => {
      if (context.data) {
        let user = await User.findById(context.data);
        return await user.update({
          username: args.user.username || user.username,
          name: args.user.name || user.name,
          profilePic: args.user.profilePic || user.profilePic,
          email: args.user.email || user.email,
          description: args.user.description || user.description,
          address: args.user.address || user.address,
          phone: args.user.phone || user.phone,
          job: args.user.job || user.job,
          socialMedia: args.user.socialMedia || user.socialMedia,
          education: args.user.education || user.education,
          skills: args.user.skills || user.skills
        });
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    }
  }
};

module.exports = resolvers;
