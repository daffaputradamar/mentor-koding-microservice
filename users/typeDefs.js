const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Skill {
    skill: String
    precentage: Int
  }

  type SocialMedia {
    github: String
    linkedin: String
    facebook: String
    instagram: String
  }

  type User {
    _id: ID
    username: String
    name: String
    password: String
    profilePic: String
    email: String
    headline: String
    address: String
    phone: String
    job: String
    isMentor: Boolean
    socialMedia: SocialMedia
    skills: [Skill]
  }

  type Query {
    users: [User]
    user(_id: ID!): User
  }
`;

module.exports = typeDefs;
