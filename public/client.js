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

    function render(result) {
      const results = $('.js-calculations');
      results.text(result);}
      //$answers.empty();
      //$answers.append(`<li>Round ${response}</li>`);
     //   for (let totals of round) {
       //   $results.append(
         //   `<li>${totals.x}, ${totals.operator}, ${totals.y}, ${totals.answers}</li>`
          //);
        //}}
    

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

    function giveAnswers() {
      $.ajax({
        type: 'GET',
        url: '/calculator',
      })
        .then(function (response) {
          render(response);
          console.log('GET', response);
        })
        .catch(function (err) {
          console.log(err);
          alert('IT BROKE');
        })}

 