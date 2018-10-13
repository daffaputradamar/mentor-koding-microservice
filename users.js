const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const User = require("./models/User");
const Skill = require("./models/Skill");
const verifyToken = require("./config/verifyToken");

const authRoutes = require("./routes/authentication");

require("./config/db");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const context = require("./context");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

const app = express();

app.use(cors());
app.use(express.json());

const path = "/graphql";

// app.use("/", authRoutes);
app.get("/tes", async (req, res) => {
  let skills = await Skill.find({ skill: "Node Js" })
    // .populate("userId")
    .limit(100)
    .sort("-percentage");
  let search = {};
  console.log(skills);
  res.json(skills);
});

app.use(verifyToken);
server.applyMiddleware({ app, path });

app.listen(3000, () => console.log("Service User is listening"));
