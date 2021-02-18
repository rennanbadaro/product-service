import Product from '../../../../../src/domain/product/Product';

import FetchProductsWithDiscount from '../../../../../src/domain/product/use-cases/FetchProductsWithDiscount';
import { ProductOutPort } from '../../../../../src/infrastructure/adapters/ProductAdapter';

let usecase: FetchProductsWithDiscount;
let adapter: ProductOutPort;

const productMock = new Product({
  id: 'id',
  priceInCents: 190,
  title: 'mock product',
  description: 'some fake product',
});

describe('FetchProductsWithDiscount', () => {
  beforeEach(() => {
    adapter = {
      fetchProducts: jest.fn().mockResolvedValue([productMock]),
      fetchDiscount: jest.fn().mockResolvedValue(null),
    };

    usecase = new FetchProductsWithDiscount(adapter);
  });

  describe('execute', () => {
    it('Should return fetched products with no modification when no discount is returned', async () => {
      const input = 'userId';

      const result = await usecase.execute(input);

      expect(adapter.fetchProducts).toHaveBeenCalledWith();
      expect(adapter.fetchDiscount).toHaveBeenNthCalledWith(
        1,
        input,
        productMock.id
      );

      expect(result).toEqual([productMock]);
    });

    it('Should return fetched products with applied discount', async () => {
      const discountMock = {
        percentage: 10,
        valueInCents: productMock.priceInCents * 0.1,
      };

      adapter.fetchDiscount = jest.fn().mockResolvedValue(discountMock);

      const input = 'userId';

      const result = await usecase.execute(input);

      expect(adapter.fetchProducts).toHaveBeenCalledWith();
      expect(adapter.fetchDiscount).toHaveBeenNthCalledWith(
        1,
        input,
        productMock.id
      );

      const expectedResult = [
        new Product({ ...productMock, discount: discountMock }),
      ];

      expect(result).toEqual(expectedResult);
    });
  });
});
