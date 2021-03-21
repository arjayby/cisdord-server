import { Application } from '../declarations';
import users from './users/users.service';
import channels from './channels/channels.service';
import messages from './messages/messages.service';
import members from './members/members.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(channels);
  app.configure(messages);
  app.configure(members);
}
