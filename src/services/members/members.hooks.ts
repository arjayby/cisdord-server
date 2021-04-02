import * as authentication from '@feathersjs/authentication';
import { disallow, iff, isProvider, preventChanges } from 'feathers-hooks-common';
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
    update: [disallow()],
    patch: [
      iff(isProvider('external'), isUserOwnerOfData()),
      iff(isProvider('external'), preventChanges(true, 'userId', 'channelId', 'createdAt'))
    ],
    remove: [
      iff(isProvider('external'), isUserOwnerOfData())
    ]
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
