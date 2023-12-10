import Block from "../../../utils/Block";
import template from "./chat-preview.hbs";

interface ChatPreviewProps {
  src: string;
  chatName: string;
  chatLastMessage: string;
  chatTime: string;
}

export class ChatPreview extends Block {
  constructor(props: ChatPreviewProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
