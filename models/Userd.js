const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserDSchema = new Schema({
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
  const Userd = mongoose.model('userd', UserDSchema);
  module.exports = Userd;