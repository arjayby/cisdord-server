import * as authentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';
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
    patch: [isUserOwnerOfData()],
    remove: [isUserOwnerOfData()]
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
