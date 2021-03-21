// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {

    try {
      await context.app.service('members').create({
        userId: context.params?.user?.id,
        channelId: context.result.id,
      });
    } catch(e) {
      await context.app.service('channels').delete(context.result.id);
      throw new Error(e);
    }

    return context;
  };
};
