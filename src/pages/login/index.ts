import Block from '../../utils/Block';
import template from './login.hbs';
import {
  checkValidation,
  focusoutValidation,
} from '../../utils/Validation/Validation';

export class Login extends Block {
  constructor() {
    super({
      type: 'submit',
      label: 'Login',
      onClickSubmit: checkValidation,
      inputs: [
        {
          labelName: 'Login',
          name: 'login',
          type: 'text',
          inputError: 'Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters',
          onFocusout: focusoutValidation,
        },
        {
          labelName: 'Password',
          name: 'password',
          type: 'password',
          inputError: 'At least one capital letter, one number and be between 8 and 40 characters long',
          onFocusout: focusoutValidation,
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
