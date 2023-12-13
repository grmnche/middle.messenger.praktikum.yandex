import Block from "../../utils/Block";
import template from "./nav.hbs";
import { render } from "../../utils/render";

export class Nav extends Block {
  constructor() {
    super({
      type: "button",

      buttons: [
        {
          label: "Chat",
          onClick: () => {
            render("chat");
          },
        },
        {
          label: "Error400",
          onClick: () => {
            render("error400");
          },
        },
        {
          label: "Error500",
          onClick: () => {
            render("error500");
          },
        },
        {
          label: "Login",
          onClick: () => {
            render("login");
          },
        },
        {
          label: "Registration",
          onClick: () => {
            render("registration");
          },
        },
        {
          label: "Modals",
          onClick: () => {
            render("modals");
          },
        },
        {
          label: "Profile",
          onClick: () => {
            render("profile");
          },
        },
        {
          label: "Change profile data",
          onClick: () => {
            render("changeProfileData");
          },
        },
        {
          label: "Change profile password",
          onClick: () => {
            render("changeProfilePassword");
          },
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
