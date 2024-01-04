import Block from '../../utils/Block';
import { focusoutValidation } from '../../utils/Validation/Validation';
import template from './profile.hbs';

export class Profile extends Block {
  constructor() {
    super({
      label: 'Create account',
      dataItems: [
        {
          itemName: 'Email',
          name: 'email',
          type: 'email',
          placeholder: 'winteriscoming@yandex.ru',
          inputError: 'Invalid email address',
          onFocusout: focusoutValidation,
        },
        {
          itemName: 'Login',
          name: 'login',
          type: 'text',
          placeholder: 'johnsnow',
          inputError:
            'Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters',
          onFocusout: focusoutValidation,
        },
        {
          itemName: 'Name',
          name: 'first_name',
          type: 'text',
          placeholder: 'John',
          inputError: 'Use letters and hyphens only',
          onFocusout: focusoutValidation,
        },
        {
          itemName: 'Surname',
          name: 'second_name',
          type: 'text',
          placeholder: 'Snow',
          inputError: 'Use letters and hyphens only',
          onFocusout: focusoutValidation,
        },
        {
          itemName: 'Chatname',
          name: 'login',
          type: 'text',
          placeholder: 'John',
          inputError:
            'Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters',
          onFocusout: focusoutValidation,
        },
        {
          itemName: 'Phone',
          name: 'phone',
          type: 'text',
          placeholder: '+7 (xxx) xxx xx xx',
          inputError: 'Enter the number in the format +XXXXXXXXXXXX',
          onFocusout: focusoutValidation,
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
