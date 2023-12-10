import Block from '../../../../utils/Block';
import template from './change_profile_password.hbs';

export class ChangeProfilePassword extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
