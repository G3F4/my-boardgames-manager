const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./dbConnect');
const { addGame, deleteGame, getGames } = require('./api');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

app.get('/games', async (req, res) => {
  const sortBy = req.query.sortBy;
  const title = req.query.title;
  const list = await getGames(sortBy, title);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ list }));
});

app.post('/games', async (req, res) => {
  const { newGame } = req.body;
  const addedGame = await addGame(newGame);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ addedGameId: addedGame._id }));
});

app.delete('/games/:gameId', async (req, res) => {
  const deletedGameId = await deleteGame(req.params.gameId);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ deletedGameId }));
});

app.listen(3000);
