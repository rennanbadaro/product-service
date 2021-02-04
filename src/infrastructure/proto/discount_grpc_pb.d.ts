// package: discount
// file: discount.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as discount_pb from "./discount_pb";

interface IDiscountServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getDiscount: IDiscountServiceService_IGetDiscount;
}

interface IDiscountServiceService_IGetDiscount extends grpc.MethodDefinition<discount_pb.GetDiscountRequest, discount_pb.GetDiscountResponse> {
    path: "/discount.DiscountService/GetDiscount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<discount_pb.GetDiscountRequest>;
    requestDeserialize: grpc.deserialize<discount_pb.GetDiscountRequest>;
    responseSerialize: grpc.serialize<discount_pb.GetDiscountResponse>;
    responseDeserialize: grpc.deserialize<discount_pb.GetDiscountResponse>;
}

export const DiscountServiceService: IDiscountServiceService;

export interface IDiscountServiceServer {
    getDiscount: grpc.handleUnaryCall<discount_pb.GetDiscountRequest, discount_pb.GetDiscountResponse>;
}

export interface IDiscountServiceClient {
    getDiscount(request: discount_pb.GetDiscountRequest, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    getDiscount(request: discount_pb.GetDiscountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    getDiscount(request: discount_pb.GetDiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
}

export class DiscountServiceClient extends grpc.Client implements IDiscountServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getDiscount(request: discount_pb.GetDiscountRequest, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    public getDiscount(request: discount_pb.GetDiscountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    public getDiscount(request: discount_pb.GetDiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
}
