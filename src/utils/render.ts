import { HomePage } from "../pages/home";
import { Error400 } from "../pages/error/error400";
import { Error500 } from "../pages/error/error500";
import { Chat } from "../pages/chat";
import { Login } from "../pages/login";
import { Modals } from "../pages/modals";
import { Profile } from "../pages/profile";
import { Registartion } from "../pages/registration";
import { ChangeProfileData } from "../pages/profile/modules/change_profile_data";
import { ChangeProfilePassword } from "../pages/profile/modules/change_password";

const ROUTES = {
  home: HomePage,
  error400: Error400,
  error500: Error500,
  chat: Chat,
  login: Login,
  modals: Modals,
  profile: Profile,
  changeProfileData: ChangeProfileData,
  changeProfilePassword: ChangeProfilePassword,
  registration: Registartion,
};

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;

  root.innerHTML = "";

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
