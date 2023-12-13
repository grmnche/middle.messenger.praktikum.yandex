import Block from "../../utils/Block";
import template from "./input.hbs";

interface InputProps {
  labelClass: string;
  name: string;
  text: string;
  type: "password" | "text";
  placeholder: string;
  onFocusout?: () => void;
  events: {
    focusout: () => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        focusout: props.onFocusout,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
