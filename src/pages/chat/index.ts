import Block from '../../utils/Block';
import template from './chat.hbs';

export class Chat extends Block {
  constructor() {
    super({
      error: {
        errorText: "Oops... we're already fixing",
        errorNumber: '500',
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
