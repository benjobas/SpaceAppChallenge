const express = require('express');
const path = require('path');
const app = express();
const parser = require('body-parser');

app.use(parser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(8080, () => {
  console.log('Listening on port 8080');
})