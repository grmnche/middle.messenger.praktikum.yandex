import Block from "../../utils/Block";
import template from "./chat.hbs";
import { addBlurListeners } from "../../utils/Validation/Validation";

export class Chat extends Block {
  constructor() {
    super({
      error: {
        errorText: "Oops... we're already fixing",
        errorNumber: "500",
      },
    });
  }

  _componentDidMount() {
    addBlurListeners();
  }

  render() {
    return this.compile(template, this.props);
  }
}
