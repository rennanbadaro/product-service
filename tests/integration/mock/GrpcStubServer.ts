import grpc, { Call, requestCallback } from 'grpc';
import { get } from 'env-var';

import { DiscountServiceService } from '../../../src/infrastructure/proto/discount_grpc_pb';
import Discount from '../../../src/domain/product/Discount';
import {
  Discount as grpcDiscount,
  GetDiscountResponse,
} from '../../../src/infrastructure/proto/discount_pb';

const mockDiscount = new grpcDiscount();
mockDiscount.setValueInCents(100);
mockDiscount.setPercentage(100);

const getDiscount = (_: Call, callback: requestCallback<GetDiscountResponse>) => {
  const resp = new GetDiscountResponse();
  resp.setDiscount(mockDiscount);

  callback(null, resp);
};

export default class GrpcStubServer {
  private static server: grpc.Server;

  static mockDiscount: Discount = mockDiscount.toObject() as Discount;

  static async start() {
    if (GrpcStubServer.server) {
      GrpcStubServer.server.forceShutdown();
    }

    GrpcStubServer.server = new grpc.Server();

    GrpcStubServer.server.addService(DiscountServiceService, { getDiscount });

    GrpcStubServer.server.bind(
      get('DISCOUNT_GRPC_ADDRESS').required().asString(),
      grpc.ServerCredentials.createInsecure()
    );

    GrpcStubServer.server.start();
  }

  static stop() {
    if (GrpcStubServer.server) {
      GrpcStubServer.server.forceShutdown();
    }
  }
}
