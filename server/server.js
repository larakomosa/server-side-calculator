const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('public'));

// GET & POST Routes go here
//app.post('/number', (req, res) => {
//ourGuesses.push(req.body);
  //res.sendStatus(201);})

//app.get('/number', (req, res) => {
  //res.send(kittyKat);
//});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});