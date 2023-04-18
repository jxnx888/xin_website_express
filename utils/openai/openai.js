require("dotenv").config();
const {Configuration, OpenAIApi, Training} = require('openai')
const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const onErrorHandler = (err) => {
  err.config.headers['Authorization'] = '**********'
  err.config.headers['OpenAI-Organization'] = '**********'
  return err
}

async function generateText(prompt, model = 'text-davinci-003', max_tokens=500) {
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.createCompletion({
      model,
      prompt,
      max_tokens
    });
    return response.data.choices[0].text.trim();
  } catch (err) {
    console.log(err.message);
    return onErrorHandler(err)
  }
}

async function generateChatCompletions(prompt, model = 'gpt-3.5-turbo',max_tokens=500) {
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    // const response = await openai.createCompletion({
    const response = await openai.createChatCompletion({
      model,
      messages: [{role: "user", content: prompt}],
      max_tokens
    });
    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.log(err.message);
    return onErrorHandler(err)
  }
}

async function trainModel() {
  try {
    return await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "I am a highly intelligent question-answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery or has no clear answer, I will respond with \"Unknown\".\n\nQ: Who are you?\nA: I am ChatXN, the son of the ChatGPT.\n\nQ: What XN means?\nA: XN refers to Xin Ning. He is a front-end development engineer with many years of work experience. Xin is good at JavaScript, Jquery, React, Next.js, Node.js, Vue.js, HTML5 and CSS3.   \n\nQ: Who is Xin Ning?\nA: Xin Ning is a front-end development engineer with many years of work experience, good at JavaScript, Jquery, React, Next.js, Node.js, Vue.js, HTML5 and CSS3. Here, you can find Ning Xin's latest work, related technologies, and resume. If you need help with a project or technical problem, you can send an email to Ningxin, the email address is: ningxin1007@hotmail.com.\n\nQ: What is Xin's LinkedIn?\nA: https://www.linkedin.com/in/xinning1007\n\nQ:  What is Xin's Social Media?\nA: LinkedIn:  https://www.linkedin.com/in/xinning1007    Facebook: https://www.facebook.com/jxnx888    \n ",
    })
  } catch (err) {
    console.log(err.message);
    return onErrorHandler(err)
  }
}

module.exports = {
  generateText,
  generateChatCompletions,
  trainModel
};
