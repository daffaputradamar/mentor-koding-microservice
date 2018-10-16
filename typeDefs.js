const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
    skills: [String]
  }

  input UserInput {
    username: String!
    name: String!
    password: String!
    address: String!
    phone: String!
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
    skills: [String]
  }

  type SkillAPI {
    id: String
    keyName: String
  }

  type Query {
    skills: [SkillAPI]
    users: [User]
    myProfile: User
    user(_id: ID!): User
    search(skill: String): [User]
  }

  type Mutation {
    createUser(user: UserInput!): User
    login(username: String!, password: String!): String
    deleteUser: User
    updateUser(user: UserUpdate!): User
  }
`;

module.exports = typeDefs;
