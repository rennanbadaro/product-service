// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var discount_pb = require('./discount_pb.js');

function serialize_discount_GetDiscountRequest(arg) {
  if (!(arg instanceof discount_pb.GetDiscountRequest)) {
    throw new Error('Expected argument of type discount.GetDiscountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_discount_GetDiscountRequest(buffer_arg) {
  return discount_pb.GetDiscountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_discount_GetDiscountResponse(arg) {
  if (!(arg instanceof discount_pb.GetDiscountResponse)) {
    throw new Error('Expected argument of type discount.GetDiscountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_discount_GetDiscountResponse(buffer_arg) {
  return discount_pb.GetDiscountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DiscountServiceService = exports.DiscountServiceService = {
  getDiscount: {
    path: '/discount.DiscountService/GetDiscount',
    requestStream: false,
    responseStream: false,
    requestType: discount_pb.GetDiscountRequest,
    responseType: discount_pb.GetDiscountResponse,
    requestSerialize: serialize_discount_GetDiscountRequest,
    requestDeserialize: deserialize_discount_GetDiscountRequest,
    responseSerialize: serialize_discount_GetDiscountResponse,
    responseDeserialize: deserialize_discount_GetDiscountResponse,
  },
};

exports.DiscountServiceClient = grpc.makeGenericClientConstructor(DiscountServiceService);
