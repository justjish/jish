import type { MimeType } from './file';
import type { TransformOptions } from './image';
import type { TransformOptions as TransformOptionsLib } from 'js-image-lib';

export type Transformer = {
  name: string;
  supportedInputs: Set<MimeType>;
  supportedOutputs: Set<MimeType>;
  transform: (
    input: {
      url: string;
      data: Uint8Array;
      contentType: MimeType;
    },
    output: TransformOptionsLib,
  ) => Promise<Uint8Array>;
};
