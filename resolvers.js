const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { AuthenticationError } = require("apollo-server-express");

const User = require("./models/User");
const Skill = require("./models/Skill");

const resolvers = {
  Query: {
    allSkills: async (root, args, token) => {
      if (token.token !== "") {
        const response = await axios.get(
          "https://trendyskills.com/service?q=keywords&key=z738YCPEjn4eySf9"
        );
        console.log(response.data);
        return response.data.keywords;
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    users: async (root, args, token) => {
      if (token.token !== "") {
        return await User.find(
          {},
          `
          username
          name
          profilePic
          email
          headline
          address
          phone
          job
          isMentor
          socialMedia
          `
        );
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    user: async (root, _id, token) => {
      if (token.token !== "") {
        return await User.findById(_id);
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    skill: async (root, args, token) => {
      if (token.token !== "") {
        return await Skill.find({ userId: args.userId });
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    skills: async (root, args, token) => {
      if (token.token !== "") {
        return await Skill.find();
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    search: async (root, args, token) => {
      if (token.token !== "") {
        let skills = await Skill.find({ skill: args.skill })
          .populate("userId")
          .limit(100)
          .sort("-percentage");
        return skills;
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    }
  },
  Mutation: {
    createUser: async (root, args, token) => {
      let newUser = args.user;
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      return await User.create(newUser);
    },
    login: async (root, args, token) => {
      const loginUser = {
        username: args.username,
        password: args.password
      };
      let user = await User.findOne({
        username: loginUser.username
      });

      if (!user) {
        return res.sendStatus(403);
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
        return "Login attempted failed";
      }
    },
    deleteUser: async (root, _id, token) => {
      if (token.token !== "") {
        const authData = await jwt.verify(token.token, "mentorkodingpw");
        return await User.findByIdAndRemove(authData._id);
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    updateUser: async (root, args, token) => {
      if (token.token !== "") {
        const authData = await jwt.verify(token.token, "mentorkodingpw");
        let user = await User.findById(authData._id);
        return await user.update({
          username: args.user.username || user.username,
          name: args.user.name || user.name,
          profilePic: args.user.profilePic || user.profilePic,
          email: args.user.email || user.email,
          headline: args.user.headline || user.headline,
          address: args.user.address || user.address,
          phone: args.user.phone || user.phone,
          job: args.user.job || user.job,
          socialMedia: {
            github: args.user.socialMedia.github || user.github,
            linkedin: args.user.socialMedia.linkedin || user.linkedin,
            facebook: args.user.socialMedia.facebook || user.facebook,
            instagram: args.user.socialMedia.instagram || user.instagram
          }
        });
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    changeMentor: async (root, args, token) => {
      if (token.token !== "") {
        const authData = await jwt.verify(token.token, "mentorkodingpw");
        let user = await User.findById(authData._id);
        return await user.update({
          isMentor: !user.isMentor
        });
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    addSkill: async (root, args, token) => {
      if (token.token !== "") {
        const authData = await jwt.verify(token.token, "mentorkodingpw");
        return await Skill.create({
          userId: authData._id,
          skill: args.skill,
          percentage: args.percentage
        });
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    },
    removeSkill: async (root, args, token) => {
      if (token.token !== "") {
        const authData = await jwt.verify(token.token, "mentorkodingpw");
        return await Skill.remove({
          userId: authData._id,
          skill: args.skill
        });
      } else {
        throw new AuthenticationError("Must Authenticate");
      }
    }
  }
};

module.exports = resolvers;
