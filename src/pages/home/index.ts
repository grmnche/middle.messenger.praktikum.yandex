import Block from '../../utils/Block';
import template from './home.hbs';

export class HomePage extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
