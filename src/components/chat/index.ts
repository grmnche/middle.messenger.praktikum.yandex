import Block from '../../utils/Block';
import template from './chat.hbs';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsAPI';

interface ChatProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  }
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props, isSelected: this.props.id === this.props.selectedChat?.id});
  }
}

export const withSelectedChat = withStore(state => ({selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}));

export const Chat = withSelectedChat(ChatBase);
