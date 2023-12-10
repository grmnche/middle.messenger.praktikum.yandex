import Block from '../../utils/Block';
import template from './profile_back_bar.hbs';

export class ProfileBackBar extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
