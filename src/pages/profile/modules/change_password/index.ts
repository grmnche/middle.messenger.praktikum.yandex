import Block from '../../../../utils/Block';
import template from './change_profile_password.hbs';
import { profileField } from '../../../../components/profile-field';
import { ProfileBackBar } from '../../../../components/profile_back_bar';
import { UserAvatar } from '../../../../components/user_avatar';
import { Button } from '../../../../components/button';
import AuthController from '../../../../controllers/AuthController';
import { Input } from '../../../../components/input';

const userPassword = [
  { text: 'Old password', value: '.......' },
  { text: 'New password', value: '.....' },
  { text: 'New password again', value: '.....' },
];

export class SettingsPassword extends Block {
  constructor() {
    super({
      passwordError:
        'At least one capital letter, one number and be between 8 and 40 characters long',
    });
  }

  init() {
    this.children.oldPassword = new Input({
      name: 'password',
      type: 'password',
      class: 'item-value',
      placeholder: '.......',
    });
    this.children.newPassword = new Input({
      name: 'password',
      type: 'password',
      class: 'item-value',
      placeholder: '..........',
    });
    this.children.newPasswordAgain = new Input({
      name: 'password',
      type: 'password',
      class: 'item-value',
      placeholder: '..........',
    });

    this.children.profileBackBar = new ProfileBackBar({});

    this.children.userAvatar = new UserAvatar({
      class: 'user-avatar',
      src: '/src/images/avatar.png',
    });

    this.children.button = new Button({
      class: 'btn btn-light profile-button',
      label: 'Save',
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
