import Block from "../../../../utils/Block";
import template from "./change_profile_data.hbs";
import { checkValidation } from "../../../../utils/Validation/Validation";
import { addBlurListeners } from "../../../../utils/Validation/Validation";
export class ChangeProfileData extends Block {
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
