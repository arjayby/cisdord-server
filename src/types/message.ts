import { UserType } from './user';
import { ChannelType } from './channel';

export type MessageType = {
  id: number;
  userId: number;
  user?: UserType;
  channelId: number;
  channel?: ChannelType;
  body: string;
}