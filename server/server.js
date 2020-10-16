const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('public'));

// GET & POST Routes go here
app.post('/math', (req, res) => {
  // calculations
  // {
  //   calculationInputs: [
  //     {
  //       x:5,
  //       y:7,
  //       o:'*'
  //     }
  //   ]
  // }
const calculations = req.body;
console.log('calculations:', calculations );
res.sendStatus(201);});



app.get('/calculator', (req, res) => {
  res.send("hello!");
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});

function multiplyNumbers(x,y){
  return x*y;
}

function divideNumbers(x,y){
  return x/y;
}

function subtractNumbers(x,y){
  return x-y;
}

function addNumbers(x,y){
  return x+y;
}

console.log(multiplyNumbers(3,5));
console.log(divideNumbers(3,5));
console.log(subtractNumbers(3,5));
console.log(addNumbers(3,5));
