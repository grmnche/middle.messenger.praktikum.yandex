import Block from "../../utils/Block";
import template from "./profile.hbs";

export class Profile extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
