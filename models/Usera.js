const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserASchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
    },
    place: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        default: Date.now
    },
  });
  const Usera = mongoose.model('usera', UserASchema);
  module.exports = Usera;