import Discount from '../../domain/product/Discount';

interface IGrpcClient {
  getDiscount(userId: string, productId: string): Promise<Discount | null>;
}

export { IGrpcClient };
