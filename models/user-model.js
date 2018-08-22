import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    default: "",
    unique:true
  },
  password: {
    type: String,
  }
}, {
  timestamps: true
});



const user = mongoose.model('user', userSchema);

module.exports = user;