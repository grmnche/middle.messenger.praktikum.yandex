import Block from "../../../utils/Block";
import template from "./chat_feed.hbs";
import { checkValidation } from "../../../utils/Validation/Validation";

export class ChatFeed extends Block {
  constructor() {
    super({
      type: "submit",
      label: "Create account",
      onClickSubmit: checkValidation,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
