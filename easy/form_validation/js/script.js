var questionNumber = 0,
  question = '<h1>What is your name?</h1>',
  output = document.getElementById('output');
output.innerHTML = question;

function bot() {
  var input = document.getElementById('input').value;

  if (questionNumber == 0) {
    if (checkName()) {
      output.innerHTML = '<h1>hi, ' + input + '<br/> welcome :)</h1>';
      document.getElementById('input').value = '';
      question = '<h1>How old are you?</h1>';
      setTimeout(showQuestion, 2000);
      questionNumber++;
    } else {
      swal({
        title: 'Input name is incorrect',
        html: 'Example : <i>John Doe</i> / <i>Jane Doe</i>',
        type: 'warning',
        confirmButtonColor: '#5DFC0A',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEnterKey: false,
      }).catch(swal.noop);
    }
  } else if (questionNumber == 1) {
    if (checkAge() && input.length <= 3) {
      const date = new Date();
      output.innerHTML =
        '<h1>Means you were born in ' + (date.getFullYear() - input) + '</h1>';
      document.getElementById('input').value = '';
      question = '<h1>Where were you born?</h1>';
      setTimeout(showQuestion, 2000);
      questionNumber++;
    } else {
      swal({
        title: 'Input age is incorrect',
        html: 'Input only number and not longer than 3 digit',
        type: 'warning',
        confirmButtonColor: '#5DFC0A',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEnterKey: false,
      }).catch(swal.noop);
    }
  } else if (questionNumber == 2) {
    if (checkAddress()) {
      output.innerHTML = '<h1>You were born in ' + input + '</h1>';
      document.getElementById('input').value = '';
      question = '<h1>Input email?</h1>';
      setTimeout(showQuestion, 2000);
      questionNumber++;
    } else {
      swal({
        title: 'Input address is incorrect',
        html: 'Input only text or string. Example : <i>Surakarta</i>',
        type: 'warning',
        confirmButtonColor: '#5DFC0A',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEnterKey: false,
      }).catch(swal.noop);
    }
  } else if (questionNumber == 3) {
    if (checkEmail()) {
      output.innerHTML = '<h1>Your email is ' + input + '</h1>';
      document.getElementById('input').value = '';
      question = '<h1>Input phone number?</h1>';
      setTimeout(showQuestion, 2000);
      questionNumber++;
    } else {
      swal({
        title: 'Input email is incorrect',
        html: 'Example : <i>denifebri@gmail.com</i> / <i>denifebri@localhost</i>',
        type: 'warning',
        confirmButtonColor: '#5DFC0A',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEnterKey: false,
      }).catch(swal.noop);
    }
  } else if (questionNumber == 4) {
    if (checkPhoneNumber() && input.length >= 10 && input.length <= 13) {
      output.innerHTML = '<h1>Your phone number is ' + input + '</h1>';
      document.getElementById('input').value = '';
      pesan = '<h1>Thank you for your input.</h1>';
      setTimeout(function () {
        output.innerHTML = pesan;
        document.getElementById('input').style.display = 'none';
      }, 2000);
    } else {
      swal({
        title: 'Input phone number is incorrect',
        html: 'Input only number and between 10-13 digit (ID Country Code)',
        type: 'warning',
        confirmButtonColor: '#5DFC0A',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEnterKey: false,
      }).catch(swal.noop);
    }
  }
}

function checkName() {
  var input = document.getElementById('input').value;
  return /^[A-Za-z .]+$/.test(input);
}

function checkAge() {
  var input = document.getElementById('input').value;
  return /^\d+$/.test(input);
}

function checkAddress() {
  var input = document.getElementById('input').value;
  return /^[A-za-z]+$/.test(input);
}

function checkEmail() {
  var input = document.getElementById('input').value;
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,4}$/.test(input);
}

function checkPhoneNumber() {
  var input = document.getElementById('input').value;
  return /^[0-9]+$/.test(input);
}

function showQuestion() {
  output.innerHTML = question;
}

$(document).keypress(function (e) {
  if (e.which == 13)
    if (document.getElementById('input').value !== '') {
      bot();
    } else {
      swal({
        title: 'Input is empty',
        type: 'warning',
        confirmButtonColor: '#5DFC0A',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEnterKey: false,
      }).catch(swal.noop);
    }
});
