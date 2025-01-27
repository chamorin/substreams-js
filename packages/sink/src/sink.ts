import { type PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import * as Data from "@effect/data/Data";
import * as Effect from "@effect/io/Effect";
import * as Sink from "@effect/stream/Sink";

import type { BlockScopedData, BlockUndoSignal, Response } from "@substreams/core/proto";

export class SinkError extends Data.TaggedClass("SinkError")<{
  readonly cause: BlockScopedDataSinkError | BlockUndoSignalSinkError;
}> {}

export class BlockScopedDataSinkError extends Data.TaggedClass("SinkError")<{
  readonly cause: unknown;
  readonly message: PlainMessage<BlockScopedData>;
}> {}

export class BlockUndoSignalSinkError extends Data.TaggedClass("SinkError")<{
  readonly cause: unknown;
  readonly message: PlainMessage<BlockUndoSignal>;
}> {}

export type CreateSinkOptions<R1, R2> = {
  handleBlockScopedData: (message: BlockScopedData) => Effect.Effect<R1, unknown, void>;
  handleBlockUndoSignal: (message: BlockUndoSignal) => Effect.Effect<R2, unknown, void>;
};

export function createSink<R1, R2>({ handleBlockScopedData, handleBlockUndoSignal }: CreateSinkOptions<R1, R2>) {
  // rome-ignore lint/nursery/noForEach: this is not even an array ...
  return Sink.forEach((response: Response): Effect.Effect<R1 | R2, SinkError, void> => {
    const { value: message, case: kind } = response.message;

    switch (kind) {
      case "blockScopedData": {
        return handleBlockScopedData(message).pipe(
          Effect.catchAll((cause) =>
            Effect.fail(
              new SinkError({
                cause: new BlockScopedDataSinkError({
                  cause,
                  message: toPlainMessage(message),
                }),
              }),
            ),
          ),
        );
      }

      case "blockUndoSignal": {
        return handleBlockUndoSignal(message).pipe(
          Effect.catchAll((cause) =>
            Effect.fail(
              new SinkError({
                cause: new BlockUndoSignalSinkError({
                  cause,
                  message: toPlainMessage(message),
                }),
              }),
            ),
          ),
        );
      }
    }

    return Effect.unit;
  });
}
