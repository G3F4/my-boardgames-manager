const GameModel = require('./GameModel');

const addGame = async game => {
  console.log(['api:addGame'], game);
  try {
    const newGame = new GameModel(game);

    return await newGame.save();
  }

  catch (error) {
    console.error(['api:addGame:error'], error);
    return error;
  }
};

const deleteGame = async gameId => {
  console.log(['api:addGame'], gameId);
  try {
    await GameModel.find({ _id: gameId }).remove().exec()

    return gameId;
  }

  catch (error) {
    console.error(['api:deleteGame:error'], error);
    return error;
  }
};

const editGame = async (gameId, game) => {
  console.log(['api:editGame'], game);
  try {
    return await GameModel.find({ _id: gameId}).update(game).exec();
  }

  catch (error) {
    console.error(['api:editGame:error'], error);
    return error;
  }
};

const getGames = async (sortBy, title) => {
  console.log(['api:getGames']);
  try {
    return await GameModel.find({ title: new RegExp(`${title}`)}).sort({ [sortBy || '_id'] : -1 });
  }

  catch (error) {
    console.error(['api:getGames:error'], error);
    return error;
  }
};

const getGame = async id => {
  console.log(['api:getGames']);
  try {
    return await GameModel.findOne({ _id: id });
  }

  catch (error) {
    console.error(['api:getGames:error'], error);
    return error;
  }
};

module.exports = { addGame, deleteGame, editGame, getGame, getGames };
