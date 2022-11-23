import { Direction } from './Direction';
import { EntryType } from './EntryType';
import { GraphType } from './GraphType';

export interface Entry {
  id?: string;

  date: Date;

  type: EntryType;

  price: number;

  symbol?: string;

  direction?: Direction;

  size?: number;

  graphType?: GraphType;

  graphMeasure?: string;

  profitPrice?: number;

  lossPrice?: number;

  costs?: number;

  exitPrice?: number;

  exitDate?: Date;

  notes?: string;

  accountRisked?: number;

  plannedRR?: number;

  grossResult?: number;

  netResult?: number;

  accountChange?: number;

  accountBalance?: number;
}
