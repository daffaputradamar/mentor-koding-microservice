const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Skill {
    skill: String
    percentage: Int
  }

  input SkillInput {
    skill: String
    percentage: Int
  }

  type SocialMedia {
    github: String
    linkedin: String
    facebook: String
    instagram: String
  }

  input SocialMediaInput {
    github: String
    linkedin: String
    facebook: String
    instagram: String
  }

  type User {
    _id: ID
    username: String
    name: String
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

  input UserInput {
    username: String!
    name: String!
    password: String!
    profilePic: String!
    email: String!
    headline: String!
    address: String!
    phone: String!
    job: String!
    isMentor: Boolean!
    socialMedia: SocialMediaInput
    skills: [SkillInput]
  }

  input UserUpdate {
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
    socialMedia: SocialMediaInput
  }

  type Query {
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    addUser(user: UserInput!): User
    deleteUser(_id: ID!): User
    updateUser(_id: ID!, user: UserUpdate!): User
    changeMentor(_id: ID!): User
    addSkill(_id: ID!, skill: [SkillInput]!): User
  }
`;

module.exports = typeDefs;
