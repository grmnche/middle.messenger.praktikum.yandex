import Block from '../../../utils/Block';
import template from './chat_feed.hbs';

export class ChatFeed extends Block {

  render() {
    return this.compile(template, this.props);
  }
}
