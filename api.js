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

const getGames = async (sortBy) => {
  console.log(['api:getGames']);
  try {
    return await GameModel.find().sort({ [sortBy || '_id'] : -1 });
  }

  catch (error) {
    console.error(['api:getGames:error'], error);
    return error;
  }
};

module.exports = { addGame, getGames };
