import { UserType } from './user';

export type ChannelType = {
  id: number;
  shortId: string;
  userId: number;
  user?: UserType;
  name: string;
  description: string;
  tags: string[];
  membersCount: number;
}