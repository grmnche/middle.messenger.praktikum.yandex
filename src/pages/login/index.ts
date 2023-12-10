import Block from '../../utils/Block';
import template from './login.hbs';
import { FormValidator } from '../../utils/FormValidator';

const addBlurListeners = () => {
  const loginInput = document.querySelector('#login') as HTMLInputElement;
  const passwordInput = document.querySelector('#password') as HTMLInputElement;

  loginInput.addEventListener('blur', () => {
    validateField(loginInput);
  });

  passwordInput.addEventListener('blur', () => {
    validateField(passwordInput);
  });
};

const validateField = (input: HTMLInputElement) => {
  const value = input.value;
  const fieldName = input.id;

  let isValid = false;

  switch (fieldName) {
    case 'login':
      isValid = FormValidator.validateLogin(value);
      break;
    case 'password':
      isValid = FormValidator.validatePassword(value);
      break;
    // Добавьте обработку других полей по аналогии
  }

  if (!isValid) {
    console.log(`Некорректное значение для поля "${fieldName}"`);
  }
};

const checkValidation = (event: any) => {
  event.preventDefault();

  const loginInput = document.querySelector('#login') as HTMLInputElement;
  const passwordInput = document.querySelector('#password') as HTMLInputElement;

  const loginValue = loginInput.value;
  const passwordValue = passwordInput.value;

  const isLoginValid = FormValidator.validateLogin(loginValue);
  const isPasswordValid = FormValidator.validatePassword(passwordValue);

  if (isLoginValid && isPasswordValid) {
    const data = {
      loginValue,
      passwordValue,
    };
    console.log(data);
  } else {
    console.log('Невалидные данные');
  }
};

export class Login extends Block {
  constructor() {
    super({
      type: 'submit',
      label: 'Login',
      onClickSubmit: addBlurListeners,
      onClickForm: addBlurListeners,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
