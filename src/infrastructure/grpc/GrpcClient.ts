import Discount from '../../domain/product/Discount';
import { IDiscountServiceClient } from '../proto/discount_grpc_pb';
import { GetDiscountRequest, GetDiscountResponse } from '../proto/discount_pb';

interface IGrpcClient {
  getDiscount(userId: string, productId: string): Promise<Discount | null>;
}

class GrpcClient implements IGrpcClient {
  constructor(private readonly discountClient: IDiscountServiceClient) {}

  async getDiscount(userId: string, productId: string) {
    const request = new GetDiscountRequest();
    request.setUserId(userId);
    request.setProductId(productId);

    return new Promise(resolve => {
      this.discountClient.getDiscount(request, (err, resp) => {
        if (err) {
          console.error(err);

          return resolve(null);
        }

        // @ts-ignore
        return resolve(resp.toObject().discount);
      });
    }) as Promise<Discount | null>;
  }
}

export { GrpcClient, IGrpcClient };
