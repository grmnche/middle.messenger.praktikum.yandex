import Block from "../../utils/Block";
import template from "./registration.hbs";
import { checkValidation } from "../../utils/Validation/Validation";
import { addBlurListeners } from "../../utils/Validation/Validation";
export class Registartion extends Block {
  constructor() {
    super({
      label: "Create account",
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
