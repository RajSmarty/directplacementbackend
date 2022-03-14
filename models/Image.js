const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImagesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    avatar: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    }
  });

  module.exports = mongoose.model('images', ImagesSchema);