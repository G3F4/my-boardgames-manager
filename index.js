const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();

app.get('/', cors(), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

app.listen(3000);
