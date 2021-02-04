import grpc from 'grpc';
import env from 'env-var';

import ProductController from '../../app/controllers/ProductController';
import FetchProductsWithDiscount from '../../domain/product/use-cases/FetchProductsWithDiscount';
import { ProductAdapter } from '../../infrastructure/adapters/ProductAdapter';
import { DiscountServiceClient, IDiscountServiceClient } from '../../infrastructure/proto/discount_grpc_pb';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import PostgreProvider from '../../infrastructure/storage/PostgreProvider';
import Dependencies from './dependency.enum';
import { GrpcClient } from '../../infrastructure/grpc/GrpcClient';

class DependencyContainer {
  private readonly postgreProvider: PostgreProvider;

  private readonly grpcClient: GrpcClient;

  private readonly discountClient: IDiscountServiceClient;

  private readonly productRepository: ProductRepository;

  private readonly productAdapter: ProductAdapter;

  private readonly fetchProductsWithDiscountUseCase: FetchProductsWithDiscount;

  private readonly productController: ProductController;

  constructor() {
    this.postgreProvider = new PostgreProvider();

    this.productRepository = new ProductRepository(this.postgreProvider);

    this.discountClient = new DiscountServiceClient(
      env.get('DISCOUNT_GRPC_ADDRESS').required().asString(),
      grpc.credentials.createInsecure()
    );

    this.grpcClient = new GrpcClient(this.discountClient);

    this.productAdapter = new ProductAdapter(
      this.grpcClient,
      this.productRepository
    );

    this.fetchProductsWithDiscountUseCase = new FetchProductsWithDiscount(
      this.productAdapter
    );

    this.productController = new ProductController(
      this.fetchProductsWithDiscountUseCase
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
