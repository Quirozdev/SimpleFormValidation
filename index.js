const form = document.getElementById('form');

const emailInput = document.getElementById('email');
const emailErrorMsgElem = document.querySelector('.email-error-msg');

const countryInput = document.getElementById('country');

const zipCodeInput = document.getElementById('zip-code');
const zipCodeErrorMsgElem = document.querySelector('.zip-code-error-msg');

const passwordInput = document.getElementById('password');
const passwordErrorMsgElem = document.querySelector('.password-error-msg');

const confirmPasswordInput = document.getElementById('confirm-password');
const confirmPasswordErrorMsgElem = document.querySelector(
  '.confirm-password-error-msg'
);

emailInput.addEventListener('blur', () => {
  const errorMsg = validateEmail(emailInput.value);
  handleInvalidField(emailInput, emailErrorMsgElem, errorMsg);
});

countryInput.addEventListener('change', () => {
  const zipCodeForm = {
    mexico: '93201',
    germany: '01067',
    us: '',
  };
  zipCodeInput.placeholder = zipCodeForm[countryInput.value];
  if (zipCodeInput.value) {
    const zipCodeErrorMsg = validateZipCode(
      zipCodeInput.value,
      countryInput.value
    );
    handleInvalidField(zipCodeInput, zipCodeErrorMsgElem, zipCodeErrorMsg);
  }
});

zipCodeInput.addEventListener('blur', () => {
  const zipCodeErrorMsg = validateZipCode(
    zipCodeInput.value,
    countryInput.value
  );
  handleInvalidField(zipCodeInput, zipCodeErrorMsgElem, zipCodeErrorMsg);
});

passwordInput.addEventListener('blur', () => {
  const passwordErrorMsg = validatePassword(passwordInput.value);
  handleInvalidField(passwordInput, passwordErrorMsgElem, passwordErrorMsg);
});

confirmPasswordInput.addEventListener('blur', () => {
  const confirmPasswordErrorMsg = validatePasswordsEquality(
    passwordInput.value,
    confirmPasswordInput.value
  );
  handleInvalidField(
    confirmPasswordInput,
    confirmPasswordErrorMsgElem,
    confirmPasswordErrorMsg
  );
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailErrorMsg = validateEmail(emailInput.value);
  if (emailErrorMsg) {
    handleInvalidField(emailInput, emailErrorMsgElem, emailErrorMsg);
    return;
  }
  const zipCodeErrorMsg = validateZipCode(
    zipCodeInput.value,
    countryInput.value
  );
  if (zipCodeErrorMsg) {
    handleInvalidField(zipCodeInput, zipCodeErrorMsgElem, zipCodeErrorMsg);
    return;
  }
  const passwordErrorMsg = validatePassword(passwordInput.value);
  if (passwordErrorMsg) {
    handleInvalidField(passwordInput, passwordErrorMsgElem, passwordErrorMsg);
    return;
  }
  const confirmPasswordErrorMsg = validatePasswordsEquality(
    passwordInput.value,
    confirmPasswordInput.value
  );
  if (confirmPasswordErrorMsg) {
    handleInvalidField(
      confirmPasswordInput,
      confirmPasswordErrorMsgElem,
      confirmPasswordErrorMsg
    );
    return;
  }

  alert('Submitted to the server!!!');
  form.submit();
});

function validateZipCode(zipCode, country) {
  const zipCodeValidator = {
    mexico: {
      pattern: /^[0-9]{5}$/,
      errorMsg: 'The zip code needs to be of five digits for Mexico',
    },
    germany: {
      pattern:
        /^0[1-9]\d\d(?<!0100)0|0[1-9]\d\d[1-9]|[1-9]\d{3}[0-8]|[1-9]\d{3}(?<!9999)9$/,
      errorMsg:
        'The zip code must be in the range from 01011 to 99998 for Germany',
    },
    us: {
      pattern: /\d{5}([ \-]\d{4})?/,
      errorMsg:
        'The zip code needs to be of five digits and can contain an - for US',
    },
  };
  if (!zipCodeValidator[country].pattern.test(zipCode)) {
    return zipCodeValidator[country].errorMsg;
  }
  return '';
}

function validateEmail(email) {
  if (!email) {
    return 'The email cant be empty';
  }
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)) {
    return 'The email needs to be of the following form: "something@something"';
  }
  return '';
}

function validatePassword(password) {
  if (!password) {
    return 'Password cant be empty';
  }
  if (password.length < 8) {
    return 'Password needs to be of atleast 8 characters';
  }
  return '';
}

function validatePasswordsEquality(password, confirmedPassword) {
  return password === confirmedPassword ? '' : 'Passwords must be the same';
}

function handleInvalidField(field, errorMsgElement, errorMsg) {
  errorMsgElement.textContent = errorMsg;
  field.setCustomValidity(errorMsg);
}
