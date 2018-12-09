const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./dbConnect');
const { addGame, deleteGame, editGame, getGame, getGames } = require('./api');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

app.get('/games', async (req, res) => {
  const sortBy = req.query.sortBy;
  const title = req.query.title;
  const list = await getGames(sortBy, title);

  res.json({ list });
});

app.get('/games/:gameId', async (req, res) => {
  const game = await getGame(req.params.gameId);

  res.json(game);
});

app.post('/games', async (req, res) => {
  const { game } = req.body;
  const addedGame = await addGame(game);

  res.json({ addedGameId: addedGame._id });
});

app.delete('/games/:gameId', async (req, res) => {
  const deletedGameId = await deleteGame(req.params.gameId);

  res.json({ deletedGameId });
});


app.patch('/games/:gameId', async (req, res) => {
  const { game } = req.body;

  await editGame(req.params.gameId, game);

  res.json({ game });
});

app.listen(3000);
