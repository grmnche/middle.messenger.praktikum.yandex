// import Block from '../../../utils/Block';
// import { focusoutValidation } from '../../../utils/Validation/Validation';
// import { Input } from '../../input';
// import { ChatPreview } from '../chat-preview';
// import template from './chat_list.hbs';

// export class ChatList extends Block {
//   constructor() {
//     super({
//       inputError: 'Message field cannot be empty',
//     });
//   }

//   init() {
//     this.children.search = new Input({
//       name: 'message',
//       type: 'text',
//       placeholder: 'Search',
//       inputError: 'At least one letter',
//     });

//     this.children.chatPreview = new ChatPreview({
//       chatName: 'Gared',
//       src: '/src/images/avatar.png',
//       chatLastMessage:
//         'Прошлой зимой я видел, как замерзают люди, видел и позапрошлой, когда был еще наполовину мальчишкой.',
//       chatTime: '22:09',
//     });
//   }

//   render() {
//     return this.compile(template, this.props);
//   }
// }

import { ChatInfo } from '../../../api/ChatsAPI';
import Block from '../../../utils/Block';
import { Chat } from '../../chat';
import { Link } from '../../link';
import template from './chat_list.hbs';
import ChatsController from '../../../controllers/ChatsController';
import { withStore } from '../../../utils/Store';
import { Input } from '../../input';

const chats = [
  {
    id: 1,
    title: 'Chat 1',
    unread_count: 2,
  },
  {
    id: 1,
    title: 'Chat 2',
    unread_count: 0,
  },
  {
    id: 1,
    title: 'Chat 3',
    unread_count: 0,
  },
];

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
    this.children.profileLink = new Link({ to: '/profile', label: 'Профиль' });

    this.children.search = new Input({
      name: 'message',
      type: 'text',
      placeholder: 'Search',
      inputError: 'At least one letter',
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
