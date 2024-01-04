import API, { UserAPI } from '../api/UserApi';
import store from '../utils/Store';
import router from '../utils/Router';
import { User } from '../api/AuthAPI';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async update(data: any) {
    try {
      const state = store.getState();
      const user = state.user as User;

      if (!user || !user.id) {
        throw new Error('User ID is not available');
      }

      const updatedUser: any = { ...user };

      for (const key in data) {
        if (
          Object.prototype.hasOwnProperty.call(data, key) &&
          data[key] !== undefined &&
          data[key] !== ''
        ) {
          updatedUser[key] = data[key];
        }
      }

      const userData = await this.api.update(updatedUser);
      console.log('resp: ', userData);

      router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async updatePassword(data: any) {
    try {
      await this.api.updatePassword(data.oldPassword, data.newPassword);

      alert('Password updated successfully');

      router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async uploadAvatar(avatar: FormData) {
    const state = store.getState();
    const user = state.user as User;

    try {
      const avatarUploaded = await this.api.uploadAvatar(avatar);
      console.log('avatar: ', avatarUploaded);

      const getAvatar = this.api.getResources(user.avatar);
      console.log('getAvatar: ', getAvatar);
      alert('File uploaded successfully');
    } catch (e: any) {
      console.error('File upload failed:', e.message);
    }
  }

  getAvatar() {
    const state = store.getState();
    const user = state.user as User;

    try {
      const getAvatar = this.api.getResources(user.avatar);
      console.log('getAvatar: ', getAvatar);

      return getAvatar;
    } catch (e: any) {
      console.error('File upload failed:', e.message);
    }
  }
}

export default new UserController();
