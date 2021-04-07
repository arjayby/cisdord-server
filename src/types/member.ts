import { UserType } from './user';
import { ChannelType } from './channel';

export type MemberType = {
  userId: number;
  user?: UserType;
  channelId: number;
  channel?: ChannelType;
}