import { ProductAdapter } from '../../src/infrastructure/adapters/ProductAdapter';
import PgProvider from '../../src/infrastructure/storage/PostgreProvider';
import container from '../../src/shared/dependency-container/container';
import dependencyEnum from '../../src/shared/dependency-container/dependency.enum';

import productSeeds from '../../db/dev-seeds/data/products.json';
import RedisProvider from '../../src/infrastructure/storage/RedisProvider';
import GrpcStubServer from './mock/GrpcStubServer';

let adapter: ProductAdapter;
jest.setTimeout(60000)
describe('ProductAdapter', () => {
  beforeEach(() => {
    adapter = container.get(dependencyEnum.PRODUCT_ADAPTER) as ProductAdapter;
  });

  afterAll(async () => {
    await PgProvider.getInstance().getConnection().destroy();
    await RedisProvider.getInstance().getConnection().quit();
  });

  describe('Repository Integration', () => {
    it('Should return all products', async () => {
      const result = await adapter.fetchProducts();
      const [sample] = result;
      const [seedSample] = productSeeds;

      expect(result).toHaveLength(productSeeds.length);
      expect(sample.id).toEqual(seedSample.id);
    });
  });

  describe('gRPC Integration', () => {
    beforeAll(() => {
      GrpcStubServer.start();
    });

    afterAll(() => {
      GrpcStubServer.stop();
    });

    it('Should fetch discount from gRPC server', async () => {
        const result = await adapter.fetchDiscount('userId', 'productId');

        expect(result).toEqual(GrpcStubServer.mockDiscount);
    });
  });
});
