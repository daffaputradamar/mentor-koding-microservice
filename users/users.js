const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const User = require("./models/User");

require("./config/db");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const path = "/graphql";

app.get("/", (req, res) => {
  User.create({
    username: "daffacoding",
    name: "Akbar",
    password: "inipassword",
    profilePic: "photo.png",
    email: "daffa@gmail.com",
    headline: "Isuk kuliah bengi ngoding",
    address: "Pasuruan",
    phone: "085755557954",
    job: "Backend developer",
    isMentor: true,
    socialMedia: {
      github: "daffa",
      linkedin: "daffa",
      facebook: "daffa",
      instagram: "daffa"
    },
    skills: [
      {
        skill: "NodeJS",
        percentage: 80
      },
      {
        skill: "ReactJS",
        percentage: 50
      }
    ]
  }).then(user => res.redirect("/graphql"));
});

app.get("/users", (req, res) => {
  User.find().then(users => res.json(users));
});

server.applyMiddleware({ app, path });

app.listen(3000, () => console.log("App listening in port 3000"));
