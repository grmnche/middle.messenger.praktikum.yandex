import Block from '../../utils/Block';
import template from './login.hbs';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';
import { Link } from '../../components/link';

export class Login extends Block {
  constructor() {
    super({
      loginError:
        'Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters',
      passwordError:
        'At least one capital letter, one number and be between 8 and 40 characters long',
    });
  }

  init() {
    this.children.login = new Input({
      label: 'Login',
      name: 'login',
      type: 'text',
      placeholder: 'Login'
    });

    this.children.password = new Input({
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Password'
    });

    this.children.button = new Button({
      label: 'Войти',
      class: 'btn btn-dark',
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: 'Create account',
      to: '/sign-up',
    });
  }

  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [
        (child as Input).getName(),
        (child as Input).getValue(),
      ]);

    const data = Object.fromEntries(values);

    AuthController.signin(data as SignupData);
  }

  render() {
    return this.compile(template, this.props);
  }
}
