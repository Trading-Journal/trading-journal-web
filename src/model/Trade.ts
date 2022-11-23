import { Direction } from './Direction';
import { GraphType } from './GraphType';

export interface Trade {
  date: Date;

  price: number;

  symbol: string;

  direction: Direction;

  size: number;

  graphType: GraphType;

  graphMeasure: string;

  profitPrice: number;

  lossPrice: number;

  costs: number;

  exitPrice: number;

  exitDate: Date;

  notes: string;
}
