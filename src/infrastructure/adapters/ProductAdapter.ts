import Discount from '../../domain/product/Discount';
import Product from '../../domain/product/Product';
import { IGrpcClient } from '../grpc/GrpcClient';
import { IProductRepository } from '../repositories/ProductRepository';

interface ProductOutPort {
  fetchProducts(): Promise<Product[]>;
  fetchDiscount(userId: string, productId: string): Promise<Discount | null>;
}

class ProductAdapter implements ProductOutPort {
  constructor(
    private readonly grpcClient: IGrpcClient,
    private readonly repository: IProductRepository
  ) {}

  fetchProducts() {
    return this.repository.fetchAll();
  }

  fetchDiscount(userId: string, productId: string) {
    return this.grpcClient.getDiscount(userId, productId);
  }
}

export { ProductOutPort, ProductAdapter };
