const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  firstName:{
    type:String,
    require:'Enter your first name'
  },
  lastName:{
    type:String,
    required:'Enter your last name'
  },
  userName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:'Enter your last name'
  },
  phone:{
    type:String
  },
  hasPassword:{
    type:String,
    required:String
  },
  created_data:{
    type: Date,
    default:Date.now
  }
})

/*
  Add the method into schema
*/
UserSchema.method.comparePassword = (password, hasPassword)=> {
  return bcrypt.compareSync(password,hasPassword)
};
