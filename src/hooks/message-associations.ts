// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { include, ...query } = context.params.query || {};

    if (include) {
      const UserModel = context.app.services.users.Model;
      context.params.sequelize = {
        include: [UserModel],
        raw: false,
      };
      // Update the query to not include `include`
      context.params.query = query;
    }

    return context;
  };
};
