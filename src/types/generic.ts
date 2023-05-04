import {FC} from 'react';

export interface ClassName {
  className?: string;
}

export type SFC<P = Record<string, unknown>> = FC<P & ClassName>;
