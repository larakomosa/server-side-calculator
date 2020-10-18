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

    function renderResult(result) {
      const results = $('.js-calculations');
      results.text(result);}

    function postGuesses(playerGuesses) {
      // console.log('sending: ', playerGuesses);
      $.ajax({
        type: 'POST',
        url: '/math',
        data: {math: playerGuesses}})
        .then(function (response) {
          console.log('POST Response:', response);
          // GET -> results
          giveAnswers();
          answerList() 
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
          renderResult(response);
          console.log('GETanswer', response);
        })
        .catch(function (err) {
          console.log(err);
          alert('IT BROKE');
        })}


        function answerList() {
          $.ajax({
            type: 'GET',
            url: '/calculator/list',
          })
          .then(function (response) {
          renderAnswers(response);
          console.log('GETanswer', response);
        })
        .catch(function (err) {
          console.log(err);
          alert('IT BROKE');
        })}
          
        function renderResult(result) {
          const results = $('.js-calculations');
          results.text(result);}
          
        function renderAnswers(list) {
        $('.array').empty();
        for (let i = 0; i < list.length; i++) {   
          $('.array').append(`
         <dt><b>${list}</dt>
          `);}}
            
      
     