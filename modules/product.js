const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image:{
    type: Schema.Types.ObjectId, required: true,ref:"SingleFile" 
  },
  multipleImages:{
    type: Schema.Types.ObjectId ,ref:"MultipleFile"
  }
 
  
 
});

module.exports = mongoose.model('Product', productSchema);
