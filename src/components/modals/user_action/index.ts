import Block from '../../../utils/Block';
import template from './user_action.hbs';

export class UserAction extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
