import Block from '../../../../utils/Block';
import template from './change_profile_data.hbs';
import {
  checkValidation,
  focusoutValidation,
} from '../../../../utils/Validation/Validation';
import { Button } from '../../../../components/button';
import AuthController from '../../../../controllers/AuthController';
import { UserAvatar } from '../../../../components/user_avatar';
import { ProfileBackBar } from '../../../../components/profile_back_bar';
import { profileField } from '../../../../components/profile-field';
import { User } from '../../../../api/AuthAPI';
import { Input } from '../../../../components/input';

interface ProfileProps extends User {}

const userFields = [
  // 'avatar',
  // 'display_name',
  // 'id',
  'first_name',
  'second_name',
  'login',
  'email',
  'phone',
] as Array<keyof ProfileProps>;

const userFieldNames = ['Name', 'Surname', 'Login', 'Email', 'Phone'];

export class Settings extends Block {
  constructor() {
    super({
      nameError: 'Use letters and hyphens only',
      emailError: 'Invalid email address',
      loginError:
        'Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters',
      phoneError: 'Enter the number in the format +XXXXXXXXXXXX',
      chatNameError:
        'Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters',
    });
  }

  init() {
    this.children.name = new Input({
      name: 'first_name',
      type: 'text',
      class: 'item-value',
      placeholder: '.......',
    });
    this.children.surname = new Input({
      name: 'second_name',
      type: 'text',
      class: 'item-value',
      placeholder: '..........',
    });
    this.children.login = new Input({
      name: 'login',
      type: 'text',
      class: 'item-value',
      placeholder: '..........',
    });
    this.children.email = new Input({
      name: 'email',
      type: 'text',
      class: 'item-value',
      placeholder: '..........',
    });
    this.children.phone = new Input({
      name: 'phone',
      type: 'text',
      class: 'item-value',
      placeholder: '..........',
    });
    this.children.chatName = new Input({
      name: 'login',
      type: 'text',
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
