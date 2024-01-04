import { Messenger } from "../../components/chat-modules/chat_feed";
import { ChatsList } from "../../components/chat-modules/chat_list";
import Block from "../../utils/Block";
import template from "./messenger.hbs";
import ChatsController from "../../controllers/ChatsController";

export class MessengerPage extends Block {
  constructor() {
    super({});
  }

  protected init() {
    this.children.chatList = new ChatsList({ isLoaded: false });

    this.children.messenger = new Messenger({});

    ChatsController.fetchChats().finally(() => {
      (this.children.chatList as Block).setProps({
        isLoaded: true,
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
