require("dotenv").config();
const {MongoClient, ServerApiVersion} = require('mongodb')
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_PATH}/?retryWrites=true&w=majority`;
const dbName = 'xin_website'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectMongoDB = async (collection) => {
  try {
    console.log('Start to connect to MongoDB')
    console.time('mongodb-connect')
    // Connect the client to the server	(optional starting in v4.7)
    await mongoClient.connect();

    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ping: 1});
    console.timeEnd('mongodb-connect')

    console.time(`Check mongodb database ${dbName}`)
    // Check database if exist dbNmae,
    // If you do not check the dbName and there is no dbName database, it will create the database for you automatically
    const ifExist = await isExistDB(dbName)

    if (!ifExist) {
      throw new Error(`Database:${dbName} is not exist!`)
    }
    console.log(`Database:${dbName} exist!`)
    console.timeEnd(`Check mongodb database ${dbName}`)
    console.log('Successfully connected to MongoDB')
    console.log('collection=========', collection)
    const ifExistCollection = await isExistCollection(dbName, collection)
    if (!ifExistCollection) {
      throw new Error(`${collection} in database:${dbName} is not exist!`)
    }

    return await mongoClient.db(dbName).collection(collection).find({}).toArray() || null
  } catch (e) {
    throw new Error('Connecting to MongoDB failed!')
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
    console.log("Disconnected with MongoDB")
  }
}

async function isExistDB(dbName) {
  const databasesList = await mongoClient.db().admin().listDatabases()
  // console.log("dbName:",dbName)
  // console.log("databasesList:",databasesList)
  const matchedDB = databasesList.databases.filter((db) => db.name === dbName)
  return matchedDB.length > 0;
}


async function isExistCollection(dbName, collection) {
  const collectionList = await mongoClient.db(dbName).listCollections().toArray()
  const matchedColl = collectionList.filter(item => item.name === collection)
  return matchedColl.length > 0
}


const modifyData = async (collection) => {
  try {
    console.log('Start to connect to MongoDB')
    console.time('mongodb-connect')
    // Connect the client to the server	(optional starting in v4.7)
    await mongoClient.connect();

    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ping: 1});
    console.timeEnd('mongodb-connect')

    console.time(`Check mongodb database ${dbName}`)
    // Check database if exist dbNmae,
    // If you do not check the dbName and there is no dbName database, it will create the database for you automatically
    const ifExist = await isExistDB(dbName)

    if (!ifExist) {
      throw new Error(`Database:${dbName} is not exist!`)
    }
    console.log(`Database:${dbName} exist!`)
    console.timeEnd(`Check mongodb database ${dbName}`)
    console.log('Successfully connected to MongoDB')
    return await mongoClient.db(dbName).collection(collection).find({}).toArray() || null
  } catch (e) {
    throw new Error('Connecting to MongoDB failed!')
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
    console.log("Disconnected with MongoDB")
  }
}

// connectMongoDB()
module.exports = {
  mongoClient,
  connectMongoDB,
  isExistDB
}
