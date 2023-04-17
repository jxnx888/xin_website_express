const express = require('express');
const openAI = express.Router();

const {generateText, translateText }=require('../utils/openai')

openAI.get('/openai', function(req, res, next) {
  res.render('index', { title: `Express`, content:`App listening on port ${process.env.PORT || '3000'}` });
});
openAI.post('/openai/chat/conversition', async (req, res) => {
  const input = req.body.input
  console.log('input',input)
  const model = [
    "davinci",
    "text-davinci-002",
    "text-moderation-playground",
  ]
  const data = await generateText(input,model[0]);
  if(data){
    res.status(200).json(data)
  } else{
    res.status(403).json(data)
  }
})
module.exports = openAI;
