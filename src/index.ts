// import {Nav} from './pages/home/home';
import { registerComponent } from './utils/registerComponent';
import { render } from './utils/render';
import { Nav } from './components/nav';
import { Error } from './components/error';
import { ChatFeed } from './components/chat/chat_feed/Index';
import { ChatList } from './components/chat/chat_list/Index';
import { UserPreview } from './components/user_preview';
import { Button } from './components/button';
import { Input } from './components/input';
import { UserAvatar } from './components/user_avatar';
import { BtnAction } from './components/btn_action/Index';
import { UserAction } from './components/modals/user_action';
import { LoadFile } from './components/modals/load_file';
import { FileAttacher } from './components/modals/file_attacher';
import { ProfileBackBar } from './components/profile_back_bar';
import { ProfileDataItem } from './components/profile_data_item';
import { Form } from './components/form';

registerComponent('Nav', Nav);
registerComponent('Error', Error);
registerComponent('ChatFeed', ChatFeed);
registerComponent('ChatList', ChatList);
registerComponent('UserPreview', UserPreview);
registerComponent('Button', Button);
registerComponent('Input', Input);
registerComponent('UserAvatar', UserAvatar);
registerComponent('BtnAction', BtnAction);
registerComponent('UserAction', UserAction);
registerComponent('LoadFile', LoadFile);
registerComponent('FileAttacher', FileAttacher);
registerComponent('ProfileBackBar', ProfileBackBar);
registerComponent('ProfileDataItem', ProfileDataItem);
registerComponent('Form', Form);

window.addEventListener('DOMContentLoaded', () => {
  render('home');
});
