const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
let answer;
let calc;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(express.static('public'));

app.post('/math', (req, res) => {
let calc = req.body.math;
console.log('calculations:', calc );
const answers = []; // results from calculator
//for (let i =0; i<calculations.length; i++){
//const math = calculations[i];
  if (calc.operator === '+') {
    answer = Number(calc.x) + Number(calc.y);
    answers.push(calc.x, calc.operator, calc.y, "=", answer)
  } else if (calc.operator === '-') {
    answer = Number(calc.x) - Number(calc.y);
    answers.push(calc.x, calc.operator, calc.y, "=", answer)
  } else if (calc.operator === '*') {
    answer = Number(calc.x) * Number(calc.y);
    answers.push(calc.x, calc.operator, calc.y, "=", answer)
  } else if (calc.operator === '/') {
    answer = Number(calc.x) / Number(calc.y)
    answers.push(calc.x, calc.operator, calc.y, "=", answer)
  }
  console.log(calc.x, calc.operator, calc.y, "=", answer);
  res.sendStatus(200);
})

app.get('/calculator', (req, res) => {
  let giveAnswers = [answer];
  res.send(giveAnswers);
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});
