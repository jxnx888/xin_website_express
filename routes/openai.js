const express = require('express');
const openAI = express.Router();

const {generateText, translateText, trainModel} = require('../utils/openai/openai')

openAI.get('/openai', function (req, res, next) {
  res.render('index', {title: `Express`, content: `App listening on port ${process.env.PORT || '3000'}`});
});
openAI.post('/openai/chat/conversition', async (req, res) => {
  const input = req.body.input
  console.log('input', input)
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

module.exports = openAI;
