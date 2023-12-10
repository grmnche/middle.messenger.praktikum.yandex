import Block from '../../utils/Block';
import template from './registration.hbs';

export class Registartion extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
