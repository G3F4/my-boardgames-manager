const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();

app.get('/', cors(), function (req, res) {
  const sortBy = req.query.sortBy;
  const sortedData = {
    list: data.list.sort((a, b) => {
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

app.listen(3000);
