$(document).ready(handleReady);

function handleReady() {
  console.log('jquery is loaded!')
  $(".submit").on('click', clickHandlerSubmit);
  $('.js-add').on('click', conversion)
  $('.js-subtract').on('click', conversion)
  $('.js-multiply').on('click', conversion)
  $('.js-divide').on('click', conversion)
};

let operator = '';

function conversion(){
operator = $(this).prop('value');
console.log(operator);
return operator;
}

function clickHandlerSubmit() {
    const calculations = 
      {
      x: Number($('.field-number-x').val()),
      y: Number($('.field-number-y').val()),
      operator: operator,
      }
    postGuesses(calculations);
    console.log(calculations);
    }

    function render(resultHistory) {
      console.log(resultHistory);
      const $answers = $('.js-calculations');

      $answers.empty();
      for (let i = 0; i < resultHistory.length; i++) {
        const round = resultHistory[i];

      $results.append(`<li>Round ${i + 1}</li>`);
        for (let totals of round) {
          $results.append(
            `<li>${totals.x}, ${totals.operator}, ${totals.y}, ${totals.answers}</li>`
          );
        }
    }}

    function postGuesses(playerGuesses) {
      // console.log('sending: ', playerGuesses);
      $.ajax({
        type: 'POST',
        url: '/math',
        data: {math: playerGuesses}})
        .then(function (response) {
          console.log('POST Response:', response);
          // GET -> results
          getResults();
        })
        .catch(function (err) {
          console.log(err);
          alert('Post');
        })
    }

    function getResults() {
      $.ajax({
        type: 'GET',
        url: '/calculator',
      })
        .then(function (response) {
          console.log('GET', response);
        })
        .catch(function (err) {
          console.log(err);
          alert('IT BROKE');
        });}