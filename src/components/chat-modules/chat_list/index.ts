import { ChatInfo } from "../../../api/ChatsAPI";
import Block from "../../../utils/Block";
import { Chat } from "../../chat";
import { Link } from "../../link";
import template from "./chat_list.hbs";
import ChatsController from "../../../controllers/ChatsController";
import { withStore } from "../../../utils/Store";
import { Input } from "../../input";
import { Button } from "../../button";

interface ChatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
    this.children.profileLink = new Link({
      to: "/profile",
      label: "Profile",
      class: "to-profile-btn",
    });

    this.children.createChat = new Button({
      label: "New chat",
      class: "create-chat-btn",
      events: {
        click: () => {
          ChatsController.create("Chat");
        },
      },
    });

    this.children.search = new Input({
      name: "message",
      type: "text",
      placeholder: "Search",
      inputError: "At least one letter",
    });
  }

  protected componentDidUpdate(
    oldProps: ChatsListProps,
    newProps: ChatsListProps,
  ): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map((data) => {
      return new Chat({
        ...data,
        title: data.title,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase);
