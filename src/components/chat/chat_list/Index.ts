import Block from '../../../utils/Block';
import template from './chat_list.hbs';

export class ChatList extends Block {

  render() {
    return this.compile(template, this.props);
  }
}
