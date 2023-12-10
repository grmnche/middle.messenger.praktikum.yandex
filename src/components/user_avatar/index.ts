import Block from '../../utils/Block';
import template from './user_avatar.hbs';

interface UserAvatarProps {
  class: string;
  src: string;
  userName: string;
}

export class UserAvatar extends Block {
  constructor(props: UserAvatarProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
