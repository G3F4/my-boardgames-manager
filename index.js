const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const data = require('./data');
const getData = (sortBy, title) => ({
  list: data.list
    .filter(item => (item.title || '').toLowerCase().startsWith(title.toLowerCase()))
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue && bValue) {
        if (aValue < bValue) {
          return -1;
        }
        if (aValue > bValue) {
          return 1;
        }
      }

      return 0;
    })
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

app.get('/games', function (req, res) {
  const sortBy = req.query.sortBy;
  const title = req.query.title;

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getData(sortBy, title)));
});

app.post('/games', function (req, res) {
  const { newGame, sortBy, title } = req.body;

  data.list = [{
    id: (data.list.length + 1).toString(),
    ...newGame,
  }, ...data.list];

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getData(sortBy, title)));
});

app.listen(3000);
