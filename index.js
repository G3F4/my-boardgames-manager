const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const data = require('./data');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

app.get('/', function (req, res) {
  const sortBy = req.query.sortBy;
  const title = req.query.title;
  const sortedData = {
    list: data.list
      .filter(item => item.title.toLowerCase().startsWith(title.toLowerCase()))
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
  };

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(sortedData));
});

app.put('/', function (req, res) {
  data.list = [req.body, ...data.list];

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(req.body));
});

app.listen(3000);
