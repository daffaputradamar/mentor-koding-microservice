const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const User = require("./models/User");
const verifyToken = require("./config/verifyToken");

const authRoutes = require("./routes/authentication");

require("./config/db");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

app.use(cors());
app.use(express.json());

const path = "/graphql";

app.use("/", authRoutes);

app.get("/users", (req, res) => {
  User.find().then(users => res.json(users));
});

// app.use(verifyToken);
server.applyMiddleware({ app, path });

app.listen(3000, () => console.log("App listening in port 3000"));
