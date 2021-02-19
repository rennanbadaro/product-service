import PgProvider from '../../src/infrastructure/storage/PostgreProvider';
import RedisProvider from '../../src/infrastructure/storage/RedisProvider';

import container from '../../src/app/dependency-container/container';
import dependencyEnum from '../../src/app/dependency-container/dependency.enum';

import userSeeds from '../../db/dev-seeds/data/users.json';
import { UserAdapter } from '../../src/infrastructure/adapters/UserAdapter';

let adapter: UserAdapter;

describe('UserAdapter', () => {
  beforeEach(() => {
    adapter = container.get(dependencyEnum.USER_ADAPTER) as UserAdapter;
  });

  afterAll(async () => {
    await PgProvider.getInstance().getConnection().destroy();
    await RedisProvider.getInstance().getConnection().quit();
  });

  describe('Repository Integration', () => {
    it('Should return user by email and password', async () => {
      const [sampleInput] = userSeeds;

      const result = await adapter.fetchByEmailAndPassword(
        sampleInput.email,
        sampleInput.password
      );

      expect(result).toBeDefined();
    });
  });

  describe('Cache Integration', () => {
    it('Should properly set token to cache', async () => {
      const token = 'someFakeCrazyToken';
      await adapter.setValidToken(token);

      const fetchedToken = await RedisProvider.getInstance()
        .getConnection()
        .get(token);

      expect(fetchedToken).toBe('ok');
    });
  });
});
