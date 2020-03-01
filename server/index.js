const express = require('express');
const path = require('path');
const app = express();
const controllers = require('../database/controllers.js');

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/populate', (req, res) => {
  controllers.removeOld()
    .then(() => {
      controllers.insertPlanets(req.body);
    })
    .then(() => {
      res.status(200);
      res.send('Successfully Replaced and Populated');
    })
    .catch(() => {
      res.status(400);
      res.send('Failed');
    })
})

app.get('/planets', (req, res) => {
  controllers.getPlanets()
    .then((planets) => {
      res.status(200);
      res.send(planets)
    })
    .catch(() => {
      res.status(400);
      res.send('Request Failed');
    })
})

app.listen(8080, () => {
  console.log('Listening on port 8080');
})