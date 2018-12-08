const express = require('express');
const data = require('./data');

const app = express();

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

app.listen(3000);
