require("dotenv").config();
const express = require('express');
const indexRouter = express.Router();
const {port} = require('../utils')
const openAIRouter = require('./openAI/openai')
const mongoDBRouter = require('./mongodb')
const userRouter = require('./user')


indexRouter.get('/', (req, res) => {
  const result = `Server listening on the port::${port}. http://localhost:3000`
  console.log(result);
  res.send(result);
});

module.exports = {
  indexRouter,
  openAIRouter,
  mongoDBRouter,
  userRouter
};
