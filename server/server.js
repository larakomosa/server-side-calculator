const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
let answer;
let preAnswer;
let sequence;
let answers = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/math', (req, res) => {
  let calc = req.body.math;
  console.log('calculations:', calc);
  if (calc.operator === '+') {
    answer = Number(calc.x) + Number(calc.y);
    sequence = calc.x + ' ' + '+' + ' ' + calc.y + ' ' + '=' + ' ' + answer;
    answers.push(sequence);
  } else if (calc.operator === '-') {
    answer = Number(calc.x) - Number(calc.y);
    sequence = calc.x + ' ' + '-' + ' ' + calc.y + ' ' + '=' + ' ' + answer;
    answers.push(sequence);
  } else if (calc.operator === 'x') {
    answer = Number(calc.x) * Number(calc.y);
    sequence = calc.x + ' ' + 'x' + ' ' + calc.y + ' ' + '=' + ' ' + answer;
    answers.push(sequence);
  } else if (calc.operator === '÷') {
    preAnswer = Number(calc.x) / Number(calc.y);
    answer = preAnswer.toFixed(2);
    sequence = calc.x + ' ' + '÷' + ' ' + calc.y + ' ' + '=' + ' ' + answer;
    answers.push(sequence);
  }
  res.sendStatus(200);
});

app.get('/calculator', (req, res) => {
  let giveAnswers = [answer];
  res.send(giveAnswers);
});

app.get('/calculator/list', (req, res) => {
  res.send(answers);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
