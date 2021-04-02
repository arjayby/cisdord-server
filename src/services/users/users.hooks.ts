import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { disallow, iff, isProvider, preventChanges } from 'feathers-hooks-common';
import isUserOwnerOfData from '../../hooks/is-user-owner-of-data';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt'), disallow('external') ],
    patch: [
      hashPassword('password'),
      authenticate('jwt'),
      iff(isProvider('external'), isUserOwnerOfData()),
      iff(isProvider('external'), preventChanges(true, 'githubId', 'createdAt'))
    ],
    remove: [
      authenticate('jwt'),
      iff(isProvider('external'), isUserOwnerOfData())
    ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
