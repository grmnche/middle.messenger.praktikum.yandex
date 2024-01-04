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
import controller from '../../../controllers/ChatsController';

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
  onload: () => void;
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props);
  }
  protected init() {
    this.children.messages = this.createMessages(this.props);

    this.children.messageField = new Input({
      type: 'text',
      placeholder: 'Message',
      name: 'message',
    });

    this.children.userPreview = new UserPreview({
      userName: 'Chatname',
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

    this.children.addUserBtn = new Button({
      class: 'edit-user-btn btn btn-light',
      label: 'Add user',
      type: 'button',
      events: {
        click: async () => {
          const chatId = this.props.selectedChat;
          const userIdInput = this.children.userID as Input;
          const userId = Number(userIdInput.getValue());

          if (chatId && userId) {
            await controller.addUserToChat(chatId, userId);
            alert('User added');
          } else {
            alert("There's no user with this ID");
          }
        },
      },
    });

    this.children.userID = new Input({
      name: 'user-id',
      type: 'text',
      placeholder: 'Enter user ID',
    });

    this.children.removeUserBtn = new Button({
      class: 'edit-user-btn btn btn-light',
      label: 'Remove user',
      type: 'button',
      events: {
        click: async () => {
          const chatId = this.props.selectedChat;
          const userIdInput = this.children.userID as Input;
          const userId = Number(userIdInput.getValue());

          if (chatId && userId) {
            await controller.removeUserFromChat(chatId, userId);
            alert('User removed');
          } else {
            alert("There's no user with this ID");
          }
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
    this.children.messages = this.createMessages(oldProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    const messages = props.messages;
  
    const updatedMessages = messages.map((data) => {
      const isMine = data.user_id === props.userId;
      const userName = isMine ? 'You' : 'Other User';
  
      return new Message({ ...data, isMine, userName });
    });
  
    return updatedMessages;
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
