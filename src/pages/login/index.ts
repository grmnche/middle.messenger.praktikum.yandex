import Block from "../../utils/Block";
import template from "./login.hbs";
import { checkValidation } from "../../utils/Validation/Validation";
import { addBlurListeners } from "../../utils/Validation/Validation";
export class Login extends Block {
  constructor() {
    super({
      type: "submit",
      label: "Login",
      onClickSubmit: checkValidation,
    });
  }

  _componentDidMount() {
    addBlurListeners();
  }

  render() {
    return this.compile(template, this.props);
  }
}
