require("dotenv").config();
const express = require('express');
const mongoDB = express.Router();

const {connectMongoDB, getCollectionData} = require('./db')
const {stat} = require("fs");

const EN = 'en';
const CN = 'cn';
const COLLECTION_PROJECT = 'project';
const COLLECTION_BLOG = 'blog';
mongoDB.get('/:locale/projects', async (req, res, next) => {
  const {locale} = req.params
  const collections = filterLocale(locale)
  const Data = await connectMongoDB(collections.project)
  res.status(200).json(Data)
});

mongoDB.get('/:locale/blogs', async (req, res, next) => {
  const {locale} = req.params
  const collections = filterLocale(locale)
  const Data = await connectMongoDB(collections.blog)
  res.status(200).json(Data)
});

const filterLocale = (locale)=>{
  let collections;
  switch (locale.toLowerCase()){
    case 'cn':
      return collections = {
        project: `${COLLECTION_PROJECT}-${CN}`,
        blog: `${COLLECTION_BLOG}-${CN}`,
      }
    default:
      return collections = {
        project: `${COLLECTION_PROJECT}`,
        blog: `${COLLECTION_BLOG}`,
      }
  }
}
mongoDB.post('/insert', async (req, res, next) => {
  const Data = await connectMongoDB(COLLECTION_BLOG)
  res.status(200).json(Data)
});

module.exports = mongoDB;
