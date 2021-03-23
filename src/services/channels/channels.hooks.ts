import * as authentication from '@feathersjs/authentication';
import { disallow, iff, isProvider, preventChanges } from 'feathers-hooks-common';
import channelsModifyContextData from '../../hooks/channels-modify-context-data';
import createMemberAfterCreateChannel from '../../hooks/create-member-after-create-channel';
import isUserOwnerOfData from '../../hooks/is-user-owner-of-data';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [channelsModifyContextData()],
    update: [disallow()],
    patch: [
      isUserOwnerOfData(),
      iff(isProvider('external'), preventChanges(true, 'userId', 'shortId', 'membersCount', 'createdAt'))
    ],
    remove: [isUserOwnerOfData()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [createMemberAfterCreateChannel()],
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
