import Block from '../../utils/Block';
import template from './modals.hbs';

export class Modals extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
