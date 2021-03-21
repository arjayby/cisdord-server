// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (associates: string[]): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { include, ...query } = context.params?.query || {};

    if (include) {
      context.params.sequelize = {
        raw: false,
        include: associates,
      };
      // Update the query to not include `include`
      context.params.query = query;
    }
  
    return context;
  };
};
