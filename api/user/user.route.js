const express = require("express");
const { createUser, removeUser } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.delete("/:id", removeUser);

module.exports = userRouter;
