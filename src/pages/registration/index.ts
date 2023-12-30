import Block from '../../utils/Block';
import template from './registration.hbs';
import { checkValidation } from '../../utils/Validation/Validation';
import { Input } from '../../components/input';
import { SignupData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';
import { Link } from '../../components/link';
import { Button } from '../../components/button';

export class SignUp extends Block {
  constructor() {
    super({
      nameError: 'Use letters and hyphens only',
      emailError: 'Invalid email address',
      loginError:
        'Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters',
      passwordError:
        'At least one capital letter, one number and be between 8 and 40 characters long',
      phoneError: 'Enter the number in the format +XXXXXXXXXXXX',
      chatNameError:
        'Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters',
    });
  }

  init() {
    this.children.firstName = new Input({
      name: 'first_name',
      type: 'text',
      placeholder: 'Имя',
    });

    this.children.secondName = new Input({
      name: 'second_name',
      type: 'text',
      placeholder: 'Фамилия',
    });

    this.children.email = new Input({
      name: 'email',
      type: 'email',
      placeholder: 'E-mail',
    });

    this.children.login = new Input({
      name: 'login',
      type: 'text',
      placeholder: 'Логин',
    });

    this.children.phone = new Input({
      name: 'phone',
      type: 'tel',
      placeholder: 'Телефон',
    });

    this.children.password = new Input({
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      events: {
        focusout: () => this.onSubmit(),
      },
    });

    this.children.button = new Button({
      label: 'Register',
      class: 'btn btn-dark',
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: 'Log in',
      to: '/',
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

    AuthController.signup(data as SignupData);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
