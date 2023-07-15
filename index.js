const form = document.getElementById('form');

const emailInput = document.getElementById('email');
const countryInput = document.getElementById('country');
const zipCodeInput = document.getElementById('zip-code');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateZipCode();
});

function validateZipCode() {
  const zipCodeValidator = {
    mexico: {
      pattern: /a/,
      errorMsg: '',
    },
  };
  console.log(countryInput.value);
}
