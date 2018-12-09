const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./dbConnect');
const { addGame, getGames } = require('./api');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

app.get('/games', async (req, res) => {
  const sortBy = req.query.sortBy;
  // const title = req.query.title;
  const list = await getGames(sortBy);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ list }));
});

app.post('/games', async (req, res) => {
  const { newGame, sortBy/*, title*/ } = req.body;
  await addGame(newGame);
  const list = await getGames(sortBy);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ list }));
});

app.listen(3000);
