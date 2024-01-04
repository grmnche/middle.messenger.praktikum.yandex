import Block from "../../utils/Block";
import template from "./form.hbs";

interface FormProps {
  onSubmit?: () => void;
  events: {
    submit: () => void;
  };
}

export class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
