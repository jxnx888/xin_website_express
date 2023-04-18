require("dotenv").config();
const express = require('express');
const openAI = express.Router();

const {generateText, generateChatCompletions, trainModel} = require('../utils/openai/openai')

openAI.get('/openai', function (req, res, next) {
  res.render('index', {title: `Express`, content: `App listening on port ${process.env.PORT || '3000'}`});
});
openAI.get('/openai/training', function (req, res, next) {
  try {
    const data = trainModel()
    res.render('index', {title: `Express`, content: data});
  } catch (err) {

  }
  res.render('index', {title: `Express`, content: `App listening on port ${process.env.PORT || '3000'}`});
});
openAI.post('/openai/completions/conversition', async (req, res) => {
  const input = req.body.input
  try {
    const data = await generateText(input, 'text-davinci-003');
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(403).json(data)
    }
  } catch (err) {
    res.status(403).json(err)
  }
})
openAI.post('/openai/chat/completions/conversition', async (req, res) => {
  const input = req.body.input
  try {
    // const data = await generateText(input, 'text-davinci-003');
    const data = await generateChatCompletions(input, 'gpt-3.5-turbo');
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(403).json(data.message)
    }
  } catch (err) {
    res.status(403).json(err.message)
  }
})

module.exports = openAI;
