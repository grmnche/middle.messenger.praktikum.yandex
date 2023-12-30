import Block from '../../utils/Block';
import { validateField } from '../../utils/Validation/Validation';
import template from './input.hbs';

interface InputProps {
  name: string;
  type: string;
  class?: string;
  placeholder?: string;
  label?: string;
  inputError?: string;
  events?: {
    focusout: (event: FocusEvent) => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        focusout: () => this.onValidate(),
      },
    });
  }

  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value);
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  public onValidate() {
    return validateField(this.element as HTMLInputElement);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
