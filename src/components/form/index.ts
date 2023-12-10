import Block from '../../utils/Block';
import template from './form.hbs';


export class Form extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
