const express = require("express");
const api = require("./api");

const server = express();

// Parse incoming post request
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// setup api routes
server.use("/api", api);

module.exports = server;
