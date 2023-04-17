require("dotenv").config();
const {Configuration, OpenAIApi, Training} = require('openai')
const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function generateText(prompt, model = 'text-davinci-003') {
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.createCompletion({
      model,
      prompt,
    });
    return response.data.choices[0].text.trim();
  } catch (err) {
    console.log(err.message);
    return err
  }

}

async function translateText(text, sourceLanguage, targetLanguage, model = 'davinci') {
  const response = await openai.Translation.create({
    engine: models[model],
    text,
    source_language: sourceLanguage,
    target_language: targetLanguage,
  });
  return response.data.translations[0].translated_text.trim();
}

const trainingTask = async (trainFile) => {
  const trainingData = await openai.training.create({
    model: "text-davinci-002",
    data: {
      file: trainFile
    },
    description: "My personal website trainning task"
  })
  console.log('trainingData', trainingData)

  //调用 openai.modelVersions.list() 方法来查看新模型版本的列表，并获取新模型版本的 ID：
  const modelVersions = await openai.modelVersions.list({model: {id: "text-davinci-002"}})
  const modelVersionId = modelVersions.data[0].id
  //调用 openai.modelEndpoints.create() 方法来创建一个新的模型终端：
  const modelEndpoint = await openai.modelEndpoints.create({
    model: {id: "text-davinci-002"},
    model_version: {id: modelVersionId},
    description: "My new model endpoint"
  })
}
async function trainModel(prompt, examples, model) {
  const trainingData = {
    model: model,
    prompt: prompt,
    examples: examples,
  };

  const trainingTask = new Training(trainingData);

  const trainingResult = await openai.Training.create(trainingTask);
  console.log(trainingResult);
  return trainingResult;
}
module.exports = {
  generateText,
  translateText,
  trainModel
};
