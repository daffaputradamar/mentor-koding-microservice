const User = require("./models/User");
const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    users: async () => {
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
        skills
        `
      );
    },
    user: async (root, _id) => {
      return await User.findById(_id);
    }
  },
  Mutation: {
    addUser: (root, args) => {
      let newUser = args.user;
      bcrypt
        .genSalt(10)
        .then(salt => {
          bcrypt.hash(newUser.password, salt).then(hash => {
            newUser.password = hash;
            console.log(newUser);
            User.create(newUser).then(user => user);
          });
        })
        .catch(err => err);
    },
    deleteUser: async (root, _id) => {
      return await User.findByIdAndRemove(_id);
    },
    updateUser: async (root, args) => {
      let user = await User.findById(args._id);
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
    },
    changeMentor: async (root, args) => {
      let user = await User.findById(args._id);
      return await user.update({
        isMentor: !user.isMentor
      });
    },
    addSkill: async (root, args) => {
      return await User.findByIdAndUpdate(args._id, {
        $push: { skills: args.skill }
      });
    },
    removeSkill: async (root, args) => {
      console.log(args);
      return await User.findByIdAndUpdate(args._id, {
        $pullAll: { skills: [args.skill] }
      });
    }
  }
};

module.exports = resolvers;
