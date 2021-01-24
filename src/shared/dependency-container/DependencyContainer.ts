import FetchProductsWithDiscount from '../../domain/product/use-cases/FetchProductsWithDiscount';
import { ProductAdapter } from '../../infrastructure/adapters/ProductAdapter';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import PostgreProvider from '../../infrastructure/storage/PostgreProvider';

class DependencyContainer {
  private readonly postgreProvider: PostgreProvider;

  private readonly productRepository: ProductRepository;

  private readonly productAdapter: ProductAdapter;

  private readonly fetchProductsWithDiscountUseCase: FetchProductsWithDiscount;

  constructor() {
    this.postgreProvider = new PostgreProvider();
    this.productRepository = new ProductRepository(this.postgreProvider);

    this.productAdapter = new ProductAdapter(
      {
        getDiscount: () => Promise.resolve(null),
      },
      this.productRepository
    );

    this.fetchProductsWithDiscountUseCase = new FetchProductsWithDiscount(
      this.productAdapter
    );
  }

  get(dependency: Dependencies) {
    const requestedDependency = this[dependency];

    if (!requestedDependency) {
      throw new Error('invalid dependency request');
    }

    return requestedDependency;
  }
}

export default new DependencyContainer();
