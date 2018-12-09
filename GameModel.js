const mongoose = require('mongoose');

const gameModel = mongoose.Schema({
  id: String,
  title: String,
  description: String,
  publisher: String,
  category: String,
  players: String,
  status: String,
  image: String,
});
const GameModel = mongoose.model('Game', gameModel);

module.exports = GameModel;
