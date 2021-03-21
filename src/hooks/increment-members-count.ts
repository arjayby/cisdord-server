// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const ChannelsModel = context.app.services.channels.Model;

    try {
      await ChannelsModel.increment('membersCount', { where: { id: context.data.channelId } });
    } catch(e) {
      await context.app.service('members').delete(context.result.id);
      throw new Error(e);
    }

    return context;
  };
};
