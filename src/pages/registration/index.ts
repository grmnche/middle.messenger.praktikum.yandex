import Block from '../../utils/Block';
import template from './registration.hbs';
import {
  checkValidation,
  focusoutValidation,
} from '../../utils/Validation/Validation';

export class Registartion extends Block {
  constructor() {
    super({
      label: 'Create account',
      inputs: [
        {
          labelName: 'Email',
          name: 'email',
          type: 'email',
          inputError: 'Invalid email address',
          onFocusout: focusoutValidation,
        },
        {
          labelName: 'Login',
          name: 'login',
          type: 'text',
          inputError: 'Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters',
          onFocusout: focusoutValidation,
        },
        {
          labelName: 'Name',
          name: 'first_name',
          type: 'text',
          inputError: 'Use letters and hyphens only',
          onFocusout: focusoutValidation,
        },
        {
          labelName: 'Surname',
          name: 'second_name',
          type: 'text',
          inputError: 'Use letters and hyphens only',
          onFocusout: focusoutValidation,
        },
        {
          labelName: 'Phone',
          name: 'phone',
          type: 'text',
          inputError: 'Enter the number in the format +XXXXXXXXXXXX',
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
      onClickSubmit: checkValidation,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
