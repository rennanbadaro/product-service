// package: discount
// file: discount.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Discount extends jspb.Message { 
    getPercentage(): number;
    setPercentage(value: number): Discount;

    getValueInCents(): number;
    setValueInCents(value: number): Discount;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Discount.AsObject;
    static toObject(includeInstance: boolean, msg: Discount): Discount.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Discount, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Discount;
    static deserializeBinaryFromReader(message: Discount, reader: jspb.BinaryReader): Discount;
}

export namespace Discount {
    export type AsObject = {
        percentage: number,
        valueInCents: number,
    }
}

export class GetDiscountRequest extends jspb.Message { 
    getProductId(): string;
    setProductId(value: string): GetDiscountRequest;

    getUserId(): string;
    setUserId(value: string): GetDiscountRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetDiscountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetDiscountRequest): GetDiscountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetDiscountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetDiscountRequest;
    static deserializeBinaryFromReader(message: GetDiscountRequest, reader: jspb.BinaryReader): GetDiscountRequest;
}

export namespace GetDiscountRequest {
    export type AsObject = {
        productId: string,
        userId: string,
    }
}

export class GetDiscountResponse extends jspb.Message { 

    hasDiscount(): boolean;
    clearDiscount(): void;
    getDiscount(): Discount | undefined;
    setDiscount(value?: Discount): GetDiscountResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetDiscountResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetDiscountResponse): GetDiscountResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetDiscountResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetDiscountResponse;
    static deserializeBinaryFromReader(message: GetDiscountResponse, reader: jspb.BinaryReader): GetDiscountResponse;
}

export namespace GetDiscountResponse {
    export type AsObject = {
        discount?: Discount.AsObject,
    }
}
