import * as authentication from '@feathersjs/authentication';
import membersModifyContextData from '../../hooks/members-modify-context-data';
import incrementMembersCount from '../../hooks/increment-members-count';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [membersModifyContextData()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [incrementMembersCount()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
