const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

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

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('public'));

// GET & POST Routes go here
//{   
 // "x": 9,
  //"y": 5,
 // "c": "*"
//}

app.post('/math', (req, res) => {
const calculations = req.body.math
console.log('calculations:', calculations );
const answers = []; // results from calculator

for (let i =0; i<calculations.length; i++){
  const math = calculations[i];
  
  if (math.operator =='*') {
  math.answer = multiplyNumbers(, math.y)
  console.log('answer', math.answer);
} else if  (math.operator =='/') {
  math.answer = divideNumbers(math.x, math.y)
  console.log('answer', math.answer);
} else if  (math.operator =='-') {
  math.answer = subtractNumbers(math.x, math.y)
  console.log('answer', math.answer);
} else if  (math.operator =='+') {
    math.answer = addNumbers(math.x, math.y)
  console.log(math.x, math.operator, math.y, "=", math.answer);
}
console.log(math);
answers.push(math);
res.sendStatus(200);
}});

app.get('/calculator', (req, res) => {
  res.send(answers);
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});

console.log(multiplyNumbers(3,5));
console.log(divideNumbers(3,5));
console.log(subtractNumbers(3,5));
console.log(addNumbers(3,5));
