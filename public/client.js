$(document).ready(handleReady);

function handleReady() {
  $('.submit').on('click', calculate);
  $('.js-add').on('click', conversion);
  $('.js-subtract').on('click', conversion);
  $('.js-multiply').on('click', conversion);
  $('.js-divide').on('click', conversion);
  $('.clear').on('click', clearCurrent);
}

let operator = '';
function conversion() {
  //takes 1 of 4 operator buttons and returns the specific clicked operator value
  operator = $(this).prop('value');
  return operator;
}

function calculate() {
  if (
    //requires user to fill out both number inputs
    $.trim($('.field-number-x').val()) === '' ||
    $.trim($('.field-number-y').val()) === ''
  ) {
    alert('Please add numbers to both input fields');
    return;
  } else if (
    //prevents user from getting an infinity answer when dividing by Zero
    (operator === '÷' && $('.field-number-x').val() == '0') ||
    (operator === '÷' && $('.field-number-y').val() == '0')
  ) {
    alert('If it is divided by zero, the answer is 0!');
    return;
  } else {
    const calculations = {
      // 2 number values and 1 operator to create an object to be sent to server
      x: $('.field-number-x').val(),
      y: $('.field-number-y').val(),
      operator: operator,
    };
    $.ajax({
      type: 'POST',
      url: '/math',
      data: { math: calculations }, //sends calculation object to server
    })
      .then(function (response) {
        console.log('POST Message:', response);
        // calls to the 2 GET functions
        giveAnswers();
        answerList();
      })
      .catch(function (err) {
        console.log(err);
        alert('Error- Post Side'); //indicates error and if it's on the POST or the GET side
      });
  }
}

function giveAnswers() {
  //once calculated on server side, it's received by this get function
  $.ajax({
    type: 'GET',
    url: '/calculator',
  })
    .then(function (response) {
      renderGiveAnswers(response); //call to render
      console.log('GET1 answer:', response); //response from Server
    })
    .catch(function (err) {
      console.log(err);
      alert('Error-Get1 Side'); //indicates error and if it's on the POST or the GET side
    });
}

function renderGiveAnswers(result) {
  //updates calculation answer to webpage
  const results = $('.js-calculations');
  results.text(result);
}

function answerList() {
  //received stored calculations from server
  $.ajax({
    type: 'GET',
    url: '/calculator/list',
  })
    .then(function (response) {
      renderAnswerList(response); //call to render
      console.log('GET2 answer', response); //response from Server
    })
    .catch(function (err) {
      console.log(err);
      alert('Error-Get2 Side'); //indicates error and if it's on the POST or the GET side
    });
}

function renderAnswerList(list) {
  //appends stored calculations to webpage
  $('.array').empty();
  for (let i = 0; i < list.length; i++) {
    $('.array').append(`
    <dt>${list[i]}<dt>`);
  }
}

function clearCurrent(answer) {
  //clears answer and data fields when "c" is clicked
  $('.field-number-x').val(''),
    $('.field-number-y').val(''),
    $('.js-calculations').empty();
}
