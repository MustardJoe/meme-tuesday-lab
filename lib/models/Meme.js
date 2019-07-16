const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({

  top: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true,
    default: 0,
    min: 0
  },
  bottom: {
    type: String,
    required: true
  }

});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
