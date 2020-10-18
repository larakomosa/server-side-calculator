const express = require('express'); //allows access to express
const bodyParser = require('body-parser'); //allows access to body parser
const app = express(); //creating app variable
const PORT = 5000; //port being used

let answer; //declared variables and arrays
let preAnswer;
let sequence;
let answers = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); //connects to public side (HTML, CSS, JS, JQuery)

app.post('/math', (req, res) => {
  let calc = req.body.math; //declares calc to be used in if statement
  console.log('calculations:', calc);

  //calculation is determined by operate.  A sequence is formed with the answer and pushed into an array
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
    answer = preAnswer.toFixed(1);
    sequence = calc.x + ' ' + '÷' + ' ' + calc.y + ' ' + '=' + ' ' + answer;
    answers.push(sequence);
  }
  res.sendStatus(200); //send back OK once calculation is completed
});

app.get('/calculator', (req, res) => {
  let giveAnswers = [answer]; //why must this single number be stored in an array?
  res.send(giveAnswers); //sends calculation back to client side
});

app.get('/calculator/list', (req, res) => {
  res.send(answers); //send calculation history back to client side
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
