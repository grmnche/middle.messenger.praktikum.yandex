import Block from '../../../utils/Block';
import { focusoutValidation } from '../../../utils/Validation/Validation';
import template from './chat_list.hbs';

export class ChatList extends Block {
  constructor() {
    super({
      onFocusout: focusoutValidation,
      inputError: 'Message field cannot be empty',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
