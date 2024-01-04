import Block from "../../utils/Block";
import template from "./chat.hbs";
import { withStore } from "../../utils/Store";
import { ChatInfo } from "../../api/ChatsAPI";
import { Button } from "../button";
import ChatsController from "../../controllers/ChatsController";

interface ChatProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  };
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
    });
  }

  protected init() {
    this.children.deleteChat = new Button({
      label: "delete",
      class: "delete-chat-btn",
      events: {
        click: (event) => {
          event?.stopPropagation();
          ChatsController.delete(this.props.id);
        },
      },
    });
  }
}

export const withSelectedChat = withStore((state) => ({
  selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
}));

export const Chat = withSelectedChat(ChatBase);
