import * as authentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { disallow, iff, isProvider, preventChanges } from 'feathers-hooks-common';
import messagesModifyContextData from '../../hooks/messages-modify-context-data';
import isUserOwnerOfData from '../../hooks/is-user-owner-of-data';
import messageAssociations from '../../hooks/message-associations';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const { protect } = local.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [ messageAssociations() ],
    get: [ messageAssociations() ],
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
    all: [ protect('user.password') ],
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
