import * as authentication from '@feathersjs/authentication';
import membersModifyContextData from '../../hooks/members-modify-context-data';
import incrementMembersCount from '../../hooks/increment-members-count';
import isUserOwnerOfData from '../../hooks/is-user-owner-of-data';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [membersModifyContextData()],
    update: [],
    patch: [isUserOwnerOfData()],
    remove: [isUserOwnerOfData()]
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
