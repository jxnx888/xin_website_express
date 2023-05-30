import exp from "constants";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userSchema, UserSchema} = require('../models/userModel')

const User = mongoose.model('User', UserSchema)

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({message: 'Unauthorized user!'})
  }
}

export const register = (req, res) => {
  const newUser = new User(req.body)
  console.log('newUser', newUser)
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10)
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({message: err})
    } else {
      user.hashPassword = undefined;
      return res.json(user)
    }
  })
}

export const login = (req,res) => {
  User.findOne({
    email:req.body.email
  },(err,user)=>{
    if(err){
      throw new Error(err)
    }
    if(!user){
      res.status(401).json({message:'Authentication failed. No User found!'})
    } else if(user){
      if(!user.comparePassword(req.body.passoword, user.hashPassword)){
        res.status(401).json({message:'Authentication failed. Wrong password'})
      } else{
        return res.json({token:jwt.sign({email:user.email, username: user.username, _id:user.id},'XIN_WEBSITE_LOGIN_API')})
      }
    }
  })
}
