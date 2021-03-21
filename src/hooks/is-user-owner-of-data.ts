// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const userId = context.params?.user?.id;
    
    if (context.path === 'users') {
      const user = await context.app.service('users').get(context.id);
      if (user.id !== userId) {
        throw new NotAuthenticated();
      }
    } else {
      const data = await context.app.service(context.path).get(context.id);
      if (data.userId !== userId) {
        throw new NotAuthenticated();
      }
    }

    return context;
  };
};
