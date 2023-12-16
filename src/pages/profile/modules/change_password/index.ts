import Block from '../../../../utils/Block';
import template from './change_profile_password.hbs';
import {
  checkValidation,
  focusoutValidation,
} from '../../../../utils/Validation/Validation';
import { validateField } from '../../../../utils/Validation/Validation';

export class ChangeProfilePassword extends Block {
  constructor() {
    super({
      label: 'Create account',
      dataItems: [
        {
          itemName: 'Old password',
          placeholder: '....',
          inputError: 'At least one capital letter, one number and be between 8 and 40 characters long',
          onFocusout: focusoutValidation,
        },
        {
          itemName: 'New password',
          placeholder: '........',
          inputError: 'At least one capital letter, one number and be between 8 and 40 characters long',
          onFocusout: focusoutValidation,
        },
        {
          itemName: 'New password again',
          placeholder: '........',
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
