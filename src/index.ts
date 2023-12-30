import Router from './utils/Router';
import AuthController from './controllers/AuthController';
import { SignUp } from './pages/registration';
import { MessengerPage } from './pages/chat';
import { Login } from './pages/login';
import { ProfilePage } from './pages/profile';
import { Error400 } from './pages/error/error400';
import { Error500 } from './pages/error/error500';
import { SettingsPassword } from './pages/profile/modules/change_password';
import { Settings } from './pages/profile/modules/change_profile_data';

enum Routes {
  Index = '/',
  SignUp = '/sign-up',
  Profile = '/profile',
  Messenger = '/messenger',
  Error400 = '/error400',
  Error500 = '/error500',
  SettingsPassword = '/settings-password',
  Settings = '/settings',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, Login)
    .use(Routes.SignUp, SignUp)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Error400, Error400)
    .use(Routes.Error500, Error500)
    .use(Routes.SettingsPassword, SettingsPassword)
    .use(Routes.Settings, Settings);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
