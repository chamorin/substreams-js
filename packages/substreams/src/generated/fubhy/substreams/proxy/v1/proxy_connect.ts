// @generated by protoc-gen-connect-es v0.8.6 with parameter "target=ts"
// @generated from file fubhy/substreams/proxy/v1/proxy.proto (package fubhy.substreams.proxy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { ProxyRequest } from "./proxy_pb.js";
import { Response } from "../../../../sf/substreams/v1/substreams_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service fubhy.substreams.proxy.v1.ProxyService
 */
export const ProxyService = {
  typeName: "fubhy.substreams.proxy.v1.ProxyService",
  methods: {
    /**
     * @generated from rpc fubhy.substreams.proxy.v1.ProxyService.Proxy
     */
    proxy: {
      name: "Proxy",
      I: ProxyRequest,
      O: Response,
      kind: MethodKind.ServerStreaming,
    },
  }
} as const;

