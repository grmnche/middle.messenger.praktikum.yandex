import Block from '../../../../utils/Block';
import template from './change_profile_data.hbs';

export class ChangeProfileData extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
