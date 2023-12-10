import Block from "../../utils/Block";
import template from "./message.hbs";

interface MessageProps {
  messageText: string;
  messageTime: string;
  whoseMessage: string;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
