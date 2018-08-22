import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({

  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  user_id:{
  	 type: mongoose.Schema.Types.ObjectId,
     ref: 'user'
  }
}, {
  timestamps: true
});



const list = mongoose.model('list', listSchema);

module.exports = list;