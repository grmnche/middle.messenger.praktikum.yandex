import Block from "../../utils/Block";
import template from "./btn_action.hbs";

interface BtnActionProps {
  actionName: string;
}

export class BtnAction extends Block {
  constructor(props: BtnActionProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
