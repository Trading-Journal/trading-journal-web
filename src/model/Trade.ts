import { Direction } from './Direction';
import { Entry } from './Entry';
import { GraphType } from './GraphType';

export interface Trade {
  date: Date;

  price: number;

  symbol: string;

  direction: Direction;

  size: number;

  graphType?: GraphType;

  graphMeasure?: string;

  profitPrice?: number;

  lossPrice?: number;

  costs?: number;

  exitPrice?: number;

  exitDate?: Date;

  notes?: string;
}

export const fromEntry = (entry: Entry): Trade => {
  return {
    date: entry.date,
    price: entry.price,
    symbol: entry.symbol!,
    direction: entry.direction!,
    size: entry.size!,
    graphType: entry.graphType,
    graphMeasure: entry.graphMeasure,
    profitPrice: entry.profitPrice,
    lossPrice: entry.lossPrice,
    costs: entry.costs,
    exitPrice: entry.exitPrice,
    exitDate: entry.exitDate,
    notes: entry.notes,
  };
};
