const User = require("./models/User");

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
    addUser: async (root, args) => {
      return await User.create(args.user);
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
    }
  }
};

module.exports = resolvers;
