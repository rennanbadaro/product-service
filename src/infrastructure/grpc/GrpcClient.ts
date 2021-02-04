import grpc from 'grpc';
import { promisify } from 'util';

import Discount from '../../domain/product/Discount';
import {
  DiscountServiceClient,
  IDiscountServiceClient,
} from '../proto/discount_grpc_pb';
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

    const get = promisify(this.discountClient.getDiscount).bind(
      this.discountClient
    );

    let result: GetDiscountResponse;
    try {
      result = (await get(request)) as GetDiscountResponse;
    } catch (err) {
      console.error(err);

      return null;
    }

    return result.toObject().discount || null;
  }
}

export { GrpcClient, IGrpcClient };
