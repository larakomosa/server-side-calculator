$(document).ready(handleReady);

function handleReady() {
  console.log('jquery is loaded!');
  $('.submit').on('click', calculate);
  $('.js-add').on('click', conversion);
  $('.js-subtract').on('click', conversion);
  $('.js-multiply').on('click', conversion);
  $('.js-divide').on('click', conversion);
  $('.clear').on('click', clearCurrent);
}

let operator = '';
function conversion() {
  operator = $(this).prop('value');
  console.log(operator);
  return operator;
}

function calculate() {
  if (
    $.trim($('.field-number-x').val()) === '' ||
    $.trim($('.field-number-y').val()) === ''
  ) {
    alert('Please add numbers to both input fields');
    return false;
  } else {
    const calculations = {
      x: $('.field-number-x').val(),
      y: $('.field-number-y').val(),
      operator: operator,
    };
    $.ajax({
      type: 'POST',
      url: '/math',
      data: { math: calculations },
    })
      .then(function (response) {
        console.log('POST Message:', response);
        // GET -> results
        giveAnswers();
        answerList();
      })
      .catch(function (err) {
        console.log(err);
        alert('Error- Post Side');
      });
  }
}

function giveAnswers() {
  $.ajax({
    type: 'GET',
    url: '/calculator',
  })
    .then(function (response) {
      renderGiveAnswers(response);
      console.log('GET1 answer:', response);
    })
    .catch(function (err) {
      console.log(err);
      alert('IT BROKE');
    });
}

function renderGiveAnswers(result) {
  const results = $('.js-calculations');
  results.text(result);
}

function answerList() {
  $.ajax({
    type: 'GET',
    url: '/calculator/list',
  })
    .then(function (response) {
      renderAnswerList(response);
      console.log('GET2 answer', response);
    })
    .catch(function (err) {
      console.log(err);
      alert('IT BROKE');
    });
}

function renderAnswerList(list) {
  $('.array').empty();
  for (let i = 0; i < list.length; i++) {
    $('.array').append(`
         <li>${list[i]}</li>
          `);
  }
}

function clearCurrent(answer) {
  $('.field-number-x').val(''),
    $('.field-number-y').val(''),
    $('.js-calculations').empty();
}
