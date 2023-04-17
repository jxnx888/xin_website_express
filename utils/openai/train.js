const openai = require('openai');
const API_KEY = process.env.OPENAI_API_KEY

// 设置API密钥
openai.api_key = API_KEY;

// 创建训练任务
openai.api.Train.create({
  model: 'text-davinci-002',
  documents: ['欢迎来到宁鑫的个人网站！宁鑫是一位具有多年工作经验的前端开发工程师，擅长JavaScript, Jquery, React, Next.js, Node.js, Vue.js, HTML5 and CSS3。在这里，您可以找到宁鑫的最新工作作品，相关技术，以及简历。如果您有项目或者技术问题需要帮助，可以给宁鑫发送邮件，邮件地址是：ningxin1007@hotmail.com。', ],
  n_epochs: 1,
  temperature: 0.5,
  max_tokens: 100,
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
