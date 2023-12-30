import template from './chat_feed.hbs';
import MessagesController, {
  Message as MessageInfo,
} from '../../../controllers/MessagesController';
import { withStore } from '../../../utils/Store';
import { Button } from '../../button';
import Block from '../../../utils/Block';
import { Input } from '../../input';
import { Message } from '../../message';
import { UserPreview } from '../../user_preview';

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props);
  }
  protected init() {
    this.children.messages = this.createMessages(this.props);

    this.children.messageField = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message',
    });

    this.children.userPreview = new UserPreview({
      userName: 'Tyrion',
    });
    this.children.chatSettingsBtn = new Button({
      class: 'chat-feed-btn chat-settings-btn',
      type: 'button',
    });

    this.children.sendMessageBtn = new Button({
      class: 'chat-feed-btn send-message-btn',
      type: 'button',
      events: {
        click: () => {
          const input = this.children.messageField as Input;
          const message = input.getValue();

          input.setValue('');

          MessagesController.sendMessage(this.props.selectedChat!, message);
        },
      },
    });

    this.children.addFilesBtn = new Button({
      class: 'chat-feed-btn add-files-btn',
      type: 'button',
    });
  }

  protected componentDidUpdate(
    oldProps: MessengerProps,
    newProps: MessengerProps,
  ): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map((data) => {
      return new Message({ ...data, isMine: props.userId === data.user_id });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
