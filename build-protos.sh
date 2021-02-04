#!/bin/bash

BASEDIR=$PWD
PROTO_DEST=$BASEDIR/src/infrastructure/proto
TEMP_REPO=$BASEDIR/temp-proto

mkdir -p $TEMP_REPO $PROTO_DEST

cd $TEMP_REPO
git clone git@github.com:rennanbadaro/proto-graal.git --quiet

find ./ -name '*.proto' -exec cp {} $PROTO_DEST \;

rm -rf $TEMP_REPO
cd $BASEDIR

# Code generation
node_modules/.bin/grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=${PROTO_DEST} \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I $PROTO_DEST \
    $PROTO_DEST/*.proto

node_modules/.bin/grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=${PROTO_DEST} \
    -I $PROTO_DEST \
    $PROTO_DEST/*.proto
