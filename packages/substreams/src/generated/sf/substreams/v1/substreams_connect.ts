// @generated by protoc-gen-connect-es v0.8.6 with parameter "target=ts"
// @generated from file sf/substreams/v1/substreams.proto (package sf.substreams.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Request, Response } from "./substreams_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service sf.substreams.v1.Stream
 */
export const Stream = {
  typeName: "sf.substreams.v1.Stream",
  methods: {
    /**
     * @generated from rpc sf.substreams.v1.Stream.Blocks
     */
    blocks: {
      name: "Blocks",
      I: Request,
      O: Response,
      kind: MethodKind.ServerStreaming,
    },
  }
} as const;

