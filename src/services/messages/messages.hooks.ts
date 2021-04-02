import * as authentication from '@feathersjs/authentication';
import { disallow, iff, isProvider, preventChanges } from 'feathers-hooks-common';
import messagesModifyContextData from '../../hooks/messages-modify-context-data';
import isUserOwnerOfData from '../../hooks/is-user-owner-of-data';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [messagesModifyContextData()],
    update: [disallow()],
    patch: [
      iff(isProvider('external'), isUserOwnerOfData()),
      iff(isProvider('external'), preventChanges(true, 'userId', 'channelId', 'createdAt'))
    ],
    remove: [
      iff(isProvider('external'), isUserOwnerOfData()),
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
