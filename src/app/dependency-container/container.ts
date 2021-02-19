import grpc from 'grpc';
import env from 'env-var';

import ProductController from '../controllers/ProductController';
import FetchProductsWithDiscount from '../../domain/product/use-cases/FetchProductsWithDiscount';
import { ProductAdapter } from '../../infrastructure/adapters/ProductAdapter';
import { DiscountServiceClient, IDiscountServiceClient } from '../../infrastructure/proto/discount_grpc_pb';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import PostgreProvider from '../../infrastructure/storage/PostgreProvider';
import Dependencies from './dependency.enum';
import { GrpcClient } from '../../infrastructure/grpc/GrpcClient';
import UserLogin from '../../domain/user/use-cases/UserLogin';
import { UserAdapter, UserOutPort } from '../../infrastructure/adapters/UserAdapter';
import UserController from '../controllers/UserController';
import { AuthService, IAuthService } from '../../domain/auth/AuthService';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import RedisProvider from '../../infrastructure/storage/RedisProvider';

class DependencyContainer {
  private readonly postgreProvider: PostgreProvider;

  private readonly redisProvider: RedisProvider;

  private readonly grpcClient: GrpcClient;

  private readonly discountClient: IDiscountServiceClient;

  private readonly productRepository: ProductRepository;

  private readonly productAdapter: ProductAdapter;

  private readonly fetchProductsWithDiscountUseCase: FetchProductsWithDiscount;

  private readonly productController: ProductController;

  private readonly userLoginUseCase: UserLogin;

  private readonly userAdapter: UserOutPort;

  private readonly userRepository: UserRepository;

  private readonly userController: UserController;

  private readonly authService: IAuthService;

  constructor() {
    this.postgreProvider = PostgreProvider.getInstance();

    this.redisProvider = new RedisProvider();

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

    this.userRepository = new UserRepository(this.postgreProvider);


    this.userAdapter = new UserAdapter(this.userRepository, this.redisProvider);

    this.authService = new AuthService();

    this.userLoginUseCase = new UserLogin(this.authService, this.userAdapter);

    this.userController = new UserController(this.userLoginUseCase);
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
