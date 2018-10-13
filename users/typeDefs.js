const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Skill {
    userId: String
    skill: String
    percentage: Int
  }

  input SkillInput {
    userId: String!
    skill: String!
    percentage: Int!
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
    isMentor: Boolean
    socialMedia: SocialMediaInput
  }

  input UserUpdate {
    username: String
    name: String
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
    skill(userId: ID!): [Skill]
    skills: [Skill]
  }

  type Mutation {
    addUser(user: UserInput!): User
    deleteUser(_id: ID!): User
    updateUser(_id: ID!, user: UserUpdate!): User
    changeMentor(_id: ID!): User
    addSkill(userId: ID!, skill: String!, percentage: Int!): Skill
    removeSkill(userId: ID!, skill: String!): Skill
  }
`;

module.exports = typeDefs;
