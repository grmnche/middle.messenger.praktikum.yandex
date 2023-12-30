import Block from '../../utils/Block';
import template from './profile.hbs';
import { User } from '../../api/AuthAPI';
import { Button } from '../../components/button';
import AuthController from '../../controllers/AuthController';
import { withStore } from '../../utils/Store';
import { profileField } from '../../components/profile-field';
import { ProfileBackBar } from '../../components/profile_back_bar';
import { UserAvatar } from '../../components/user_avatar';
import Router from '../../utils/Router';

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

class Profile extends Block<ProfileProps> {
  init() {
    this.children.fields = userFields.map((name, index) => {
      return new profileField({
        name: userFieldNames[index],
        value: this.props[name],
      });
    });

    this.children.profileBackBar = new ProfileBackBar({});

    this.children.userAvatar = new UserAvatar({
      class: 'user-avatar',
      src: '/src/images/avatar.png',
    });

    this.children.logoutButton = new Button({
      label: 'Log out',
      class: 'logout-btn',
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });

    this.children.changeInfo = new Button({
      label: 'Change info',
      class: 'change-info-btn',
      events: {
        click: () => {
          Router.go('/settings');
        },
      },
    });

    this.children.changePassword = new Button({
      label: 'Change password',
      class: 'change-password-btn',
      events: {
        click: () => {
          Router.go('/settings-password');
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: ProfileProps,
    newProps: ProfileProps,
  ): boolean {
    /**
     * Обновляем детей
     */
    (this.children.fields as profileField[]).forEach((field, i) => {
      field.setProps({ value: newProps[userFields[i]] });
    });

    /**
     * Другой вариант — просто заново создать всех детей. Но тогда метод должен возвращать true, чтобы новые дети отрендерились
     *
     * this.children.fields = userFields.map(name => {
     *   return new profileField({ name, value: newProps[name] });
     * });
     */

    /**
     * Так как мы обновили детей, этот компонент не обязательно рендерить
     */
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(Profile);
