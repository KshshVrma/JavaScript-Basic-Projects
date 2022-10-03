const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=';

const pwSelect = document.getElementById('pw');
const copySelect = document.getElementById('copy');
const lenSelect = document.getElementById('len');
const lowerSelect = document.getElementById('lower');
const upperSelect = document.getElementById('upper');
const numberSelect = document.getElementById('number');
const symbolSelect = document.getElementById('symbol');
const generateSelect = document.getElementById('generate');

function getLowercase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  const len = lenSelect.value;

  let password = '';

  if (lowerSelect.checked) {
    password += getLowercase();
  }
  if (upperSelect.checked) {
    password += getUppercase();
  }

  if (numberSelect.checked) {
    password += getNumber();
  }

  if (symbolSelect.checked) {
    password += getSymbol();
  }

  for (let i = password.length; i < len; i++) {
    const x = reposition();
    password += x;
  }

  pwSelect.innerText = password;
}

function reposition() {
  const mixed = [];

  if (lowerSelect.checked) {
    mixed.push(getLowercase());
  }
  if (upperSelect.checked) {
    mixed.push(getUppercase());
  }

  if (numberSelect.checked) {
    mixed.push(getNumber());
  }

  if (symbolSelect.checked) {
    mixed.push(getSymbol());
  }

  // returns an empty string when no password was passed
  if (mixed.length === 0) return '';

  return mixed[Math.floor(Math.random() * mixed.length)];
}

// adds a click listener to the generate button and fires the generatePassword function.
generateSelect.addEventListener('click', generatePassword);

//adds a click listener to the copy button, creates a textarea element from pwSelect copies it to clipboard and discards it after, alert pops up.
copySelect.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = pwSelect.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
});
