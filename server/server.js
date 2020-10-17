const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(express.static('public'));

app.post('/math', (req, res) => {
const calc = req.body.math
let answer;
console.log('calculations:', calc );
const answers = []; // results from calculator
//for (let i =0; i<calculations.length; i++){
//const math = calculations[i];
  if (calc.operator === '+') {
    calc.answer = Number(calc.x) + Number(calc.y);
    answers.push(calc.x, calc.operator, calc.y, "=", calc.answer)
  } else if (calc.operator === '-') {
    calc.answer = Number(calc.x) + Number(calc.y);
    answers.push(calc.x, calc.operator, calc.y, "=", calc.answer)
  } else if (calc.operator === '*') {
    calc.answer = Number(calc.x) + Number(calc.y);
    answers.push(calc.x, calc.operator, calc.y, "=", calc.answer)
  } else if (calc.operator === '/') {
    calc.answer = Number(calc.x) + Number(calc.y)
    answers.push(calc.x, calc.operator, calc.y, "=", calc.answer)
  }
  console.log(calc.x, calc.operator, calc.y, "=", calc.answer);
  res.sendStatus(200);
})

app.get('/calculator', (req, res) => {
  const results = calc.answer
  res.send(results)
  console.log('hi')
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});
