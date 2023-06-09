const pkg = require('../package.json')

const applicationName = pkg.name
const mongodbConfig = {
  uri: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_PATH}/?retryWrites=true&w=majority`,
  dbName: 'xin_website'
}

module.exports={
  applicationName,
  mongodbConfig
}
