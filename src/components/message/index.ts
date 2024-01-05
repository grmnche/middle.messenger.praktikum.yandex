import Block from "../../utils/Block";
import template from "./message.hbs";

interface MessageProps {
  content?: string;
  isMine?: boolean;
  userName: string;
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
