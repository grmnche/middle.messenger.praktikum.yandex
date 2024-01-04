import Block from "../../../../utils/Block";
import template from "./settings.hbs";
import { Button } from "../../../../components/button";
import { UserAvatar } from "../../../../components/user_avatar";
import { ProfileBackBar } from "../../../../components/profile_back_bar";
import { User } from "../../../../api/AuthAPI";
import { Input } from "../../../../components/input";
import UserController from "../../../../controllers/UserController";

export class Settings extends Block {
  constructor() {
    super({
      nameError: "Use letters and hyphens only",
      emailError: "Invalid email address",
      loginError:
        "Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters",
      phoneError: "Enter the number in the format +XXXXXXXXXXXX",
      chatNameError:
        "Use only letters, numbers, hyphens and underscores. Length must be from 3 to 20 characters",
    });
  }

  init() {
    this.children.name = new Input({
      name: "first_name",
      type: "text",
      class: "item-value",
      placeholder: ".......",
    });

    this.children.surname = new Input({
      name: "second_name",
      type: "text",
      class: "item-value",
      placeholder: "..........",
    });

    this.children.login = new Input({
      name: "login",
      type: "text",
      class: "item-value",
      placeholder: "..........",
    });

    this.children.email = new Input({
      name: "email",
      type: "text",
      class: "item-value",
      placeholder: "..........",
    });

    this.children.phone = new Input({
      name: "phone",
      type: "text",
      class: "item-value",
      placeholder: "..........",
    });

    this.children.chatName = new Input({
      name: "login",
      type: "text",
      class: "item-value",
      placeholder: "..........",
    });

    this.children.profileBackBar = new ProfileBackBar({});

    this.children.userAvatar = new UserAvatar({
      class: "user-avatar",
      src: "/src/images/avatar.png",
    });

    this.children.button = new Button({
      class: "btn btn-light profile-button",
      label: "Save",
      events: {
        click: () => {
          this.onSubmit();
        },
      },
    });
  }

  onSubmit() {
    const userData: Partial<User> = {
      first_name: (this.children.name as Input).getValue(),
      second_name: (this.children.surname as Input).getValue(),
      login: (this.children.login as Input).getValue(),
      email: (this.children.email as Input).getValue(),
      phone: (this.children.phone as Input).getValue(),
    };

    UserController.update(userData);
  }

  render() {
    return this.compile(template, this.props);
  }
}
