import assert from 'assert';
import app from '../../src/app';
import { UserType } from '../../src/types/user';

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  const mockUser = app.get('users')[0];

  let user: UserType;

  before(async () => {
    try {
      // Create a new user
      const data = await app.service('users').create(mockUser);
      user = data;
    } catch (error) {
      // User already exists and we can authenticate and retrieve the user object
      const data = await app.service('authentication').create(
        {
          strategy: 'local',
          username: mockUser.username,
          password: mockUser.password,
        },
        {}
      );
      user = data.user;
    }
  });

  it('user exists with encrypted password', async () => {
    assert.ok(user, 'User exists');
    assert.notStrictEqual(mockUser.password, user.password, 'Password is encrypted');
  });

  it('should find the users', async () => {
    const data: any = await app.service('users').find();

    assert.ok(data.total > 0, 'Data is not empty');
    assert.ok(data.data.some((u: UserType) => u.id === user.id), 'User exists in data');
  });

  it('should get the user', async () => {
    const data: UserType = await app.service('users').get(user.id);

    assert.deepStrictEqual(data, user);
  });

  it('should patch the user', async () => {
    const data: UserType = await app.service('users').patch(user.id, { name: 'Test User Updated' });

    assert.strictEqual(data.name, 'Test User Updated');
  });

  it('should remove the user', async () => {
    await app.service('users').remove(user.id);

    try {
      await app.service('users').get(user.id);
      assert.fail('User not found');
    } catch (error) {
      assert.strictEqual(error.code, 404);
      assert.strictEqual(error.className, 'not-found');
    }
  });
});
