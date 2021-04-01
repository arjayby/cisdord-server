import assert from 'assert';
import app from '../../src/app';

describe('\'channels\' service', () => {
  it('registered the service', () => {
    const service = app.service('channels');

    assert.ok(service, 'Registered the service');
  });
});
